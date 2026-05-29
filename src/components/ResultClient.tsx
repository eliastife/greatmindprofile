"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SCORING_VERSION, type ResultProfile, type TypeMatch } from "@/lib/scoring";
import { TraitBar } from "./TraitBar";
import { RadarChart } from "./RadarChart";
import { AdSlot } from "./AdSlot";
import { PersonalityMascot } from "./PersonalityMascot";
import { typeVisuals, type PersonalityType } from "@/lib/typeVisuals";
import type { CSSProperties } from "react";
import type { Locale } from "@/lib/i18n";

const resultKey = "gmp.quiz.results";
const currentResultKey = "gmp.quiz.currentResult";
const latestResultIdKey = "gmp.quiz.latestResultId";

const labels: Record<string, string> = {
  openness: "Openness",
  conscientiousness: "Conscientiousness",
  extraversion: "Extraversion",
  agreeableness: "Agreeableness",
  stability: "Emotional Stability",
  honestyHumility: "Honesty-Humility",
  emotionality: "Emotionality"
};

const resultCopy = {
  en: {
    loading: "Loading result...",
    missingEyebrow: "Result not found",
    missingTitle: "Start a fresh quiz",
    missingBody:
      "This result link does not match a saved result in this browser, or it was created with an older scoring version. Take the quiz again to generate a real result.",
    startQuiz: "Start quiz",
    yourResult: "Your result",
    confidence: "Confidence",
    typeEstimate: "16-type estimate",
    share: "Share",
    download: "Download full report image",
    retake: "Retake test",
    shareable: "View shareable type page",
    shareSaved: "Shareable type result link copied.",
    imageSaved: "Image downloaded.",
    instagram: "Instagram does not accept direct web shares. I downloaded the image and copied your caption.",
    note: "",
    typeStory: "Type story",
    simplePattern: "Your simple pattern",
    howYouThink: "How you tend to think",
    whatPeopleNotice: "What people may notice",
    underPressure: "Under pressure",
    howUse: "How to use this result",
    bigFiveScores: "Big Five Trait Scores",
    radarView: "Radar View",
    hexacoScores: "HEXACO-Inspired Scores",
    typeEstimates: "Type Estimates",
    primaryType: "Primary 16-type estimate",
    secondaryTypes: "Secondary possible types",
    motivation: "Motivation estimate",
    whyModels: "Why these models appeared",
    matchEyebrow: "Match notes",
    matchTitle: "Easy match and harder match",
    matchIntro:
      "These are not destiny. Research points more to traits, habits, and repair skills than fixed soulmates. Use this as a clear way to understand possible comfort and friction.",
    easyMatch: "Easy match",
    harderMatch: "Harder match",
    strengths: "Strengths",
    blindSpots: "Blind Spots",
    growthPlan: "Growth Plan",
    funScience: "Fun science corner",
    jobsTitle: "Jobs and studies that may fit",
    jobsIntro: "These are not destiny. They are places where your natural attention style may be easier to use.",
    studyPaths: "Study paths",
    jobFamilies: "Job families",
    careful: "Cool but careful",
    funFacts: "Fun facts",
    colorVibe: "Color vibe",
    colorNote: "Not a scientific preference claim; just a visual palette that fits the tone of this result.",
    evidenceEyebrow: "What is scientific here?",
    evidenceTitle: "Plain evidence notes",
    researchSummary: "Research used to shape this wording",
    careerStyle: "Career Style",
    relationshipStyle: "Relationship Style",
    stressStyle: "Stress Style",
    shareTitle: "Share or Save",
    shareOnX: "Share on X",
    instagramImage: "Instagram image",
    recommendedArticles: "Recommended Articles",
    bigFiveGuide: "Big Five guide",
    hexacoGuide: "HEXACO guide",
    enneagramGuide: "Enneagram guide",
    methodology: "Methodology"
  },
  fr: {
    loading: "Chargement du résultat...",
    missingEyebrow: "Résultat introuvable",
    missingTitle: "Commencer un nouveau quiz",
    missingBody:
      "Ce lien ne correspond pas à un résultat enregistré dans ce navigateur, ou il vient d'une ancienne version du score. Reprenez le quiz pour générer un résultat réel.",
    startQuiz: "Commencer le quiz",
    yourResult: "Votre résultat",
    confidence: "Confiance",
    typeEstimate: "Estimation 16 types",
    share: "Partager",
    download: "Télécharger l'image du rapport",
    retake: "Refaire le test",
    shareable: "Voir la page partageable",
    shareSaved: "Lien partageable du type copié.",
    imageSaved: "Image téléchargée.",
    instagram: "Instagram n'accepte pas le partage web direct. L'image a été téléchargée et la légende copiée.",
    note: "",
    typeStory: "Histoire du type",
    simplePattern: "Votre schéma simple",
    howYouThink: "Votre façon de penser",
    whatPeopleNotice: "Ce que les autres peuvent remarquer",
    underPressure: "Sous pression",
    howUse: "Comment utiliser ce résultat",
    bigFiveScores: "Scores Big Five",
    radarView: "Vue radar",
    hexacoScores: "Scores inspirés du HEXACO",
    typeEstimates: "Estimations de type",
    primaryType: "Estimation principale 16 types",
    secondaryTypes: "Types possibles en second",
    motivation: "Motivation estimée",
    whyModels: "Pourquoi ces modèles apparaissent",
    matchEyebrow: "Compatibilité",
    matchTitle: "Match facile et match plus difficile",
    matchIntro:
      "Ce n'est pas le destin. Les recherches parlent surtout de traits, d'habitudes et de capacité à réparer les tensions. Utilisez cette partie comme une carte claire des zones de confort et de friction.",
    easyMatch: "Match facile",
    harderMatch: "Match plus difficile",
    strengths: "Forces",
    blindSpots: "Points de vigilance",
    growthPlan: "Plan de progression",
    funScience: "Coin science sympa",
    jobsTitle: "Métiers et études qui peuvent convenir",
    jobsIntro:
      "Ce n'est pas une obligation. Ce sont des environnements où votre style naturel d'attention peut être plus facile à utiliser.",
    studyPaths: "Pistes d'études",
    jobFamilies: "Familles de métiers",
    careful: "Intéressant, mais à prendre avec recul",
    funFacts: "Faits amusants",
    colorVibe: "Ambiance couleur",
    colorNote:
      "Ce n'est pas une affirmation scientifique sur vos couleurs préférées; c'est une palette visuelle qui correspond au ton du résultat.",
    evidenceEyebrow: "Ce qui est scientifique ici",
    evidenceTitle: "Notes de preuve en langage simple",
    researchSummary: "Recherches utilisées pour formuler cette analyse",
    careerStyle: "Style de carrière",
    relationshipStyle: "Style relationnel",
    stressStyle: "Style sous stress",
    shareTitle: "Partager ou enregistrer",
    shareOnX: "Partager sur X",
    instagramImage: "Image Instagram",
    recommendedArticles: "Articles recommandés",
    bigFiveGuide: "Guide Big Five",
    hexacoGuide: "Guide HEXACO",
    enneagramGuide: "Guide Ennéagramme",
    methodology: "Méthodologie"
  }
} as const;

