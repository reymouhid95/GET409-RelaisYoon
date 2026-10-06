const JWKS_URL =
  "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";
const JWKS_TTL_MS = 60 * 60 * 1000;

interface GoogleJwk {
  kty: string;
  n: string;
  e: string;
  kid?: string;
}

let jwksCache: { keys: GoogleJwk[]; fetchedAt: number } | null = null;

function b64urlToBytes(input: string): Uint8Array {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  const raw = atob(b64 + pad);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return bytes;
}

async function signingKey(kid: string): Promise<JsonWebKey | null> {
  if (!jwksCache || Date.now() - jwksCache.fetchedAt > JWKS_TTL_MS) {
    const res = await fetch(JWKS_URL);
    if (!res.ok) return null;
    const body = (await res.json()) as { keys?: GoogleJwk[] };
    if (!body.keys) return null;
    jwksCache = { keys: body.keys, fetchedAt: Date.now() };
  }
  const match = jwksCache.keys.find((k) => k.kid === kid);
  if (!match) return null;
  return { kty: match.kty, n: match.n, e: match.e, alg: "RS256" };
}

/**
 * Verify a Firebase ID token locally the way the Functions platform does:
 * RS256 signature against Google's public JWKS, then issuer, audience,
 * expiry and subject checks. Returns the uid, or null when invalid.
 */
export async function verifyFirebaseIdToken(
  token: string,
  projectId: string,
): Promise<string | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  let header: { alg?: string; kid?: string };
  let payload: { iss?: string; aud?: string; exp?: number; sub?: string };
  try {
    header = JSON.parse(
      new TextDecoder().decode(b64urlToBytes(parts[0])),
    ) as typeof header;
    payload = JSON.parse(
      new TextDecoder().decode(b64urlToBytes(parts[1])),
    ) as typeof payload;
  } catch {
    return null;
  }
  if (header.alg !== "RS256" || !header.kid) return null;

  const jwk = await signingKey(header.kid);
  if (!jwk) return null;

  try {
    const key = await crypto.subtle.importKey(
      "jwk",
      jwk,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const data = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);
    const valid = await crypto.subtle.verify(
      { name: "RSASSA-PKCS1-v1_5" },
      key,
      b64urlToBytes(parts[2]),
      data,
    );
    if (!valid) return null;
  } catch {
    return null;
  }

  if (payload.iss !== `https://securetoken.google.com/${projectId}`) {
    return null;
  }
  if (payload.aud !== projectId) return null;
  if (!payload.exp || payload.exp * 1000 < Date.now()) return null;
  if (!payload.sub) return null;
  return payload.sub;
}
