import type { Mode } from "./quiz";

export type Locale = "en" | "fr";

export const localePaths: Record<Locale, string> = {
  en: "",
  fr: "/fr"
};

export const quizCopy = {
  en: {
    modelIntro: [
      ["Big Five", "Broad traits: openness, conscientiousness, extraversion, agreeableness, and emotional stability."],
      ["HEXACO", "A six-factor lens that adds honesty-humility and emotionality for extra nuance."],
      ["16-Type", "A preference estimate for energy, information, decision style, and structure."],
      ["Enneagram", "A motivation-style estimate for stress patterns, values, and growth themes."]
    ],
    modes: {
      quick: { label: "Quick", minutes: "6 min", description: "A short read with enough coverage to be useful." },
      standard: { label: "Standard", minutes: "11 min", description: "Recommended for a detailed, balanced profile." },
      deep: { label: "Deep", minutes: "18 min", description: "More questions for higher confidence and nuance." }
    },
    likert: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
    introEyebrow: "One integrated test",
    introTitle: "Before you start",
    introBody:
      "Great Mind Profile uses one quiz to estimate several personality lenses. You will not take four separate tests; these models combine into one result page.",
    depthTitle: "Choose your depth",
    progressNote: "Progress saves locally in your browser. No login required.",
    start: "Start quiz",
    question: "Question",
    of: "of",
    previous: "Previous",
    loadingEyebrow: "Preparing your report",
    loadingTitle: "Your profile is coming together",
    loadingBody: "We are turning your answers into clear trait scores, type notes, and practical ideas."
  },
  fr: {
    modelIntro: [
      ["Big Five", "Traits généraux : ouverture, organisation, extraversion, agréabilité et stabilité émotionnelle."],
      ["HEXACO", "Un modèle en six facteurs qui ajoute honnêteté-humilité et émotionnalité pour plus de nuance."],
      ["16 types", "Une estimation de préférences : énergie, information, décision et besoin de structure."],
      ["Ennéagramme", "Une estimation des motivations, des réactions au stress, des valeurs et des pistes de croissance."]
    ],
    modes: {
      quick: { label: "Rapide", minutes: "6 min", description: "Une lecture courte avec assez de questions pour être utile." },
      standard: { label: "Standard", minutes: "11 min", description: "Recommandé pour un profil détaillé et équilibré." },
      deep: { label: "Approfondi", minutes: "18 min", description: "Plus de questions pour plus de nuance et de confiance." }
    },
    likert: ["Pas du tout d'accord", "Pas d'accord", "Neutre", "D'accord", "Tout à fait d'accord"],
    introEyebrow: "Un test intégré",
    introTitle: "Avant de commencer",
    introBody:
      "Great Mind Profile utilise un seul quiz pour estimer plusieurs modèles de personnalité. Vous ne passez pas quatre tests séparés : les modèles sont réunis dans un seul résultat.",
    depthTitle: "Choisissez la profondeur",
    progressNote: "Votre progression est enregistrée localement dans votre navigateur. Aucun compte n'est nécessaire.",
    start: "Commencer le quiz",
    question: "Question",
    of: "sur",
    previous: "Précédent",
    loadingEyebrow: "Préparation du rapport",
    loadingTitle: "Votre profil se construit",
    loadingBody: "Nous transformons vos réponses en scores clairs, notes de type et conseils pratiques."
  }
} as const;

