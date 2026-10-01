/*
 * Lien cartographique par deep-link.
 *
 * Choix : on n'embarque PAS de bibliothèque de cartographie. Leaflet pèserait
 * ~40 ko, imposerait de saisir des coordonnées pour chaque station, et
 * consommerait de la data — exactement ce que l'usagère n'a pas toujours.
 * Le deep-link délègue à l'application de cartographie déjà installée sur le
 * téléphone : 0 ko, 0 clé d'API, et le nom de station suffit puisque
 * l'application géocode la destination.
 */

const DESTINATION = "Station Petersen, avenue Malick Sy, Dakar";

/** Itinéraire vers la station où commence le correspondance. */
export function urlItineraire(station: string): string {
  const params = new URLSearchParams({
    api: "1",
    destination: `${station}, Dakar, Sénégal`,
    travelmode: "transit",
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/** Fiche de la station, pour vérifier où l'on va avant de monter. */
export function urlFicheStation(station: string): string {
  const params = new URLSearchParams({
    api: "1",
    query: `${station}, Dakar, Sénégal`,
  });
  return `https://www.google.com/maps/search/?${params.toString()}`;
}

export { DESTINATION as STATION_RELEVE };
