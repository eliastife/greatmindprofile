import type { Likert, Mode, Question } from "./quiz";
import { questionsForMode } from "./quiz";

export type AnswerMap = Record<string, Likert>;

export const SCORING_VERSION = 4;

export type ResultProfile = {
  scoringVersion: number;
  resultId: string;
  completedAt: string;
  mode: Mode;
  archetype: string;
  summary: string;
  confidence: number;
  bigFive: Record<string, number>;
  hexaco: Record<string, number>;
  sixteenType: string;
  secondaryTypes: string[];
  enneagram: string;
  strengths: string[];
  blindSpots: string[];
  careerStyle: string;
  relationshipStyle: string;
  stressStyle: string;
  growthPlan: string[];
  typeMatch: TypeMatch;
  typeChallenge: TypeMatch;
  evidenceNotes: string[];
  deepDive: string[];
  typeProfile: {
    name: string;
    overview: string;
    howYouThink: string;
    underPressure: string;
    bestStudyPaths: string[];
    bestJobFamilies: string[];
    colorPalette: string[];
    funFacts: string[];
  };
  modelExplanations: string[];
};

export type TypeMatch = {
  type: string;
  name: string;
  whyItFits: string;
  whyItCanBeHard: string;
  makeItWork: string;
};

const bigFiveKeys = ["openness", "conscientiousness", "extraversion", "agreeableness", "stability"] as const;
const hexacoKeys = ["honestyHumility", "emotionality", "extraversion", "agreeableness", "conscientiousness", "openness"] as const;
const enneagramNames: Record<string, string> = {
  one: "Type 1 - The Improver",
  two: "Type 2 - The Helper",
  three: "Type 3 - The Achiever",
  four: "Type 4 - The Individualist",
  five: "Type 5 - The Investigator",
  six: "Type 6 - The Loyalist",
  seven: "Type 7 - The Enthusiast",
  eight: "Type 8 - The Challenger",
  nine: "Type 9 - The Peacemaker"
};

export const typeAlternates: Record<string, string[]> = {
  INTJ: ["INFJ", "ENTJ"],
  INTP: ["INTJ", "ENTP"],
  ENTJ: ["INTJ", "ENFJ"],
  ENTP: ["INTP", "ENFP"],
  INFJ: ["INTJ", "INFP"],
  INFP: ["INFJ", "ENFP"],
  ENFJ: ["INFJ", "ENTJ"],
  ENFP: ["INFP", "ENTP"],
  ISTJ: ["ISFJ", "ESTJ"],
  ISFJ: ["ISTJ", "ESFJ"],
  ESTJ: ["ISTJ", "ENTJ"],
  ESFJ: ["ISFJ", "ENFJ"],
  ISTP: ["INTP", "ESTP"],
  ISFP: ["INFP", "ESFP"],
  ESTP: ["ISTP", "ENTP"],
  ESFP: ["ISFP", "ENFP"]
};

const matchMap: Record<string, { best: string; challenge: string }> = {
  INTJ: { best: "ENFP", challenge: "ESFP" },
  INTP: { best: "ENFJ", challenge: "ESFJ" },
  ENTJ: { best: "INFP", challenge: "ISFP" },
  ENTP: { best: "INFJ", challenge: "ISFJ" },
  INFJ: { best: "ENTP", challenge: "ESTP" },
  INFP: { best: "ENTJ", challenge: "ESTJ" },
  ENFJ: { best: "INTP", challenge: "ISTP" },
  ENFP: { best: "INTJ", challenge: "ISTJ" },
  ISTJ: { best: "ESFP", challenge: "ENFP" },
  ISFJ: { best: "ESTP", challenge: "ENTP" },
  ESTJ: { best: "ISFP", challenge: "INFP" },
  ESFJ: { best: "ISTP", challenge: "INTP" },
  ISTP: { best: "ESFJ", challenge: "ENFJ" },
  ISFP: { best: "ESTJ", challenge: "ENTJ" },
  ESTP: { best: "ISFJ", challenge: "INFJ" },
  ESFP: { best: "ISTJ", challenge: "INTJ" }
};