const colorValues: Record<string, string> = {
  aqua: "#67e8f9",
  black: "#111827",
  blush: "#fda4af",
  charcoal: "#374151",
  coral: "#fb7185",
  cream: "#fef3c7",
  "cool gray": "#94a3b8",
  "deep blue": "#1e3a8a",
  "electric blue": "#38bdf8",
  gold: "#fbbf24",
  graphite: "#374151",
  green: "#22c55e",
  indigo: "#6366f1",
  ivory: "#fff7ed",
  lavender: "#c4b5fd",
  moss: "#4d7c0f",
  navy: "#172554",
  orange: "#f97316",
  peach: "#fb923c",
  red: "#ef4444",
  rose: "#fb7185",
  "royal blue": "#2563eb",
  sage: "#86efac",
  silver: "#cbd5e1",
  "sky blue": "#7dd3fc",
  "soft blue": "#93c5fd",
  "soft white": "#f8fafc",
  steel: "#94a3b8",
  stone: "#a8a29e",
  teal: "#14b8a6",
  turquoise: "#22d3ee",
  violet: "#a855f7",
  warm: "#fef3c7",
  "warm gray": "#d6d3d1",
  "warm white": "#fff7ed",
  white: "#ffffff",
  yellow: "#facc15"
};

function colorStyle(color: string): CSSProperties {
  const background = colorValues[color] ?? "#f8fafc";
  const darkText = ["yellow", "cream", "ivory", "soft white", "white", "warm white", "gold", "sage", "sky blue", "aqua"].includes(color);
  return {
    background,
    borderColor: background,
    color: darkText ? "#1f2937" : "#ffffff"
  };
}

const frenchLabels: Record<string, string> = {
  openness: "Ouverture",
  conscientiousness: "Organisation",
  extraversion: "Extraversion",
  agreeableness: "Coopération",
  stability: "Stabilité émotionnelle",
  honestyHumility: "Honnêteté-humilité",
  emotionality: "Émotivité"
};

const frenchArchetypes: Record<string, string> = {
  "The Strategic Explorer": "L'explorateur stratégique",
  "The Momentum Builder": "Le bâtisseur d'élan",
  "The Reflective Original": "L'original réfléchi",
  "The Grounded Connector": "Le lien stable",
  "The Adaptive Catalyst": "Le catalyseur adaptable",
  "The Practical Synthesizer": "Le synthétiseur pratique"
};

const frenchEnneagram: Record<string, string> = {
  "Type 1 - The Improver": "Type 1 - Le perfectionneur",
  "Type 2 - The Helper": "Type 2 - L'aidant",
  "Type 3 - The Achiever": "Type 3 - Le performant",
  "Type 4 - The Individualist": "Type 4 - L'individualiste",
  "Type 5 - The Investigator": "Type 5 - L'investigateur",
  "Type 6 - The Loyalist": "Type 6 - Le loyal",
  "Type 7 - The Enthusiast": "Type 7 - L'enthousiaste",
  "Type 8 - The Challenger": "Type 8 - Le challenger",
  "Type 9 - The Peacemaker": "Type 9 - Le médiateur"
};

const frenchColors: Record<string, string> = {
  aqua: "aqua",
  black: "noir",
  blush: "rose tendre",
  charcoal: "anthracite",
  coral: "corail",
  cream: "crème",
  "cool gray": "gris froid",
  "deep blue": "bleu profond",
  "electric blue": "bleu électrique",
  gold: "doré",
  graphite: "graphite",
  green: "vert",
  indigo: "indigo",
  ivory: "ivoire",
  lavender: "lavande",
  moss: "mousse",
  navy: "bleu marine",
  orange: "orange",
  peach: "pêche",
  red: "rouge",
  rose: "rose",
  "royal blue": "bleu royal",
  sage: "sauge",
  silver: "argent",
  "sky blue": "bleu ciel",
  "soft blue": "bleu doux",
  "soft white": "blanc doux",
  steel: "acier",
  stone: "pierre",
  teal: "bleu sarcelle",
  turquoise: "turquoise",
  violet: "violet",
  "warm gray": "gris chaud",
  "warm white": "blanc chaud",
  white: "blanc",
  yellow: "jaune"
};

