import { useCallback, useEffect, useRef, useState } from "react";

type ResultatReco = {
  transcript: string;
};

type EvenementResultatReco = {
  results?: ArrayLike<ArrayLike<Partial<ResultatReco>>>;
};

type Reconnaissance = {
  lang: string;
  interimResults: boolean;
  onresult: ((evenement: EvenementResultatReco) => void) | null;
  onerror: ((evenement: Event) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type FenetreVocale = {
  SpeechRecognition?: new () => Reconnaissance;
  webkitSpeechRecognition?: new () => Reconnaissance;
};

function fabriqueReconnaissance(): Reconnaissance | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as FenetreVocale;
  const Classe = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  if (!Classe) return null;
  return new Classe();
}

export function useVoiceInput(onTexteFinal: (texte: string) => void, langue = "fr-FR") {
  const [ecoute, setEcoute] = useState(false);
  const [supporte] = useState(() => fabriqueReconnaissance() !== null);
  const [erreur, setErreur] = useState<string | null>(null);
  const recoRef = useRef<Reconnaissance | null>(null);

  useEffect(() => {
    return () => {
      try {
        recoRef.current?.abort();
      } catch {
        /* ignore */
      }
    };
  }, []);

  const demarrer = useCallback(() => {
    setErreur(null);
    const reco = fabriqueReconnaissance();
    if (!reco) {
      setErreur("Dictée vocale non supportée par ce navigateur (utilisez Chrome).");
      return;
    }
    reco.lang = langue;
    reco.interimResults = false;
    recoRef.current = reco;

    reco.onresult = (evenement: EvenementResultatReco) => {
      const texte = String(evenement.results?.[0]?.[0]?.transcript ?? "").trim();
      if (texte) onTexteFinal(texte);
    };
    reco.onerror = () => {
      setErreur("Micro indisponible — vérifiez l'autorisation du navigateur.");
      setEcoute(false);
    };
    reco.onend = () => setEcoute(false);

    try {
      reco.start();
      setEcoute(true);
    } catch {
      setErreur("Impossible de démarrer la dictée vocale.");
      setEcoute(false);
    }
  }, [langue, onTexteFinal]);

  const arreter = useCallback(() => {
    try {
      recoRef.current?.stop();
    } catch {
      /* ignore */
    }
    setEcoute(false);
  }, []);

  return { ecoute, supporte, erreur, demarrer, arreter };
}
