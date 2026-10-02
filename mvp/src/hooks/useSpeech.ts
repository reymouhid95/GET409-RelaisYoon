import { useCallback, useEffect, useState } from "react";

export type Lecture = {
  dispo: boolean;
  enLecture: boolean;
  basculer: (texte: string) => void;
  arreter: () => void;
};

/*
 * Garde-fou P-C : jamais de bouton muet. On affiche la lecture seule si le
 * navigateur expose speechSynthesis ET une voix fr-* (le catalogue exige de
 * vérifier la voix avant de promettre l'audio). Aucune voix hors français,
 * aucune traduction : utterance.lang = "fr-FR" strict.
 */
export function useSpeech(): Lecture {
  const [dispo, setDispo] = useState(false);
  const [enLecture, setEnLecture] = useState(false);

  useEffect(() => {
    const synthese = window.speechSynthesis;
    if (!synthese) return;
    const aVoixFrancaises = () =>
      synthese.getVoices().some((v) => v.lang.toLowerCase().startsWith("fr"));
    const maj = () => setDispo(aVoixFrancaises());
    maj();
    synthese.addEventListener("voiceschanged", maj);
    const minuteur = window.setTimeout(maj, 2000);
    return () => {
      synthese.removeEventListener("voiceschanged", maj);
      window.clearTimeout(minuteur);
      synthese.cancel();
      setEnLecture(false);
    };
  }, []);

  const arreter = useCallback(() => {
    window.speechSynthesis?.cancel();
    setEnLecture(false);
  }, []);

  const basculer = useCallback((texte: string) => {
    const synthese = window.speechSynthesis;
    if (!synthese) return;
    if (synthese.speaking) {
      synthese.cancel();
      setEnLecture(false);
      return;
    }
    const phrase = new SpeechSynthesisUtterance(texte);
    phrase.lang = "fr-FR";
    phrase.onend = () => setEnLecture(false);
    phrase.onerror = () => setEnLecture(false);
    setEnLecture(true);
    synthese.speak(phrase);
  }, []);

  return { dispo, enLecture, basculer, arreter };
}