const frenchTypeProfiles: Record<string, ResultProfile["typeProfile"]> = {
  INTJ: {
    name: "L'architecte stratégique",
    overview:
      "Vous aimez comprendre les systèmes en profondeur, prévoir les conséquences et construire un plan qui tient debout.",
    howYouThink:
      "Votre esprit cherche souvent la logique cachée: quels sont les leviers, les risques, les étapes, et la solution la plus élégante.",
    underPressure:
      "Sous stress, vous pouvez devenir très exigeant, surtout quand les règles sont floues ou que les décisions semblent lentes.",
    bestStudyPaths: ["Informatique", "Ingénierie", "Économie", "Méthodes de recherche", "Architecture"],
    bestJobFamilies: ["Stratégie", "Produit", "Data", "Conception de systèmes", "Leadership technique"],
    colorPalette: ["deep blue", "cool gray", "silver"],
    funFacts: [
      "Vous pouvez aimer la maîtrise d'un sujet plus que les applaudissements.",
      "Vous faites souvent confiance aux preuves de compétence plus qu'aux grands discours."
    ]
  },
  INTP: {
    name: "L'inventeur analytique",
    overview:
      "Vous aimez démonter les idées, tester les arguments et reconstruire une explication plus claire.",
    howYouThink:
      "Vous suivez les questions jusqu'à ce que la structure logique apparaisse, même si cela prend du temps.",
    underPressure:
      "Sous stress, vous pouvez rester trop longtemps dans l'analyse alors qu'une action simple ou une parole claire aiderait déjà.",
    bestStudyPaths: ["Mathématiques", "Philosophie", "Informatique", "Physique", "Linguistique"],
    bestJobFamilies: ["Recherche", "Logiciel", "Science des données", "Rédaction technique", "R&D"],
    colorPalette: ["indigo", "white", "charcoal"],
    funFacts: [
      "Vous apprenez souvent vite quand vous explorez seul.",
      "Vous pouvez collectionner les modèles mentaux comme d'autres collectionnent des souvenirs."
    ]
  },
  ENTJ: {
    name: "Le bâtisseur décisif",
    overview:
      "Vous transformez les idées vagues en objectifs, rôles, décisions et progrès visible.",
    howYouThink:
      "Vous repérez vite les leviers, les responsabilités, les délais et ce qui bloque l'avancement.",
    underPressure:
      "Sous stress, vous pouvez pousser trop fort avant que les autres aient eu le temps de suivre émotionnellement.",
    bestStudyPaths: ["Commerce", "Droit", "Management de l'ingénierie", "Économie", "Politiques publiques"],
    bestJobFamilies: ["Direction", "Opérations", "Entrepreneuriat", "Conseil", "Croissance"],
    colorPalette: ["navy", "gold", "black"],
    funFacts: [
      "Vous pouvez vous détendre en optimisant quelque chose.",
      "Vous respectez souvent les personnes directes quand elles sont aussi compétentes."
    ]
  },
  ENTP: {
    name: "Le hacker des possibilités",
    overview:
      "Vous aimez retourner les problèmes, trouver l'angle inattendu et tester des idées nouvelles avec énergie.",
    howYouThink:
      "Votre cerveau génère vite des options et apprend en contestant les hypothèses de départ.",
    underPressure:
      "Sous stress, vous pouvez disperser votre attention entre trop de pistes intéressantes.",
    bestStudyPaths: ["Entrepreneuriat", "Médias", "Informatique", "Débat", "Stratégie design"],
    bestJobFamilies: ["Startups", "Stratégie marketing", "Découverte produit", "Innovation", "Vente technique"],
    colorPalette: ["electric blue", "orange", "white"],
    funFacts: [
      "Vous transformez souvent les contraintes en jeu.",
      "L'humour peut devenir chez vous un vrai outil de pensée."
    ]
  },
  INFJ: {
    name: "Le conseiller intuitif",
    overview:
      "Vous cherchez le sens derrière les comportements et voulez que les idées améliorent vraiment la vie des gens.",
    howYouThink:
      "Vous reliez les signaux émotionnels, les conséquences futures et les valeurs qui donnent une direction.",
    underPressure:
      "Sous stress, vous pouvez porter beaucoup en silence avant de dire ce dont vous avez besoin.",
    bestStudyPaths: ["Psychologie", "Éducation", "Écriture", "Santé publique", "Design centré humain"],
    bestJobFamilies: ["Accompagnement", "Recherche UX", "Éditorial", "Stratégie associative", "Développement humain"],
    colorPalette: ["teal", "violet", "soft white"],
    funFacts: [
      "Vous retenez souvent la logique émotionnelle d'une pièce.",
      "Vous cherchez généralement la profondeur, pas seulement l'harmonie."
    ]
  },
  INFP: {
    name: "L'explorateur des valeurs",
    overview:
      "Vous cherchez l'authenticité, le sens et une forme d'expression qui respecte votre monde intérieur.",
    howYouThink:
      "Vous vous demandez souvent si un choix est vrai, humain et cohérent avec ce qui compte pour vous.",
    underPressure:
      "Sous stress, vous pouvez éviter les structures pratiques quand elles semblent menacer votre liberté.",
    bestStudyPaths: ["Écriture créative", "Psychologie", "Arts", "Travail social", "Littérature"],
    bestJobFamilies: ["Écriture", "Design", "Soutien psychologique", "Communauté", "Storytelling de marque"],
    colorPalette: ["sage", "lavender", "cream"],
    funFacts: [
      "Vous pouvez avoir un goût très clair avant même de savoir l'expliquer.",
      "Vos valeurs fonctionnent souvent comme une boussole personnelle."
    ]
  },
  ENFJ: {
    name: "Le catalyseur humain",
    overview:
      "Vous aidez les personnes à s'aligner autour d'un but, d'une croissance et d'un élan partagé.",
    howYouThink:
      "Vous lisez l'énergie du groupe et vous la traduisez souvent en direction utile.",
    underPressure:
      "Sous stress, vous pouvez trop prendre en charge les émotions ou les tâches des autres.",
    bestStudyPaths: ["Éducation", "Communication", "Psychologie", "Leadership", "Relations publiques"],
    bestJobFamilies: ["Enseignement", "Coaching", "People ops", "Leadership communautaire", "Partenariats"],
    colorPalette: ["coral", "teal", "warm white"],
    funFacts: [
      "Vous retenez souvent ce qui motive chaque personne.",
      "Vous pouvez rendre une structure plus chaleureuse et plus motivante."
    ]
  },
  ENFP: {
    name: "Le connecteur créatif",
    overview:
      "Vous reliez les idées, les personnes et les possibilités avec une énergie communicative.",
    howYouThink:
      "Vous pensez souvent en branches: une idée mène à une histoire, puis à une nouvelle piste.",
    underPressure:
      "Sous stress, vous pouvez poursuivre la nouveauté alors qu'une finition plus calme serait utile.",
    bestStudyPaths: ["Marketing", "Design", "Communication", "Psychologie", "Entrepreneuriat"],
    bestJobFamilies: ["Stratégie créative", "Communauté", "Découverte produit", "Médias", "Enseignement"],
    colorPalette: ["yellow", "turquoise", "rose"],
    funFacts: [
      "Vous trouvez souvent l'angle amusant avant tout le monde.",
      "Vous pouvez mieux réfléchir en parlant."
    ]
  },
  ISTJ: {
    name: "Le gardien fiable",
    overview:
      "Vous valorisez l'exactitude, la responsabilité et les méthodes qui ont fait leurs preuves.",
    howYouThink:
      "Vous comparez les choix aux faits, aux précédents, aux obligations et à ce qui est réellement faisable.",
    underPressure:
      "Sous stress, vous pouvez tenir trop fort à la route connue alors qu'une adaptation serait utile.",
    bestStudyPaths: ["Comptabilité", "Droit", "Opérations", "Systèmes d'information", "Administration de santé"],
    bestJobFamilies: ["Conformité", "Coordination projet", "Finance", "Logistique", "Assurance qualité"],
    colorPalette: ["green", "navy", "stone"],
    funFacts: [
      "Vous construisez souvent la confiance par la constance.",
      "Vous remarquez les détails que les autres pensaient déjà réglés."
    ]
  },
  ISFJ: {
    name: "Le protecteur attentif",
    overview:
      "Vous remarquez les besoins concrets, honorez vos engagements et créez une sécurité discrète autour de vous.",
    howYouThink:
      "Vous retenez ce qui aide les personnes à se sentir respectées, soutenues et en confiance.",
    underPressure:
      "Sous stress, vous pouvez dire oui trop longtemps avant d'admettre que vous êtes surchargé.",
    bestStudyPaths: ["Soins infirmiers", "Éducation", "Services humains", "Administration", "Nutrition"],
    bestJobFamilies: ["Santé", "Support opérationnel", "Enseignement", "Relation client", "Gestion de bureau"],
    colorPalette: ["soft blue", "sage", "ivory"],
    funFacts: [
      "Vous retenez souvent les préférences que les autres oublient.",
      "Vous pouvez rendre la fiabilité chaleureuse plutôt que rigide."
    ]
  },
  ESTJ: {
    name: "Le directeur pratique",
    overview:
      "Vous apportez de l'ordre, de la responsabilité et du mouvement vers les objectifs partagés.",
    howYouThink:
      "Vous cherchez rapidement la règle, le responsable, l'échéance et le résultat mesurable.",
    underPressure:
      "Sous stress, vous pouvez paraître plus certain que la situation ne le permet vraiment.",
    bestStudyPaths: ["Administration des affaires", "Droit", "Administration publique", "Supply chain", "Finance"],
    bestJobFamilies: ["Opérations", "Management", "Leadership civique", "Finance", "Logistique"],
    colorPalette: ["royal blue", "white", "red"],
    funFacts: [
      "Vous améliorez souvent une réunion en clarifiant la décision.",
      "Vous faites plus confiance à l'action qu'aux intentions vagues."
    ]
  },
  ESFJ: {
    name: "Le bâtisseur de communauté",
    overview:
      "Vous créez de l'appartenance par l'attention aux autres, l'organisation et le suivi concret.",
    howYouThink:
      "Vous remarquez les rôles, les attentes, les relations et les besoins pratiques.",
    underPressure:
      "Sous stress, vous pouvez être touché quand les signaux sociaux sont flous ou quand vos efforts ne sont pas reconnus.",
    bestStudyPaths: ["Éducation", "Santé", "Communication", "Hôtellerie", "Ressources humaines"],
    bestJobFamilies: ["Enseignement", "Coordination de soins", "Événementiel", "RH", "Customer success"],
    colorPalette: ["peach", "sky blue", "warm gray"],
    funFacts: [
      "Vous transformez souvent la logistique en hospitalité.",
      "Vous repérez parfois une tension relationnelle avant qu'elle devienne visible."
    ]
  },
  ISTP: {
    name: "Le résolveur tactique",
    overview:
      "Vous apprenez par l'essai, le concret et l'observation directe de ce qui fonctionne.",
    howYouThink:
      "Vous réduisez souvent un problème à sa mécanique, ses preuves et le prochain levier utile.",
    underPressure:
      "Sous stress, vous pouvez vous détacher si vite que les autres ne voient plus votre attention.",
    bestStudyPaths: ["Technologie d'ingénierie", "Mécanique", "Cybersécurité", "Sciences du sport", "Design industriel"],
    bestJobFamilies: ["Dépannage technique", "Sécurité", "Métiers qualifiés", "Ingénierie terrain", "Urgence"],
    colorPalette: ["graphite", "steel", "green"],
    funFacts: [
      "Vous apprenez souvent plus vite en faisant qu'en écoutant une théorie.",
      "Vous pouvez rester calme quand la prochaine action concrète est claire."
    ]
  },
  ISFP: {
    name: "Le créateur sensible",
    overview:
      "Vous valorisez la beauté, l'autonomie, l'expérience vécue et l'honnêteté personnelle.",
    howYouThink:
      "Vous faites confiance à ce que vous vivez, à votre goût et à ce qui semble humain dans le moment.",
    underPressure:
      "Sous stress, vous pouvez vous retirer quand les attentes semblent contrôlantes.",
    bestStudyPaths: ["Arts visuels", "Design", "Musique", "Ergothérapie", "Études environnementales"],
    bestJobFamilies: ["Design", "Bien-être", "Artisanat", "Soin", "Création de contenu"],
    colorPalette: ["moss", "blush", "cream"],
    funFacts: [
      "Vous avez souvent une signature sensorielle forte.",
      "Vous pouvez exprimer vos valeurs par le style plus que par de longs discours."
    ]
  },
  ESTP: {
    name: "L'opérateur du moment",
    overview:
      "Vous lisez vite la situation, agissez avec audace et apprenez grâce au retour direct du réel.",
    howYouThink:
      "Vous pensez par action, feedback visible et résultats concrets.",
    underPressure:
      "Sous stress, vous pouvez sauter la réflexion parce que la vitesse paraît plus gratifiante.",
    bestStudyPaths: ["Business", "Sciences du sport", "Vente", "Gestion d'urgence", "Production média"],
    bestJobFamilies: ["Vente", "Entrepreneuriat", "Terrain", "Opérations", "Rôles à performance mesurable"],
    colorPalette: ["red", "black", "silver"],
    funFacts: [
      "Vous repérez souvent les opportunités en temps réel.",
      "Vous pouvez très bien négocier quand les enjeux sont vivants."
    ]
  },
  ESFP: {
    name: "L'énergie expressive",
    overview:
      "Vous ramenez les personnes dans le moment présent avec chaleur, expression et sens de l'expérience.",
    howYouThink:
      "Vous remarquez l'ambiance, les détails sensoriels, le timing et ce qui va toucher les gens.",
    underPressure:
      "Sous stress, vous pouvez éviter les plans lourds quand le présent demande déjà beaucoup.",
    bestStudyPaths: ["Arts de la scène", "Hôtellerie", "Marketing", "Éducation", "Bien-être"],
    bestJobFamilies: ["Événementiel", "Divertissement", "Expérience client", "Enseignement", "Activation de marque"],
    colorPalette: ["coral", "gold", "aqua"],
    funFacts: [
      "Vous pouvez changer rapidement l'énergie d'une pièce.",
      "Vous comprenez parfois les gens par leur expression avant leurs explications."
    ]
  }
};

