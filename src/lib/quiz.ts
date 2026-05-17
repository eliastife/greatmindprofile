export type Mode = "quick" | "standard" | "deep";
export type Likert = 1 | 2 | 3 | 4 | 5;

export type Question = {
  id: string;
  text: string;
  trait: "openness" | "conscientiousness" | "extraversion" | "agreeableness" | "stability";
  hexaco: "honestyHumility" | "emotionality" | "extraversion" | "agreeableness" | "conscientiousness" | "openness";
  typeAxis: "EI" | "SN" | "TF" | "JP";
  typePolarity?: 1 | -1;
  enneagram: "one" | "two" | "three" | "four" | "five" | "six" | "seven" | "eight" | "nine";
  reverse?: boolean;
  modes: Mode[];
};

const allModes: Mode[] = ["quick", "standard", "deep"];

export const modes = {
  quick: { label: "Quick", minutes: "6 min", description: "A short read with enough coverage to be useful." },
  standard: { label: "Standard", minutes: "11 min", description: "Recommended for a detailed, balanced profile." },
  deep: { label: "Deep", minutes: "18 min", description: "More questions for higher confidence and nuance." }
};

export const likertLabels = [
  "Strongly disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly agree"
] as const;

export const questions: Question[] = [
  {
    id: "q1",
    text: "I enjoy exploring unfamiliar ideas, theories, or creative possibilities.",
    trait: "openness",
    hexaco: "openness",
    typeAxis: "SN",
    enneagram: "five",
    modes: allModes
  },
  {
    id: "q2",
    text: "I usually plan my work before I begin.",
    trait: "conscientiousness",
    hexaco: "conscientiousness",
    typeAxis: "JP",
    enneagram: "one",
    modes: allModes
  },
  {
    id: "q3",
    text: "Social settings often give me energy.",
    trait: "extraversion",
    hexaco: "extraversion",
    typeAxis: "EI",
    enneagram: "seven",
    modes: allModes
  },
  {
    id: "q4",
    text: "I try to keep the peace even when I disagree.",
    trait: "agreeableness",
    hexaco: "agreeableness",
    typeAxis: "TF",
    enneagram: "nine",
    modes: allModes
  },
  {
    id: "q5",
    text: "I stay calm when plans change suddenly.",
    trait: "stability",
    hexaco: "emotionality",
    typeAxis: "JP",
    typePolarity: -1,
    enneagram: "six",
    reverse: true,
    modes: allModes
  },
  {
    id: "q6",
    text: "I would rather be honest than appear impressive.",
    trait: "agreeableness",
    hexaco: "honestyHumility",
    typeAxis: "TF",
    enneagram: "one",
    modes: allModes
  },
  {
    id: "q7",
    text: "I prefer practical facts over abstract speculation.",
    trait: "openness",
    hexaco: "openness",
    typeAxis: "SN",
    typePolarity: -1,
    enneagram: "five",
    reverse: true,
    modes: allModes
  },
  {
    id: "q8",
    text: "I can be spontaneous even when it disrupts my schedule.",
    trait: "conscientiousness",
    hexaco: "conscientiousness",
    typeAxis: "JP",
    typePolarity: -1,
    enneagram: "seven",
    reverse: true,
    modes: allModes
  },
  {
    id: "q9",
    text: "I often take initiative in groups.",
    trait: "extraversion",
    hexaco: "extraversion",
    typeAxis: "EI",
    enneagram: "eight",
    modes: ["standard", "deep"]
  },
  {
    id: "q10",
    text: "I notice other people's emotional needs quickly.",
    trait: "agreeableness",
    hexaco: "emotionality",
    typeAxis: "TF",
    enneagram: "two",
    modes: ["standard", "deep"]
  },
  {
    id: "q11",
    text: "I push myself to achieve visible results.",
    trait: "conscientiousness",
    hexaco: "conscientiousness",
    typeAxis: "JP",
    enneagram: "three",
    modes: ["standard", "deep"]
  },
  {
    id: "q12",
    text: "I need time alone to understand what I really feel.",
    trait: "openness",
    hexaco: "openness",
    typeAxis: "EI",
    typePolarity: -1,
    enneagram: "four",
    reverse: true,
    modes: ["standard", "deep"]
  },
  {
    id: "q13",
    text: "I become uneasy when expectations are unclear.",
    trait: "stability",
    hexaco: "emotionality",
    typeAxis: "JP",
    enneagram: "six",
    modes: ["standard", "deep"]
  },
  {
    id: "q14",
    text: "I can forgive quickly after conflict.",
    trait: "agreeableness",
    hexaco: "agreeableness",
    typeAxis: "TF",
    enneagram: "nine",
    modes: ["standard", "deep"]
  },
  {
    id: "q15",
    text: "I dislike using charm to get special treatment.",
    trait: "agreeableness",
    hexaco: "honestyHumility",
    typeAxis: "TF",
    enneagram: "one",
    modes: ["standard", "deep"]
  },
  {
    id: "q16",
    text: "I like keeping several options open until the last responsible moment.",
    trait: "openness",
    hexaco: "openness",
    typeAxis: "JP",
    typePolarity: -1,
    enneagram: "seven",
    reverse: true,
    modes: ["deep"]
  },
  {
    id: "q17",
    text: "I am comfortable challenging people directly when needed.",
    trait: "extraversion",
    hexaco: "agreeableness",
    typeAxis: "TF",
    typePolarity: -1,
    enneagram: "eight",
    reverse: true,
    modes: ["deep"]
  },
  {
    id: "q18",
    text: "I research deeply before forming a strong opinion.",
    trait: "openness",
    hexaco: "openness",
    typeAxis: "SN",
    enneagram: "five",
    modes: ["deep"]
  },
  {
    id: "q19",
    text: "When stressed, I can become overly self-critical.",
    trait: "stability",
    hexaco: "emotionality",
    typeAxis: "TF",
    enneagram: "one",
    modes: ["deep"]
  },
  {
    id: "q20",
    text: "I often adapt my tone to help others feel comfortable.",
    trait: "agreeableness",
    hexaco: "agreeableness",
    typeAxis: "TF",
    enneagram: "two",
    modes: ["deep"]
  },
  {
    id: "q21",
    text: "I enjoy finding the hidden pattern behind a messy situation.",
    trait: "openness",
    hexaco: "openness",
    typeAxis: "SN",
    enneagram: "five",
    modes: allModes
  },
  {
    id: "q22",
    text: "People can usually count on me to finish what I start.",
    trait: "conscientiousness",
    hexaco: "conscientiousness",
    typeAxis: "JP",
    enneagram: "three",
    modes: allModes
  },
  {
    id: "q23",
    text: "I speak up quickly when a group needs direction.",
    trait: "extraversion",
    hexaco: "extraversion",
    typeAxis: "EI",
    enneagram: "eight",
    modes: allModes
  },
  {
    id: "q24",
    text: "I would rather understand someone's view than win the argument.",
    trait: "agreeableness",
    hexaco: "agreeableness",
    typeAxis: "TF",
    enneagram: "nine",
    modes: allModes
  },
  {
    id: "q25",
    text: "Small setbacks can stay on my mind longer than I want.",
    trait: "stability",
    hexaco: "emotionality",
    typeAxis: "JP",
    enneagram: "six",
    modes: allModes
  },
  {
    id: "q26",
    text: "I dislike bending rules for personal advantage.",
    trait: "agreeableness",
    hexaco: "honestyHumility",
    typeAxis: "TF",
    enneagram: "one",
    modes: allModes
  },
  {
    id: "q27",
    text: "I prefer familiar routines over constant novelty.",
    trait: "openness",
    hexaco: "openness",
    typeAxis: "SN",
    typePolarity: -1,
    enneagram: "six",
    reverse: true,
    modes: allModes
  },
  {
    id: "q28",
    text: "I often organize shared work before anyone asks.",
    trait: "conscientiousness",
    hexaco: "conscientiousness",
    typeAxis: "JP",
    enneagram: "one",
    modes: allModes
  },
  {
    id: "q29",
    text: "I feel drained after too much social attention.",
    trait: "extraversion",
    hexaco: "extraversion",
    typeAxis: "EI",
    typePolarity: -1,
    enneagram: "four",
    reverse: true,
    modes: allModes
  },
  {
    id: "q30",
    text: "I try to be generous even when nobody will notice.",
    trait: "agreeableness",
    hexaco: "honestyHumility",
    typeAxis: "TF",
    enneagram: "two",
    modes: allModes
  },
  {
    id: "q31",
    text: "I like turning vague ideas into clear next steps.",
    trait: "conscientiousness",
    hexaco: "conscientiousness",
    typeAxis: "JP",
    enneagram: "three",
    modes: ["standard", "deep"]
  },
  {
    id: "q32",
    text: "I am drawn to art, music, language, or design that feels original.",
    trait: "openness",
    hexaco: "openness",
    typeAxis: "SN",
    enneagram: "four",
    modes: ["standard", "deep"]
  },
  {
    id: "q33",
    text: "I can be blunt when something important is being avoided.",
    trait: "agreeableness",
    hexaco: "agreeableness",
    typeAxis: "TF",
    typePolarity: -1,
    enneagram: "eight",
    reverse: true,
    modes: ["standard", "deep"]
  },
  {
    id: "q34",
    text: "I often check whether my choices are responsible to other people.",
    trait: "agreeableness",
    hexaco: "honestyHumility",
    typeAxis: "TF",
    enneagram: "six",
    modes: ["standard", "deep"]
  },
  {
    id: "q35",
    text: "I prefer making decisions with objective criteria.",
    trait: "conscientiousness",
    hexaco: "conscientiousness",
    typeAxis: "TF",
    typePolarity: -1,
    enneagram: "five",
    reverse: true,
    modes: ["standard", "deep"]
  },
  {
    id: "q36",
    text: "I often bring energy into a quiet room.",
    trait: "extraversion",
    hexaco: "extraversion",
    typeAxis: "EI",
    enneagram: "seven",
    modes: ["standard", "deep"]
  },
  {
    id: "q37",
    text: "I prefer flexible plans that can evolve as new information arrives.",
    trait: "openness",
    hexaco: "openness",
    typeAxis: "JP",
    typePolarity: -1,
    enneagram: "seven",
    reverse: true,
    modes: ["standard", "deep"]
  },
  {
    id: "q38",
    text: "I am sensitive to signs that someone may feel excluded.",
    trait: "agreeableness",
    hexaco: "emotionality",
    typeAxis: "TF",
    enneagram: "two",
    modes: ["standard", "deep"]
  },
  {
    id: "q39",
    text: "I can stay focused through boring but important tasks.",
    trait: "conscientiousness",
    hexaco: "conscientiousness",
    typeAxis: "JP",
    enneagram: "one",
    modes: ["standard", "deep"]
  },
  {
    id: "q40",
    text: "I prefer one-on-one depth over broad social mingling.",
    trait: "extraversion",
    hexaco: "extraversion",
    typeAxis: "EI",
    typePolarity: -1,
    enneagram: "five",
    reverse: true,
    modes: ["standard", "deep"]
  },
  {
    id: "q41",
    text: "I rarely exaggerate my achievements to make an impression.",
    trait: "agreeableness",
    hexaco: "honestyHumility",
    typeAxis: "TF",
    enneagram: "three",
    reverse: true,
    modes: ["standard", "deep"]
  },
  {
    id: "q42",
    text: "When I am uncertain, I look for reassurance or a second opinion.",
    trait: "stability",
    hexaco: "emotionality",
    typeAxis: "JP",
    enneagram: "six",
    modes: ["standard", "deep"]
  },
  {
    id: "q43",
    text: "I notice when a system is inefficient and want to improve it.",
    trait: "conscientiousness",
    hexaco: "conscientiousness",
    typeAxis: "JP",
    enneagram: "one",
    modes: ["deep"]
  },
  {
    id: "q44",
    text: "I can sit with complex emotions without needing to simplify them.",
    trait: "openness",
    hexaco: "openness",
    typeAxis: "SN",
    enneagram: "four",
    modes: ["deep"]
  },
  {
    id: "q45",
    text: "I tend to protect my independence when people pressure me.",
    trait: "agreeableness",
    hexaco: "agreeableness",
    typeAxis: "TF",
    typePolarity: -1,
    enneagram: "eight",
    reverse: true,
    modes: ["deep"]
  },
  {
    id: "q46",
    text: "I often imagine several future scenarios before choosing.",
    trait: "openness",
    hexaco: "openness",
    typeAxis: "SN",
    enneagram: "six",
    modes: ["deep"]
  },
  {
    id: "q47",
    text: "Recognition motivates me when it reflects real excellence.",
    trait: "conscientiousness",
    hexaco: "conscientiousness",
    typeAxis: "JP",
    enneagram: "three",
    modes: ["deep"]
  },
  {
    id: "q48",
    text: "I usually recover quickly after social awkwardness.",
    trait: "stability",
    hexaco: "extraversion",
    typeAxis: "EI",
    enneagram: "seven",
    reverse: true,
    modes: ["deep"]
  },
  {
    id: "q49",
    text: "I feel responsible for making sure everyone is okay.",
    trait: "agreeableness",
    hexaco: "emotionality",
    typeAxis: "TF",
    enneagram: "two",
    modes: ["deep"]
  },
  {
    id: "q50",
    text: "I enjoy debating ideas even when there is no immediate practical use.",
    trait: "openness",
    hexaco: "openness",
    typeAxis: "SN",
    enneagram: "five",
    modes: ["deep"]
  },
  {
    id: "q51",
    text: "I prefer harmony so much that I may delay hard conversations.",
    trait: "agreeableness",
    hexaco: "agreeableness",
    typeAxis: "TF",
    enneagram: "nine",
    modes: ["deep"]
  },
  {
    id: "q52",
    text: "I keep my promises even when they become inconvenient.",
    trait: "conscientiousness",
    hexaco: "honestyHumility",
    typeAxis: "JP",
    enneagram: "one",
    modes: ["deep"]
  },
  {
    id: "q53",
    text: "I seek new experiences when life starts feeling too predictable.",
    trait: "openness",
    hexaco: "openness",
    typeAxis: "SN",
    enneagram: "seven",
    modes: ["deep"]
  },
  {
    id: "q54",
    text: "I prefer resolving conflict directly instead of hoping it fades.",
    trait: "extraversion",
    hexaco: "agreeableness",
    typeAxis: "TF",
    typePolarity: -1,
    enneagram: "eight",
    reverse: true,
    modes: ["deep"]
  }
];

export function questionsForMode(mode: Mode) {
  return questions.filter((question) => question.modes.includes(mode));
}