export const typeProfiles: Record<string, ResultProfile["typeProfile"]> = {
  INTJ: {
    name: "The Strategic Architect",
    overview: "A private, future-focused problem solver who likes elegant systems and long-range plans.",
    howYouThink: "You tend to compress complexity into models, then test whether the model actually works.",
    underPressure: "You may become impatient with slow consensus or unclear standards.",
    bestStudyPaths: ["Computer science", "Engineering", "Economics", "Research methods", "Architecture"],
    bestJobFamilies: ["Strategy", "Product", "Data", "Systems design", "Technical leadership"],
    colorPalette: ["deep blue", "cool gray", "silver"],
    funFacts: ["Often enjoys mastery more than applause.", "Usually prefers competence signals over status signals."]
  },
  INTP: {
    name: "The Analytical Inventor",
    overview: "A curious analyst who enjoys taking ideas apart and rebuilding them more cleanly.",
    howYouThink: "You tend to follow questions until the hidden logic becomes visible.",
    underPressure: "You may retreat into analysis when action or emotional clarity is needed.",
    bestStudyPaths: ["Mathematics", "Philosophy", "Computer science", "Physics", "Linguistics"],
    bestJobFamilies: ["Research", "Software", "Data science", "Technical writing", "R&D"],
    colorPalette: ["indigo", "white", "charcoal"],
    funFacts: ["Often learns fastest through independent exploration.", "May collect frameworks the way other people collect souvenirs."]
  },
  ENTJ: {
    name: "The Decisive Builder",
    overview: "A goal-oriented organizer who turns fuzzy ambition into visible progress.",
    howYouThink: "You tend to notice leverage points, roles, incentives, and timelines.",
    underPressure: "You may push too hard before others have emotionally caught up.",
    bestStudyPaths: ["Business", "Law", "Engineering management", "Economics", "Public policy"],
    bestJobFamilies: ["Leadership", "Operations", "Entrepreneurship", "Consulting", "Growth"],
    colorPalette: ["navy", "gold", "black"],
    funFacts: ["Often relaxes by optimizing something.", "Usually respects directness when it comes with competence."]
  },
  ENTP: {
    name: "The Possibility Hacker",
    overview: "A fast, playful thinker who enjoys reframing problems and testing unconventional angles.",
    howYouThink: "You tend to generate options quickly and learn by challenging assumptions.",
    underPressure: "You may scatter attention across too many interesting paths.",
    bestStudyPaths: ["Entrepreneurship", "Media", "Computer science", "Debate", "Design strategy"],
    bestJobFamilies: ["Startups", "Marketing strategy", "Product discovery", "Innovation", "Sales engineering"],
    colorPalette: ["electric blue", "orange", "white"],
    funFacts: ["Often turns constraints into games.", "May use humor as a thinking tool."]
  },
  INFJ: {
    name: "The Insightful Counselor",
    overview: "A meaning-oriented pattern reader who wants ideas to improve real human lives.",
    howYouThink: "You tend to connect emotional signals, future implications, and values.",
    underPressure: "You may carry too much quietly before naming what you need.",
    bestStudyPaths: ["Psychology", "Education", "Writing", "Public health", "Human-centered design"],
    bestJobFamilies: ["Counseling", "UX research", "Editorial", "Nonprofit strategy", "People development"],
    colorPalette: ["teal", "violet", "soft white"],
    funFacts: ["Often remembers the emotional logic of a room.", "Usually wants depth, not just harmony."]
  },
  INFP: {
    name: "The Values Explorer",
    overview: "A reflective idealist who looks for authenticity, meaning, and creative expression.",
    howYouThink: "You tend to ask whether a choice feels true, humane, and personally coherent.",
    underPressure: "You may avoid practical structure when it feels like it threatens freedom.",
    bestStudyPaths: ["Creative writing", "Psychology", "Arts", "Social work", "Literature"],
    bestJobFamilies: ["Writing", "Design", "Counseling support", "Community work", "Brand storytelling"],
    colorPalette: ["sage", "lavender", "cream"],
    funFacts: ["Often has strong taste before having a full explanation.", "May treat personal values like a compass."]
  },
  ENFJ: {
    name: "The People Catalyst",
    overview: "A warm organizer who helps people align around growth, purpose, and shared momentum.",
    howYouThink: "You tend to read group energy and translate it into direction.",
    underPressure: "You may over-function for others instead of letting them own their part.",
    bestStudyPaths: ["Education", "Communications", "Psychology", "Leadership", "Public relations"],
    bestJobFamilies: ["Teaching", "Coaching", "People ops", "Community leadership", "Partnerships"],
    colorPalette: ["coral", "teal", "warm white"],
    funFacts: ["Often remembers what motivates different people.", "Can make structure feel emotionally inviting."]
  },
  ENFP: {
    name: "The Creative Connector",
    overview: "An energetic explorer who links ideas, people, and possibilities with contagious enthusiasm.",
    howYouThink: "You tend to think in branching possibilities and human stories.",
    underPressure: "You may chase novelty when a slower finish is needed.",
    bestStudyPaths: ["Marketing", "Design", "Communications", "Psychology", "Entrepreneurship"],
    bestJobFamilies: ["Creative strategy", "Community", "Product discovery", "Media", "Teaching"],
    colorPalette: ["yellow", "turquoise", "rose"],
    funFacts: ["Often finds the fun angle before anyone else.", "May brainstorm better while talking."]
  },
  ISTJ: {
    name: "The Reliable Steward",
    overview: "A grounded executor who values accuracy, responsibility, and proven methods.",
    howYouThink: "You tend to compare choices against facts, precedent, and duty.",
    underPressure: "You may hold too tightly to the known route when adaptation is useful.",
    bestStudyPaths: ["Accounting", "Law", "Operations", "Information systems", "Healthcare administration"],
    bestJobFamilies: ["Compliance", "Project coordination", "Finance", "Logistics", "Quality assurance"],
    colorPalette: ["forest green", "navy", "stone"],
    funFacts: ["Often builds trust through consistency.", "Usually notices details others assumed were handled."]
  },
  ISFJ: {
    name: "The Thoughtful Protector",
    overview: "A steady, caring person who notices practical needs and honors commitments.",
    howYouThink: "You tend to remember what helps people feel safe, respected, and supported.",
    underPressure: "You may say yes too long before admitting you are overloaded.",
    bestStudyPaths: ["Nursing", "Education", "Human services", "Administration", "Nutrition"],
    bestJobFamilies: ["Healthcare", "Support operations", "Teaching", "Client care", "Office management"],
    colorPalette: ["soft blue", "sage", "ivory"],
    funFacts: ["Often remembers preferences others forget.", "Can make reliability feel warm rather than rigid."]
  },
  ESTJ: {
    name: "The Practical Director",
    overview: "A direct organizer who brings order, accountability, and momentum to shared goals.",
    howYouThink: "You tend to look for the rule, owner, deadline, and measurable outcome.",
    underPressure: "You may sound more certain than the situation really allows.",
    bestStudyPaths: ["Business administration", "Law", "Public administration", "Supply chain", "Finance"],
    bestJobFamilies: ["Operations", "Management", "Civic leadership", "Finance", "Logistics"],
    colorPalette: ["royal blue", "white", "red"],
    funFacts: ["Often improves a meeting by clarifying the decision.", "Usually trusts action more than vague intention."]
  },
  ESFJ: {
    name: "The Community Builder",
    overview: "A socially attentive organizer who creates belonging through care and follow-through.",
    howYouThink: "You tend to notice roles, expectations, relationships, and practical needs.",
    underPressure: "You may become stressed when social signals feel unclear or unappreciated.",
    bestStudyPaths: ["Education", "Healthcare", "Communications", "Hospitality", "Human resources"],
    bestJobFamilies: ["Teaching", "Care coordination", "Events", "HR", "Customer success"],
    colorPalette: ["peach", "sky blue", "warm gray"],
    funFacts: ["Often turns logistics into hospitality.", "May spot relationship tension before it becomes visible."]
  },
  ISTP: {
    name: "The Tactical Problem Solver",
    overview: "A calm, hands-on analyst who learns by testing what works.",
    howYouThink: "You tend to strip problems down to mechanics, evidence, and immediate leverage.",
    underPressure: "You may detach so quickly that others cannot read your care.",
    bestStudyPaths: ["Engineering technology", "Mechanics", "Computer security", "Sports science", "Industrial design"],
    bestJobFamilies: ["Technical troubleshooting", "Security", "Skilled trades", "Field engineering", "Emergency response"],
    colorPalette: ["graphite", "steel", "green"],
    funFacts: ["Often learns faster by doing than by hearing theory.", "Can stay calm when the practical next move is clear."]
  },
  ISFP: {
    name: "The Sensitive Maker",
    overview: "A gentle, experience-led creator who values beauty, autonomy, and personal honesty.",
    howYouThink: "You tend to trust lived experience, taste, and what feels humane in the moment.",
    underPressure: "You may withdraw when expectations feel controlling.",
    bestStudyPaths: ["Visual arts", "Design", "Music", "Occupational therapy", "Environmental studies"],
    bestJobFamilies: ["Design", "Wellness", "Craft", "Care work", "Content creation"],
    colorPalette: ["moss", "blush", "cream"],
    funFacts: ["Often has a strong sensory signature.", "May communicate values through style more than speeches."]
  },
  ESTP: {
    name: "The Real-Time Operator",
    overview: "A bold, adaptive doer who reads the moment and moves quickly.",
    howYouThink: "You tend to learn from direct feedback, action, and visible results.",
    underPressure: "You may skip reflection when speed feels rewarding.",
    bestStudyPaths: ["Business", "Sports science", "Sales", "Emergency management", "Media production"],
    bestJobFamilies: ["Sales", "Entrepreneurship", "Field work", "Operations", "Performance-based roles"],
    colorPalette: ["red", "black", "silver"],
    funFacts: ["Often notices opportunities in real time.", "May negotiate best when the stakes are alive."]
  },
  ESFP: {
    name: "The Expressive Energizer",
    overview: "A warm, lively responder who brings people into the present moment.",
    howYouThink: "You tend to notice mood, sensory detail, timing, and what will make an experience land.",
    underPressure: "You may avoid heavy future planning when the present needs attention.",
    bestStudyPaths: ["Performing arts", "Hospitality", "Marketing", "Education", "Wellness"],
    bestJobFamilies: ["Events", "Entertainment", "Customer experience", "Teaching", "Brand activation"],
    colorPalette: ["coral", "gold", "aqua"],
    funFacts: ["Often changes the energy of a room quickly.", "May understand people through expression before explanation."]
  }
};