function topKey(scores: Record<string, number>) {
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
}

function frenchEnergy(type: string) {
  return type[0] === "E" ? "en échangeant avec les autres" : "dans le calme avant de partager";
}

function frenchInformation(type: string) {
  return type[1] === "N"
    ? "les schémas, le sens et les possibilités futures"
    : "les faits, les détails et ce qui fonctionne déjà";
}

function frenchDecision(type: string) {
  return type[2] === "F"
    ? "l'impact humain et les valeurs personnelles"
    : "la logique, l'équité et les conséquences";
}

function frenchStructure(type: string) {
  return type[3] === "J"
    ? "des étapes claires et un progrès visible"
    : "la liberté d'adapter le plan quand de nouvelles informations arrivent";
}

function frenchDeepDive(result: ResultProfile, profile: ResultProfile["typeProfile"]) {
  const openSignal =
    result.bigFive.openness >= 60
      ? "Votre ouverture élevée ajoute imagination, curiosité et envie de comprendre les liens entre les idées."
      : "Votre ouverture plus basse ajoute un filtre pratique: vous voulez que les idées tiennent dans la vraie vie.";
  const orderSignal =
    result.bigFive.conscientiousness >= 60
      ? "Votre organisation élevée montre que les plans, les standards et le suivi comptent pour vous."
      : "Votre organisation plus souple montre que vous avez besoin de systèmes légers et d'espace pour vous adapter.";
  const socialSignal =
    result.bigFive.extraversion >= 60
      ? "Vous pouvez réfléchir plus clairement quand les idées circulent dans la conversation."
      : "Vous pouvez réfléchir plus clairement quand vous avez du temps calme avant de répondre.";

  return [
    `${result.sixteenType} veut dire que vos réponses ressemblent surtout à une personne qui se recharge ${frenchEnergy(
      result.sixteenType
    )}, s'appuie sur ${frenchInformation(result.sixteenType)}, décide avec ${frenchDecision(
      result.sixteenType
    )}, et préfère ${frenchStructure(result.sixteenType)}. C'est une carte simple, pas une règle fixe sur votre identité.`,
    `${profile.name} fonctionne souvent mieux quand l'environnement respecte son style naturel d'attention, donne assez de retour pour rester lucide, et offre assez de structure pour éviter que les bonnes intentions deviennent du stress.`,
    `${openSignal} ${orderSignal} ${socialSignal} Lisez le type avec les barres de traits: les barres sont la partie la plus proche de la recherche scientifique, tandis que le type est un raccourci facile à comprendre.`,
    "Dans la vie quotidienne, ce profil progresse quand il nomme ses besoins tôt. Si vous avez besoin de calme, dites-le. Si vous avez besoin de mouvement, dites-le. Si vous avez besoin de plus de faits ou de plus d'empathie, demandez-le clairement au lieu d'espérer que les autres devinent."
  ];
}