export const frQuestions: Record<string, string> = {
  q1: "J'aime explorer des idées, théories ou possibilités créatives qui ne me sont pas familières.",
  q2: "Je planifie généralement mon travail avant de commencer.",
  q3: "Les situations sociales me donnent souvent de l'énergie.",
  q4: "J'essaie de préserver la paix même quand je ne suis pas d'accord.",
  q5: "Je reste calme quand les plans changent soudainement.",
  q6: "Je préfère être honnête plutôt que paraître impressionnant.",
  q7: "Je préfère les faits pratiques aux spéculations abstraites.",
  q8: "Je peux être spontané même si cela perturbe mon emploi du temps.",
  q9: "Je prends souvent l'initiative dans les groupes.",
  q10: "Je remarque rapidement les besoins émotionnels des autres.",
  q11: "Je me pousse à obtenir des résultats visibles.",
  q12: "J'ai besoin de temps seul pour comprendre ce que je ressens vraiment.",
  q13: "Je me sens mal à l'aise quand les attentes ne sont pas claires.",
  q14: "Je peux pardonner rapidement après un conflit.",
  q15: "Je n'aime pas utiliser le charme pour obtenir un traitement spécial.",
  q16: "J'aime garder plusieurs options ouvertes jusqu'au dernier moment raisonnable.",
  q17: "Je suis à l'aise pour confronter les gens directement quand c'est nécessaire.",
  q18: "Je fais des recherches approfondies avant de me faire une opinion forte.",
  q19: "Quand je suis stressé, je peux devenir trop critique envers moi-même.",
  q20: "J'adapte souvent mon ton pour aider les autres à se sentir à l'aise.",
  q21: "J'aime trouver le schéma caché derrière une situation confuse.",
  q22: "Les gens peuvent généralement compter sur moi pour terminer ce que je commence.",
  q23: "Je prends rapidement la parole quand un groupe a besoin d'une direction.",
  q24: "Je préfère comprendre le point de vue de quelqu'un plutôt que gagner l'argument.",
  q25: "Les petits revers peuvent rester dans ma tête plus longtemps que je ne le voudrais.",
  q26: "Je n'aime pas contourner les règles pour obtenir un avantage personnel.",
  q27: "Je préfère les routines familières à la nouveauté constante.",
  q28: "J'organise souvent le travail partagé avant qu'on me le demande.",
  q29: "Je me sens épuisé après trop d'attention sociale.",
  q30: "J'essaie d'être généreux même quand personne ne le remarquera.",
  q31: "J'aime transformer des idées vagues en prochaines étapes claires.",
  q32: "Je suis attiré par l'art, la musique, le langage ou le design qui semblent originaux.",
  q33: "Je peux être direct quand quelque chose d'important est évité.",
  q34: "Je vérifie souvent si mes choix sont responsables envers les autres.",
  q35: "Je préfère prendre des décisions avec des critères objectifs.",
  q36: "J'apporte souvent de l'énergie dans une pièce calme.",
  q37: "Je préfère des plans flexibles qui peuvent évoluer avec de nouvelles informations.",
  q38: "Je suis sensible aux signes qu'une personne peut se sentir exclue.",
  q39: "Je peux rester concentré sur des tâches ennuyeuses mais importantes.",
  q40: "Je préfère la profondeur en tête-à-tête aux grands échanges sociaux.",
  q41: "J'exagère rarement mes réussites pour faire bonne impression.",
  q42: "Quand je suis incertain, je cherche à être rassuré ou à avoir un second avis.",
  q43: "Je remarque quand un système est inefficace et je veux l'améliorer.",
  q44: "Je peux rester avec des émotions complexes sans devoir les simplifier.",
  q45: "J'ai tendance à protéger mon indépendance quand les gens me mettent la pression.",
  q46: "J'imagine souvent plusieurs scénarios futurs avant de choisir.",
  q47: "La reconnaissance me motive quand elle reflète une vraie excellence.",
  q48: "Je récupère généralement vite après une gêne sociale.",
  q49: "Je me sens responsable de vérifier que tout le monde va bien.",
  q50: "J'aime débattre d'idées même quand il n'y a pas d'utilité pratique immédiate.",
  q51: "Je tiens tellement à l'harmonie que je peux repousser les conversations difficiles.",
  q52: "Je tiens mes promesses même quand elles deviennent contraignantes.",
  q53: "Je cherche de nouvelles expériences quand la vie devient trop prévisible.",
  q54: "Je préfère résoudre les conflits directement plutôt que d'espérer qu'ils disparaissent."
};

export function questionText(id: string, fallback: string, locale: Locale) {
  return locale === "fr" ? frQuestions[id] ?? fallback : fallback;
}

export function localizedModeLabel(mode: Mode, locale: Locale) {
  return quizCopy[locale].modes[mode];
}