function emptyScores(keys: readonly string[]) {
  return Object.fromEntries(keys.map((key) => [key, { total: 0, count: 0 }]));
}

function addScore(scores: ReturnType<typeof emptyScores>, key: string, value: number) {
  scores[key].total += value;
  scores[key].count += 1;
}

function normalize(value: number, question: Question) {
  const raw = question.reverse ? 6 - value : value;
  return ((raw - 1) / 4) * 100;
}

function finalize(scores: ReturnType<typeof emptyScores>) {
  return Object.fromEntries(
    Object.entries(scores).map(([key, score]) => [key, score.count ? Math.round(score.total / score.count) : 50])
  );
}

function topKey(scores: Record<string, number>) {
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function estimate16Type(axisScores: Record<"EI" | "SN" | "TF" | "JP", number>) {
  return `${axisScores.EI > 0 ? "E" : "I"}${axisScores.SN > 0 ? "N" : "S"}${axisScores.TF > 0 ? "F" : "T"}${axisScores.JP > 0 ? "J" : "P"}`;
}

function estimateTypeAxes(
  bigFive: Record<string, number>,
  hexaco: Record<string, number>,
  answerAxes: Record<"EI" | "SN" | "TF" | "JP", number>
) {
  return {
    EI: (bigFive.extraversion - 50) * 0.7 + (hexaco.extraversion - 50) * 0.3 + answerAxes.EI * 1.5,
    SN: (bigFive.openness - 50) * 0.72 + (hexaco.openness - 50) * 0.28 + answerAxes.SN * 1.5,
    TF:
      (bigFive.agreeableness - 50) * 0.55 +
      (hexaco.agreeableness - 50) * 0.2 +
      (hexaco.honestyHumility - 50) * 0.15 +
      (hexaco.emotionality - 50) * 0.1 +
      answerAxes.TF * 1.25,
    JP: (bigFive.conscientiousness - 50) * 0.7 + (hexaco.conscientiousness - 50) * 0.3 + answerAxes.JP * 1.5
  };
}

function archetypeFor(bigFive: Record<string, number>, sixteenType: string) {
  const open = bigFive.openness >= 60;
  const social = bigFive.extraversion >= 60;
  const organized = bigFive.conscientiousness >= 60;
  const steady = bigFive.stability >= 60;

  if (open && organized) return "The Strategic Explorer";
  if (social && organized) return "The Momentum Builder";
  if (open && !social) return "The Reflective Original";
  if (steady && bigFive.agreeableness >= 60) return "The Grounded Connector";
  if (sixteenType.includes("P")) return "The Adaptive Catalyst";
  return "The Practical Synthesizer";
}

function energyWord(type: string) {
  return type[0] === "E" ? "out loud with people" : "quietly before sharing";
}

function informationWord(type: string) {
  return type[1] === "N" ? "patterns, meanings, and future possibilities" : "facts, details, and what already works";
}

function decisionWord(type: string) {
  return type[2] === "F" ? "people impact and personal values" : "logic, fairness, and cause-and-effect";
}

function structureWord(type: string) {
  return type[3] === "J" ? "clear plans and visible progress" : "freedom to adapt as new information appears";
}

function deepDiveFor(type: string, profile: ResultProfile["typeProfile"], bigFive: Record<string, number>) {
  const openSignal =
    bigFive.openness >= 60
      ? "Your high openness score adds imagination and curiosity."
      : "Your lower openness score adds a practical, reality-first filter.";
  const orderSignal =
    bigFive.conscientiousness >= 60
      ? "Your high conscientiousness score means plans, standards, and follow-through matter."
      : "Your lower conscientiousness score points to flexibility and a need for lighter systems.";
  const socialSignal =
    bigFive.extraversion >= 60
      ? "You may think better when ideas can move through conversation."
      : "You may think better when you get quiet time before the room asks for your answer.";

  return [
    `${type} means your answers looked closest to a person who recharges ${energyWord(type)}, trusts ${informationWord(
      type
    )}, decides through ${decisionWord(type)}, and prefers ${structureWord(type)}. This is a simple map, not a rule about who you must be.`,
    `${profile.name} often works best when the environment fits the pattern: enough space to use their natural attention style, enough feedback to stay honest, and enough structure to keep good intentions from becoming stress.`,
    `${openSignal} ${orderSignal} ${socialSignal} Read the type story together with the trait bars; the bars are usually the more scientific part, while the 16-type name is a friendly shortcut.`,
    `In daily life, this profile grows when it names needs early. If you need quiet, ask for quiet. If you need movement, ask for movement. If you need more facts or more empathy, say that directly instead of hoping others guess.`
  ];
}

function matchProfileFor(type: string, target: string, kind: "best" | "challenge"): TypeMatch {
  const targetProfile = typeProfiles[target];
  const shared = [
    type[1] === target[1] ? "you often look for the same kind of information" : "you may balance big-picture and practical attention",
    type[2] === target[2] ? "your decision style may feel familiar" : "one of you may bring logic while the other brings people impact",
    type[3] === target[3] ? "your pace around planning may match" : "one may prefer plans while the other keeps options open"
  ];

  if (kind === "best") {
    return {
      type: target,
      name: targetProfile.name,
      whyItFits: `This is a likely easy match because ${shared.join(", ")}. It can create a mix of comfort and useful difference.`,
      whyItCanBeHard:
        "No type pair is automatic. The hard part is usually not the label; it is stress, unclear needs, and assuming the other person thinks the same way.",
      makeItWork:
        "Keep the easy parts, but make hidden needs visible. Use simple check-ins: what do we know, what do we feel, and what is the next small step?"
    };
  }

  return {
    type: target,
    name: targetProfile.name,
    whyItFits:
      "This match can still work when both people are mature, kind, and clear. Difference can bring range, humor, and skills one person would not bring alone.",
    whyItCanBeHard: `This is a higher-friction match because ${shared.join(", ")}. Under stress, those differences can feel like criticism instead of balance.`,
    makeItWork:
      "Do not try to convert each other. Agree on shared rules for conflict, split tasks by strengths, and explain the reason behind your preference before asking for change."
  };
}

export function scoreQuiz(mode: Mode, answers: AnswerMap, forcedId?: string): ResultProfile {
  const selectedQuestions = questionsForMode(mode);
  const bigFive = emptyScores(bigFiveKeys);
  const hexaco = emptyScores(hexacoKeys);
  const axisScores = { EI: 0, SN: 0, TF: 0, JP: 0 };
  const typeItems: { question: Question; answer: Likert }[] = [];
  const enneagramTotals: Record<string, number> = {};
  let answered = 0;

  selectedQuestions.forEach((question) => {
    const answer = answers[question.id];
    if (!answer) return;

    answered += 1;
    const score = normalize(answer, question);
    addScore(bigFive, question.trait, score);
    addScore(hexaco, question.hexaco, score);

    typeItems.push({ question, answer });
    enneagramTotals[question.enneagram] = (enneagramTotals[question.enneagram] ?? 0) + score;
  });

  const responseMean = typeItems.reduce((total, item) => total + (item.answer - 3), 0) / Math.max(typeItems.length, 1);
  typeItems.forEach(({ question, answer }) => {
    const responseAdjusted = answer - 3 - responseMean;
    axisScores[question.typeAxis] += responseAdjusted * (question.typePolarity ?? 1);
  });

  const bigFiveScores = finalize(bigFive);
  const hexacoScores = finalize(hexaco);
  const typeAxisScores = estimateTypeAxes(bigFiveScores, hexacoScores, axisScores);
  const sixteenType = estimate16Type(typeAxisScores);
  const enneagram = enneagramNames[topKey(enneagramTotals) || "nine"];
  const completion = answered / Math.max(selectedQuestions.length, 1);
  const axisDistance =
    Object.values(typeAxisScores).reduce((total, value) => total + Math.min(Math.abs(value), 35), 0) / 140;
  const responseSpread =
    typeItems.reduce((total, item) => total + Math.min(Math.abs(item.answer - 3 - responseMean), 2), 0) /
    Math.max(typeItems.length * 2, 1);
  const confidence = Math.round(Math.min(96, 20 + completion * 25 + axisDistance * 35 + responseSpread * 16));
  const archetype = archetypeFor(bigFiveScores, sixteenType);
  const typeProfile = typeProfiles[sixteenType];
  const matchTargets = matchMap[sixteenType] ?? { best: typeAlternates[sixteenType]?.[0] ?? "INFP", challenge: "ESTJ" };
  const typeMatch = matchProfileFor(sixteenType, matchTargets.best, "best");
  const typeChallenge = matchProfileFor(sixteenType, matchTargets.challenge, "challenge");

  return {
    scoringVersion: SCORING_VERSION,
    resultId: forcedId ?? `gmp-${Date.now().toString(36)}`,
    completedAt: new Date().toISOString(),
    mode,
    archetype,
    summary:
      "Your profile combines trait scores, preference estimates, and motivation signals into one practical read. Treat it as a mirror for reflection rather than a fixed identity.",
    confidence,
    bigFive: bigFiveScores,
    hexaco: hexacoScores,
    sixteenType,
    secondaryTypes: typeAlternates[sixteenType] ?? [],
    enneagram,
    strengths: [
      bigFiveScores.openness >= 60 ? "Curious pattern-spotting" : "Grounded practicality",
      bigFiveScores.conscientiousness >= 60 ? "Reliable follow-through" : "Flexible adaptation",
      bigFiveScores.agreeableness >= 60 ? "Cooperative communication" : "Independent judgment"
    ],
    blindSpots: [
      bigFiveScores.stability < 45 ? "Stress may narrow your perspective faster than you notice." : "Calm confidence can make subtle concerns easy to overlook.",
      bigFiveScores.extraversion < 45 ? "You may under-signal ideas that deserve visibility." : "Fast social momentum may outpace quieter collaborators."
    ],
    careerStyle:
      bigFiveScores.conscientiousness >= 60
        ? "You tend to do best with clear ownership, meaningful standards, and room to improve systems."
        : "You tend to do best in roles with variety, autonomy, and space to solve problems as they emerge.",
    relationshipStyle:
      bigFiveScores.agreeableness >= 60
        ? "You likely build trust through warmth, patience, and repair after tension."
        : "You likely build trust through candor, boundaries, and direct problem-solving.",
    stressStyle:
      bigFiveScores.stability >= 60
        ? "Under pressure, you may stay composed but delay asking for help."
        : "Under pressure, your sensitivity can become useful early-warning data if you slow down before reacting.",
    growthPlan: [
      "Choose one strength to use more deliberately this week.",
      "Choose one blind spot and create a simple friction-reducing habit.",
      "Revisit your result after a major life change or stressful season."
    ],
    typeMatch,
    typeChallenge,
    evidenceNotes: [
      "The Big Five and HEXACO parts are trait-based. These models are widely used in personality research.",
      "The 16-type result is a plain-language estimate built from your trait pattern. It is useful for reflection, but it is not a clinical label.",
      "The match section uses research-friendly ideas like trait similarity, emotional stability, agreeableness, and communication habits. It is not a dating guarantee.",
      "Job and study ideas are based on trait-environment fit, especially conscientiousness, openness, extraversion, and people-versus-systems preferences."
    ],
    deepDive: deepDiveFor(sixteenType, typeProfile, bigFiveScores),
    typeProfile,
    modelExplanations: [
      `Big Five: your strongest broad trait signal is ${topKey(bigFiveScores)}.`,
      `HEXACO-inspired: your strongest six-factor signal is ${topKey(hexacoScores)}.`,
      `16-type: your preference estimate is ${sixteenType}, based primarily on trait scores with axis questions used as supporting evidence; nearby possibilities are ${typeAlternates[sixteenType]?.join(", ") ?? "less pronounced"}.`,
      `Enneagram-style: your strongest motivation signal is ${enneagram}.`
    ]
  };
}