function frenchMatch(type: string, match: TypeMatch, kind: "best" | "challenge"): TypeMatch {
  const sameInfo =
    type[1] === match.type[1]
      ? "vous cherchez souvent le même type d'information"
      : "l'un apporte la vision globale pendant que l'autre ramène du concret";
  const sameDecision =
    type[2] === match.type[2]
      ? "votre façon de décider peut sembler familière"
      : "l'un apporte davantage la logique, l'autre davantage l'impact humain";
  const samePace =
    type[3] === match.type[3]
      ? "votre rythme autour des plans peut se ressembler"
      : "l'un aime clarifier le plan tandis que l'autre garde plus d'options ouvertes";

  if (kind === "best") {
    return {
      type: match.type,
      name: frenchTypeProfiles[match.type]?.name ?? match.name,
      whyItFits: `Ce lien peut être fluide parce que ${sameInfo}, ${sameDecision}, et ${samePace}. Cela peut donner un mélange de confort et de différence utile.`,
      whyItCanBeHard:
        "Aucun duo n'est automatique. La difficulté vient souvent du stress, des besoins non dits, ou de l'idée que l'autre doit deviner votre logique.",
      makeItWork:
        "Gardez les points faciles, mais rendez les besoins invisibles très concrets. Demandez souvent: que savons-nous, que ressentons-nous, et quelle est la prochaine petite étape?"
    };
  }

  return {
    type: match.type,
    name: frenchTypeProfiles[match.type]?.name ?? match.name,
    whyItFits:
      "Ce lien peut fonctionner quand les deux personnes sont matures, bienveillantes et claires. La différence peut ajouter de l'humour, de la perspective et des compétences complémentaires.",
    whyItCanBeHard: `La friction vient surtout du fait que ${sameInfo}, ${sameDecision}, et ${samePace}. Sous stress, ces différences peuvent être vécues comme une critique au lieu d'un équilibre.`,
    makeItWork:
      "N'essayez pas de vous convertir l'un l'autre. Fixez des règles simples pour les conflits, répartissez les tâches selon les forces, et expliquez la raison derrière vos préférences avant de demander un changement."
  };
}

function frenchStrengths(result: ResultProfile) {
  return [
    result.bigFive.openness >= 60 ? "Curiosité et lecture des schémas" : "Sens pratique et ancrage dans le réel",
    result.bigFive.conscientiousness >= 60 ? "Fiabilité et capacité à aller au bout" : "Souplesse et adaptation",
    result.bigFive.agreeableness >= 60 ? "Communication coopérative" : "Jugement indépendant"
  ];
}

function frenchBlindSpots(result: ResultProfile) {
  return [
    result.bigFive.stability < 45
      ? "Le stress peut réduire votre perspective plus vite que vous ne le remarquez."
      : "Votre calme peut parfois vous faire ignorer de petits signaux d'inquiétude.",
    result.bigFive.extraversion < 45
      ? "Vous pouvez trop peu montrer des idées qui méritent d'être visibles."
      : "Votre élan social peut parfois aller plus vite que les personnes plus discrètes."
  ];
}

function frenchGrowthPlan() {
  return [
    "Choisissez une force et utilisez-la volontairement cette semaine.",
    "Choisissez un point de vigilance et créez une petite habitude qui réduit la friction.",
    "Relisez votre résultat après une grande transition ou une période de stress."
  ];
}

function frenchModelExplanations(result: ResultProfile) {
  const alt = result.secondaryTypes.length ? result.secondaryTypes.join(", ") : "moins marquées";
  return [
    `Big Five: votre signal de trait le plus fort est ${frenchLabels[topKey(result.bigFive)] ?? topKey(result.bigFive)}.`,
    `HEXACO inspiré: votre signal le plus fort dans les six facteurs est ${
      frenchLabels[topKey(result.hexaco)] ?? topKey(result.hexaco)
    }.`,
    `16 types: votre estimation est ${result.sixteenType}, basée surtout sur les traits, avec les questions d'axes comme indices de soutien; les possibilités proches sont ${alt}.`,
    `Ennéagramme: votre signal de motivation le plus fort est ${frenchEnneagram[result.enneagram] ?? result.enneagram}.`
  ];
}

function frenchEvidenceNotes() {
  return [
    "Les parties Big Five et HEXACO sont basées sur des traits. Ces modèles sont largement utilisés dans la recherche en personnalité.",
    "Le résultat 16 types est une estimation en langage simple construite à partir de votre profil de traits. Il aide à réfléchir, mais ce n'est pas un diagnostic.",
    "La partie compatibilité utilise des idées plus proches de la recherche: similarité de traits, stabilité émotionnelle, coopération et habitudes de communication. Ce n'est pas une garantie amoureuse.",
    "Les idées de métiers et d'études viennent de l'ajustement entre traits et environnement, surtout l'organisation, l'ouverture, l'extraversion et la préférence personnes/systèmes."
  ];
}

function localizeResult(result: ResultProfile, locale: Locale) {
  if (locale !== "fr") return result;
  const profile = frenchTypeProfiles[result.sixteenType] ?? result.typeProfile;

  return {
    ...result,
    archetype: frenchArchetypes[result.archetype] ?? result.archetype,
    summary:
      "Votre profil combine des scores de traits, des préférences estimées et des signaux de motivation. Voyez-le comme un miroir pour mieux vous comprendre, pas comme une identité figée.",
    enneagram: frenchEnneagram[result.enneagram] ?? result.enneagram,
    strengths: frenchStrengths(result),
    blindSpots: frenchBlindSpots(result),
    careerStyle:
      result.bigFive.conscientiousness >= 60
        ? "Vous êtes souvent à votre meilleur avec une responsabilité claire, des standards utiles et de la place pour améliorer les systèmes."
        : "Vous êtes souvent à votre meilleur dans des rôles variés, autonomes, où vous pouvez résoudre les problèmes au fur et à mesure.",
    relationshipStyle:
      result.bigFive.agreeableness >= 60
        ? "Vous construisez probablement la confiance par la chaleur, la patience et la réparation après les tensions."
        : "Vous construisez probablement la confiance par la franchise, les limites claires et la résolution directe des problèmes.",
    stressStyle:
      result.bigFive.stability >= 60
        ? "Sous pression, vous pouvez rester posé, mais demander de l'aide un peu trop tard."
        : "Sous pression, votre sensibilité peut devenir un bon signal d'alerte si vous ralentissez avant de réagir.",
    growthPlan: frenchGrowthPlan(),
    typeMatch: frenchMatch(result.sixteenType, result.typeMatch, "best"),
    typeChallenge: frenchMatch(result.sixteenType, result.typeChallenge, "challenge"),
    evidenceNotes: frenchEvidenceNotes(),
    deepDive: frenchDeepDive(result, profile),
    typeProfile: profile,
    modelExplanations: frenchModelExplanations(result)
  };
}

function colorLabel(color: string, locale: Locale) {
  return locale === "fr" ? frenchColors[color] ?? color : color;
}

export function ResultClient({ resultId = "", locale = "en" }: { resultId?: string; locale?: Locale }) {
  const [result, setResult] = useState<ResultProfile | "missing" | null>(null);
  const [shareMessage, setShareMessage] = useState("");
  const reportRef = useRef<HTMLElement>(null);
  const copy = resultCopy[locale];

  useEffect(() => {
    function isFresh(candidate: ResultProfile | undefined | null): candidate is ResultProfile {
      return candidate?.scoringVersion === SCORING_VERSION;
    }

    function readJson<T>(storage: Storage, key: string): T | null {
      const value = storage.getItem(key);
      if (!value) return null;
      try {
        return JSON.parse(value) as T;
      } catch {
        return null;
      }
    }

    try {
      const requestedResultId = new URLSearchParams(window.location.search).get("resultId") ?? resultId;
      const parsed = readJson<Record<string, ResultProfile>>(window.localStorage, resultKey) ?? {};
      const latestResultId = window.localStorage.getItem(latestResultIdKey);
      const directCurrent =
        readJson<ResultProfile>(window.sessionStorage, currentResultKey) ??
        readJson<ResultProfile>(window.localStorage, currentResultKey);
      const recoveredResult =
        (requestedResultId ? parsed[requestedResultId] : undefined) ??
        (latestResultId ? parsed[latestResultId] : undefined) ??
        directCurrent;

      if (!isFresh(recoveredResult)) {
        // Browser-local result lookup has to hydrate after mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setResult("missing");
        return;
      }

      // Result data lives in browser local storage, so this restore happens after hydration.
      if (recoveredResult.resultId !== requestedResultId) {
        const resultPath = locale === "fr" ? "/fr/personality-test/results" : "/personality-test/results";
        window.history.replaceState(
          null,
          "",
          `${resultPath}?resultId=${encodeURIComponent(recoveredResult.resultId)}`
        );
      }
      setResult(recoveredResult);
    } catch {
      setResult("missing");
    }
  }, [locale, resultId]);

  async function shareNative() {
    if (!result || result === "missing") return;
    const shareResult = localizeResult(result, locale);
    const text =
      locale === "fr"
        ? `J'ai obtenu ${shareResult.archetype} sur Great Mind Profile.`
        : `I got ${shareResult.archetype} on Great Mind Profile.`;
    const shareUrl = `${window.location.origin}/results/${result.sixteenType.toLowerCase()}`;
    if (navigator.share) {
      await navigator.share({ title: "My Great Mind Profile", text, url: shareUrl });
      return;
    }
    await navigator.clipboard.writeText(shareUrl);
    setShareMessage(copy.shareSaved);
  }

  async function downloadCard() {
    if (!result || result === "missing") return;
    const target = reportRef.current;
    if (!target) return;

    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(target, {
      backgroundColor: "#f8fafc",
      scale: Math.min(window.devicePixelRatio || 1, 2),
      useCORS: true,
      windowWidth: target.scrollWidth,
      windowHeight: target.scrollHeight
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${result.resultId}-great-mind-profile.png`;
    link.click();
    setShareMessage(copy.imageSaved);
  }

  async function shareTo(platform: "x" | "facebook" | "whatsapp" | "instagram") {
    if (!result || result === "missing") return;
    const url = `${window.location.origin}/results/${result.sixteenType.toLowerCase()}`;
    const shareResult = localizeResult(result, locale);
    const text =
      locale === "fr"
        ? `J'ai obtenu ${shareResult.archetype} (${result.sixteenType}) sur Great Mind Profile.`
        : `I got ${shareResult.archetype} (${result.sixteenType}) on Great Mind Profile.`;
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);

    if (platform === "instagram") {
      await downloadCard();
      await navigator.clipboard.writeText(`${text} ${url}`);
      setShareMessage(copy.instagram);
      return;
    }

    const links = {
      x: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`
    };

    window.open(links[platform], "_blank", "noopener,noreferrer");
  }

  if (!result) {
    return (
      <main className="shell quiz-shell">
        <div className="card">{copy.loading}</div>
      </main>
    );
  }

  if (result === "missing") {
    return (
      <main className="shell quiz-shell">
        <section className="card quiz-intro">
          <p className="eyebrow">{copy.missingEyebrow}</p>
          <h1>{copy.missingTitle}</h1>
          <p>{copy.missingBody}</p>
          <div className="button-row start-action">
            <Link className="button" href={locale === "fr" ? "/fr/personality-test/start" : "/personality-test/start"}>
              {copy.startQuiz}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const visual = typeVisuals[(result.sixteenType in typeVisuals ? result.sixteenType : "INFP") as PersonalityType];
  const typeStyle = {
    "--type-primary": visual.primary,
    "--type-secondary": visual.secondary,
    "--type-soft": visual.soft
  } as CSSProperties;
  const display = localizeResult(result, locale);
  const displayLabels = locale === "fr" ? frenchLabels : labels;

  return (
    <main className="shell quiz-shell" ref={reportRef}>
      <section className="card result-hero-card" style={typeStyle}>
        <div>
          <p className="eyebrow">{copy.yourResult}</p>
          <h1>{display.archetype}</h1>
          <p>{display.summary}</p>
          <div className="button-row">
            <span className="secondary-button">
              {copy.confidence} {result.confidence}%
            </span>
            <span className="secondary-button">
              {copy.typeEstimate} {result.sixteenType}
            </span>
            <span className="secondary-button">{display.enneagram}</span>
          </div>
          {copy.note ? <p style={{ marginTop: 14 }}>{copy.note}</p> : null}
        </div>
        <PersonalityMascot type={result.sixteenType} />
      </section>

      <section className="card type-story-card" style={{ ...typeStyle, marginTop: 18 }}>
        <p className="eyebrow">{copy.typeStory}</p>
        <h2>
          {display.sixteenType}: {display.typeProfile.name}
        </h2>
        <p>{display.typeProfile.overview}</p>
        <div className="type-story-body">
          <div>
            <h3>{copy.simplePattern}</h3>
            <p>{display.deepDive[0]}</p>
          </div>
          <div>
            <h3>{copy.howYouThink}</h3>
            <p>{display.typeProfile.howYouThink}</p>
          </div>
          <div>
            <h3>{copy.whatPeopleNotice}</h3>
            <p>{display.deepDive[1]}</p>
          </div>
          <div>
            <h3>{copy.underPressure}</h3>
            <p>{display.typeProfile.underPressure}</p>
          </div>
          <div>
            <h3>{copy.howUse}</h3>
            <p>{display.deepDive.slice(2).join(" ")}</p>
          </div>
        </div>
      </section>

      <section className="result-grid" style={{ marginTop: 18 }}>
        <div className="card">
          <h2>{copy.bigFiveScores}</h2>
          {Object.entries(display.bigFive).map(([key, value]) => (
            <TraitBar key={key} label={displayLabels[key] ?? key} value={value} />
          ))}
        </div>
        <div className="card">
          <h2>{copy.radarView}</h2>
          <RadarChart values={display.bigFive} />
        </div>
      </section>

      <section className="result-grid" style={{ marginTop: 18 }}>
        <div className="card">
          <h2>{copy.hexacoScores}</h2>
          {Object.entries(display.hexaco).map(([key, value]) => (
            <TraitBar key={key} label={displayLabels[key] ?? key} value={value} />
          ))}
        </div>
        <div className="card">
          <h2>{copy.typeEstimates}</h2>
          <p>
            {copy.primaryType}: <strong>{display.sixteenType}</strong>
          </p>
          <p>{copy.secondaryTypes}: {display.secondaryTypes.join(", ")}</p>
          <p>{copy.motivation}: {display.enneagram}</p>
          <details className="learn-more">
            <summary>{copy.whyModels}</summary>
            {display.modelExplanations.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </details>
        </div>
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <p className="eyebrow">{copy.matchEyebrow}</p>
        <h2>{copy.matchTitle}</h2>
        <p>{copy.matchIntro}</p>
        <div className="match-grid" style={{ marginTop: 18 }}>
          <div>
            <h3>
              {copy.easyMatch}: {display.typeMatch.type} - {display.typeMatch.name}
            </h3>
            <p>{display.typeMatch.whyItFits}</p>
            <p>{display.typeMatch.whyItCanBeHard}</p>
            <p>{display.typeMatch.makeItWork}</p>
          </div>
          <div>
            <h3>
              {copy.harderMatch}: {display.typeChallenge.type} - {display.typeChallenge.name}
            </h3>
            <p>{display.typeChallenge.whyItFits}</p>
            <p>{display.typeChallenge.whyItCanBeHard}</p>
            <p>{display.typeChallenge.makeItWork}</p>
          </div>
        </div>
      </section>

      <section className="grid" style={{ marginTop: 18 }}>
        <div className="card">
          <h2>{copy.strengths}</h2>
          {display.strengths.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <div className="card">
          <h2>{copy.blindSpots}</h2>
          {display.blindSpots.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <div className="card">
          <h2>{copy.growthPlan}</h2>
          {display.growthPlan.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="result-grid" style={{ marginTop: 18 }}>
        <div className="card">
          <p className="eyebrow">{copy.funScience}</p>
          <h2>{copy.jobsTitle}</h2>
          <p>{copy.jobsIntro}</p>
          <h3>{copy.studyPaths}</h3>
          <p>{display.typeProfile.bestStudyPaths.join(", ")}</p>
          <h3>{copy.jobFamilies}</h3>
          <p>{display.typeProfile.bestJobFamilies.join(", ")}</p>
        </div>
        <div className="card">
          <p className="eyebrow">{copy.careful}</p>
          <h2>{copy.funFacts}</h2>
          {display.typeProfile.funFacts.map((fact) => (
            <p key={fact}>{fact}</p>
          ))}
          <h3>{copy.colorVibe}</h3>
          <p>{copy.colorNote}</p>
          <div className="swatches">
            {display.typeProfile.colorPalette.map((color) => (
              <span key={color} style={colorStyle(color)}>
                {colorLabel(color, locale)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <p className="eyebrow">{copy.evidenceEyebrow}</p>
        <h2>{copy.evidenceTitle}</h2>
        {display.evidenceNotes.map((note) => (
          <p key={note}>{note}</p>
        ))}
        <details className="learn-more">
          <summary>{copy.researchSummary}</summary>
          <p>
            Big Five and relationship notes:{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/30776092/" rel="noreferrer" target="_blank">
              O&apos;Meara & South, 2019
            </a>{" "}
            and{" "}
            <a
              href="https://rune.une.edu.au/entities/publication/a8cd374c-6c21-45cb-a61d-6f23b787c743"
              rel="noreferrer"
              target="_blank"
            >
              Malouff et al., 2010
            </a>
            .
          </p>
          <p>
            HEXACO trait wording:{" "}
            <a href="https://hexaco.org/scaledescriptions%26lang%3Den" rel="noreferrer" target="_blank">
              Lee & Ashton HEXACO-PI-R scale descriptions
            </a>
            .
          </p>
          <p>
            Job and study fit wording:{" "}
            <a
              href="https://iro.uiowa.edu/esploro/outputs/journalArticle/THE-BIG-FIVE-PERSONALITY-DIMENSIONS-AND/9984963115202771"
              rel="noreferrer"
              target="_blank"
            >
              Barrick & Mount, 1991
            </a>
            .
          </p>
        </details>
      </section>

      <section className="grid" style={{ marginTop: 18 }}>
        <div className="card">
          <h2>{copy.careerStyle}</h2>
          <p>{display.careerStyle}</p>
        </div>
        <div className="card">
          <h2>{copy.relationshipStyle}</h2>
          <p>{display.relationshipStyle}</p>
        </div>
        <div className="card">
          <h2>{copy.stressStyle}</h2>
          <p>{display.stressStyle}</p>
        </div>
      </section>

      <div style={{ marginTop: 18 }}>
        <AdSlot />
      </div>

      <section className="card" style={{ marginTop: 18 }}>
        <h2>{copy.shareTitle}</h2>
        <div className="button-row">
          <button className="button" onClick={shareNative} type="button">
            {copy.share}
          </button>
          <button className="secondary-button" onClick={downloadCard} type="button">
            {copy.download}
          </button>
          <Link className="secondary-button" href={locale === "fr" ? "/fr/personality-test/start" : "/personality-test/start"}>
            {copy.retake}
          </Link>
          <Link className="secondary-button" href={`/results/${result.sixteenType.toLowerCase()}`}>
            {copy.shareable}
          </Link>
        </div>
        <div className="share-grid" aria-label="Social share options">
          <button className="secondary-button" onClick={() => shareTo("x")} type="button">
            {copy.shareOnX}
          </button>
          <button className="secondary-button" onClick={() => shareTo("facebook")} type="button">
            Facebook
          </button>
          <button className="secondary-button" onClick={() => shareTo("whatsapp")} type="button">
            WhatsApp
          </button>
          <button className="secondary-button" onClick={() => shareTo("instagram")} type="button">
            {copy.instagramImage}
          </button>
        </div>
        {shareMessage ? <p className="share-note">{shareMessage}</p> : null}
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <h2>{copy.recommendedArticles}</h2>
        <div className="footer-links">
          <Link href="/big-five">{copy.bigFiveGuide}</Link>
          <Link href="/hexaco">{copy.hexacoGuide}</Link>
          <Link href="/enneagram">{copy.enneagramGuide}</Link>
          <Link href="/methodology">{copy.methodology}</Link>
        </div>
      </section>
    </main>
  );
}
