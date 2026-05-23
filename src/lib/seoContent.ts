import type { ContentPage } from "./content";
import { typeAlternates, typeProfiles } from "./scoring";
import type { PersonalityType } from "./typeVisuals";

export const personalityTypeCodes = Object.keys(typeProfiles) as PersonalityType[];

export type ArticlePage = ContentPage & {
  related: { label: string; href: string }[];
};

function typeSlug(type: string) {
  return type.toLowerCase();
}

function titleCaseType(type: string) {
  return type.toUpperCase();
}

function energyLine(type: string) {
  return type[0] === "E"
    ? "This type usually processes energy through people, conversation, and visible movement."
    : "This type usually protects energy through quiet focus, reflection, and selective sharing.";
}

function infoLine(type: string) {
  return type[1] === "N"
    ? "It tends to look for patterns, meaning, future possibilities, and hidden connections."
    : "It tends to trust facts, examples, details, lived experience, and what has already worked.";
}

function decisionLine(type: string) {
  return type[2] === "F"
    ? "Its decision style often weighs values, people impact, and emotional honesty."
    : "Its decision style often weighs logic, consistency, fairness, and practical tradeoffs.";
}

function structureLine(type: string) {
  return type[3] === "J"
    ? "It often feels calmer when priorities, next steps, and expectations are clear."
    : "It often feels more alive when options stay open and the plan can adapt.";
}

export function personalityTypePage(type: PersonalityType): ContentPage {
  const profile = typeProfiles[type];
  const slug = typeSlug(type);
  const alternatives = typeAlternates[type] ?? [];

  return {
    slug: `personality-types/${slug}`,
    eyebrow: "Personality type guide",
    title: `${type}: ${profile.name}`,
    description: `A practical guide to the ${type} personality pattern, including strengths, careers, relationships, stress style, and similar types.`,
    sections: [
      {
        heading: `${type} at a glance`,
        body: [
          profile.overview,
          `${energyLine(type)} ${infoLine(type)} ${decisionLine(type)} ${structureLine(type)}`,
          "Use this page as an easy-language guide, not a clinical label. The full quiz gives more nuance through Big Five and HEXACO-inspired trait scores."
        ]
      },
      {
        heading: "Strengths people may notice",
        body: [
          `The ${type} pattern often becomes useful when a situation needs ${profile.funFacts
            .join(" ")
            .toLowerCase()}`,
          "The strength is not magic. It becomes reliable when the person has enough sleep, honest feedback, and a role that rewards their natural attention style."
        ]
      },
      {
        heading: "Careers and study paths",
        body: [
          `${type} may enjoy study paths like ${profile.bestStudyPaths.join(", ")}.`,
          `Helpful work environments often include ${profile.bestJobFamilies.join(", ")}.`,
          "These are fit signals, not rules. A person can thrive outside the list when their daily tasks still match their trait pattern."
        ]
      },
      {
        heading: "Relationships and communication",
        body: [
          `${type} often communicates best when others respect its pace. ${profile.howYouThink}`,
          "The best match is not one fixed type. Research points more toward emotional stability, kindness, shared values, and good repair after conflict."
        ]
      },
      {
        heading: "Stress and growth",
        body: [
          profile.underPressure,
          "A useful growth move is to name needs earlier: more time, clearer facts, warmer context, or more freedom. Clear requests prevent personality differences from turning into avoidable conflict."
        ]
      },
      {
        heading: "Similar types",
        body: [
          alternatives.length
            ? `${type} can be confused with ${alternatives.join(" and ")} when one or two preference signals are close.`
            : `${type} can overlap with nearby types when your scores are close.`,
          "If a type page feels only partly right, take the integrated quiz and read the trait bars. The trait scores usually explain the nuance."
        ]
      }
    ],
    faq: [
      {
        question: `Is ${type} a diagnosis?`,
        answer: "No. It is a plain-language personality estimate for reflection and education."
      },
      {
        question: `What is the best way to use a ${type} result?`,
        answer: "Use it to notice patterns in energy, decisions, stress, work style, and communication. Keep what is useful and ignore what does not fit."
      }
    ]
  };
}

export const enneagramResultPages: Record<string, ContentPage> = {
  "enneagram-type-1": {
    slug: "results/enneagram-type-1",
    eyebrow: "Result guide",
    title: "Enneagram Type 1 Result: The Improver",
    description: "A practical guide to Enneagram Type 1 motivations, strengths, stress patterns, and growth.",
    sections: [
      {
        heading: "Core motivation",
        body: [
          "Type 1 often wants to be good, responsible, fair, and useful. The mind notices what could be improved and may feel pressure to fix it.",
          "At its best, this pattern brings integrity, discipline, and care for standards. Under stress, it can become harsh toward the self or others."
        ]
      },
      {
        heading: "Growth direction",
        body: [
          "A helpful move is to separate improvement from self-worth. Not every mistake is a moral failure.",
          "Build small rituals for rest, humor, and imperfect progress. A kinder standard is often more sustainable than a perfect one."
        ]
      }
    ]
  },
  "enneagram-type-4": {
    slug: "results/enneagram-type-4",
    eyebrow: "Result guide",
    title: "Enneagram Type 4 Result: The Individualist",
    description: "A practical guide to Enneagram Type 4 identity, creativity, emotional depth, and growth.",
    sections: [
      {
        heading: "Core motivation",
        body: [
          "Type 4 often wants to be authentic, understood, and emotionally honest. It notices what feels meaningful, missing, or uniquely personal.",
          "At its best, this pattern brings creativity, empathy, and emotional truth. Under stress, it may compare, withdraw, or over-identify with a mood."
        ]
      },
      {
        heading: "Growth direction",
        body: [
          "A helpful move is to treat ordinary routines as support for creativity, not as enemies of identity.",
          "Staying connected to action, body, and trusted people can keep depth from turning into isolation."
        ]
      }
    ]
  },
  "enneagram-type-5": {
    slug: "results/enneagram-type-5",
    eyebrow: "Result guide",
    title: "Enneagram Type 5 Result: The Investigator",
    description: "A practical guide to Enneagram Type 5 curiosity, independence, boundaries, and growth.",
    sections: [
      {
        heading: "Core motivation",
        body: [
          "Type 5 often wants to understand, conserve energy, and feel capable before stepping in. It may gather knowledge before taking visible action.",
          "At its best, this pattern brings clarity, depth, and independent thinking. Under stress, it may detach too long or ration attention too tightly."
        ]
      },
      {
        heading: "Growth direction",
        body: [
          "A helpful move is to share earlier than feels perfect. Connection can provide data too.",
          "Small acts of participation help the mind test ideas in real life instead of waiting for total certainty."
        ]
      }
    ]
  }
};

export const resultPages: Record<string, ContentPage> = Object.fromEntries([
  ...personalityTypeCodes.map((type) => {
    const page = personalityTypePage(type);
    return [
      typeSlug(type),
      {
        ...page,
        slug: `results/${typeSlug(type)}`,
        eyebrow: "Shareable result guide",
        title: `${type}: ${typeProfiles[type].name} Result`,
        description: `A shareable overview of the ${type} result, including strengths, careers, relationships, stress style, and growth ideas.`
      }
    ];
  }),
  ...Object.entries(enneagramResultPages)
]) as Record<string, ContentPage>;

export const articlePages: Record<string, ArticlePage> = {
  "infj-careers": {
    slug: "articles/infj-careers",
    eyebrow: "Career guide",
    title: "INFJ Careers: Work That Fits the Insightful Counselor",
    description: "Explore INFJ career patterns, good work environments, stress risks, and study paths.",
    related: [
      { label: "INFJ type guide", href: "/personality-types/infj" },
      { label: "Take the quiz", href: "/personality-test/start" }
    ],
    sections: [
      {
        heading: "What INFJs often need at work",
        body: [
          "INFJ careers tend to feel better when the work has meaning, human impact, and room for quiet focus. This does not mean every INFJ must become a counselor. It means the day-to-day tasks should connect ideas to people.",
          "Many INFJs prefer work where they can understand a problem deeply, help others grow, or improve a system that affects real lives."
        ]
      },
      {
        heading: "Good-fit environments",
        body: [
          "Helpful fields may include counseling, education, UX research, writing, public health, people development, nonprofit strategy, and human-centered design.",
          "The best environment gives clear purpose without constant social overload. Too many shallow meetings can drain this pattern quickly."
        ]
      },
      {
        heading: "Stress risks",
        body: [
          "An INFJ may struggle in roles with unclear ethics, constant interruption, or pressure to ignore people impact.",
          "A useful growth habit is to ask for clearer priorities before taking responsibility for everyone else's emotions."
        ]
      }
    ],
    faq: [
      { question: "What careers should INFJs avoid?", answer: "Avoid any role where the daily work repeatedly violates your values, removes quiet focus, or rewards shallow urgency over useful depth." }
    ]
  },
  "intj-careers": {
    slug: "articles/intj-careers",
    eyebrow: "Career guide",
    title: "INTJ Careers: Strategy, Systems, and Long-Term Work",
    description: "A practical guide to INTJ career fit, strengths, blind spots, and study paths.",
    related: [
      { label: "INTJ type guide", href: "/personality-types/intj" },
      { label: "Big Five guide", href: "/big-five" }
    ],
    sections: [
      {
        heading: "What INTJs often need at work",
        body: [
          "INTJ career fit often improves when the role rewards long-term thinking, independent problem solving, and better systems.",
          "This pattern may feel bored when work is only reactive. It tends to come alive when there is a hard problem, a clear goal, and permission to improve the method."
        ]
      },
      {
        heading: "Good-fit environments",
        body: [
          "Helpful paths may include software, data, strategy, engineering, economics, product, research, architecture, and technical leadership.",
          "The common thread is not job title. It is the chance to design, test, and refine a system that matters."
        ]
      },
      {
        heading: "Stress risks",
        body: [
          "INTJs can become impatient when standards are unclear or decisions are driven by politics instead of evidence.",
          "A useful growth habit is to explain the human reason behind the plan, not only the logical reason."
        ]
      }
    ]
  },
  "infp-vs-infj": {
    slug: "articles/infp-vs-infj",
    eyebrow: "Type comparison",
    title: "INFP vs INFJ: Similar Idealists, Different Patterns",
    description: "A clear comparison of INFP and INFJ personality patterns, stress style, and decision-making.",
    related: [
      { label: "INFP guide", href: "/personality-types/infp" },
      { label: "INFJ guide", href: "/personality-types/infj" }
    ],
    sections: [
      {
        heading: "Why they can look similar",
        body: [
          "INFP and INFJ patterns can both be reflective, idealistic, sensitive to meaning, and interested in people. Both may dislike shallow environments.",
          "The difference is often in how the person organizes inner life and outer action."
        ]
      },
      {
        heading: "Common difference",
        body: [
          "INFP often protects personal values and authenticity first. INFJ often organizes meaning into a vision or direction.",
          "INFP may resist outside structure when it feels false. INFJ may create structure to protect a deeper purpose."
        ]
      },
      {
        heading: "How to tell",
        body: [
          "Ask what feels more natural: exploring what is personally true, or shaping a pattern into a clear direction for people.",
          "If the answer is mixed, trait scores can help. Openness, agreeableness, conscientiousness, and emotional stability often explain the nuance better than a single type label."
        ]
      }
    ]
  },
  "enneagram-4-vs-5": {
    slug: "articles/enneagram-4-vs-5",
    eyebrow: "Enneagram comparison",
    title: "Enneagram 4 vs 5: Emotional Depth or Private Knowledge?",
    description: "Compare Enneagram Type 4 and Type 5 motivations, stress patterns, and growth moves.",
    related: [
      { label: "Type 4 result", href: "/results/enneagram-type-4" },
      { label: "Type 5 result", href: "/results/enneagram-type-5" }
    ],
    sections: [
      {
        heading: "The core difference",
        body: [
          "Type 4 often asks, 'What is missing, meaningful, or true about me?' Type 5 often asks, 'What do I need to understand before I spend energy?'",
          "Both can be private and deep. Type 4 usually centers identity and emotional truth. Type 5 usually centers knowledge, competence, and boundaries."
        ]
      },
      {
        heading: "Under stress",
        body: [
          "Type 4 may get pulled into comparison, longing, or mood. Type 5 may pull back, conserve energy, and avoid demands.",
          "Both benefit from gentle action: Type 4 from steady routines, Type 5 from earlier participation."
        ]
      }
    ]
  },
  "what-is-openness-to-experience": {
    slug: "articles/what-is-openness-to-experience",
    eyebrow: "Trait guide",
    title: "What Is Openness to Experience?",
    description: "A simple guide to openness, creativity, curiosity, imagination, and practical growth.",
    related: [
      { label: "Big Five guide", href: "/big-five" },
      { label: "Take the Big Five test", href: "/big-five-personality-test" }
    ],
    sections: [
      {
        heading: "What openness means",
        body: [
          "Openness describes how much a person tends to enjoy new ideas, imagination, complexity, art, reflection, and unusual connections.",
          "High openness can support creativity and learning. Lower openness can support practicality, focus, and respect for proven methods."
        ]
      },
      {
        heading: "How it shows up",
        body: [
          "In work, openness may show up as curiosity, experimentation, and comfort with abstract problems.",
          "In daily life, it may shape taste, hobbies, learning style, and how quickly a person gets bored with routine."
        ]
      },
      {
        heading: "Growth tips",
        body: [
          "If openness is high, practice finishing and simplifying. If openness is lower, practice trying small new things before judging the whole category.",
          "Neither side is better. Fit depends on the situation."
        ]
      }
    ]
  },
  "conscientiousness-personality-trait": {
    slug: "articles/conscientiousness-personality-trait",
    eyebrow: "Trait guide",
    title: "Conscientiousness: Planning, Discipline, and Follow-Through",
    description: "Understand conscientiousness in the Big Five and how it affects work, habits, and stress.",
    related: [
      { label: "Big Five guide", href: "/big-five" },
      { label: "Methodology", href: "/methodology" }
    ],
    sections: [
      {
        heading: "What conscientiousness means",
        body: [
          "Conscientiousness describes organization, reliability, discipline, planning, and follow-through.",
          "High conscientiousness can help with goals and trust. Lower conscientiousness can support flexibility, spontaneity, and comfort with changing plans."
        ]
      },
      {
        heading: "Useful balance",
        body: [
          "Too little structure can create chaos. Too much structure can create rigidity.",
          "The best version of this trait is not perfection. It is using enough structure to protect what matters."
        ]
      }
    ]
  },
  "hexaco-honesty-humility": {
    slug: "articles/hexaco-honesty-humility",
    eyebrow: "HEXACO guide",
    title: "HEXACO Honesty-Humility: What It Means",
    description: "Learn what honesty-humility measures and how it appears in trust, fairness, modesty, and ambition.",
    related: [
      { label: "HEXACO guide", href: "/hexaco" },
      { label: "HEXACO test", href: "/hexaco-personality-test" }
    ],
    sections: [
      {
        heading: "What it measures",
        body: [
          "Honesty-humility describes tendencies around sincerity, fairness, modesty, and avoiding exploitation.",
          "A higher score often points toward straightforwardness and lower interest in status games. A lower score can point toward competitive drive, strategic self-interest, or comfort with negotiation."
        ]
      },
      {
        heading: "How to use it",
        body: [
          "The point is not to shame a score. The useful question is: when do ambition, fairness, honesty, and self-protection come into tension?",
          "Good results should help you notice tradeoffs, not label you as good or bad."
        ]
      }
    ]
  },
  "extraversion-vs-introversion": {
    slug: "articles/extraversion-vs-introversion",
    eyebrow: "Trait guide",
    title: "Extraversion vs Introversion: Energy, Attention, and Social Pace",
    description: "A practical guide to extraversion, introversion, social energy, and communication style.",
    related: [
      { label: "Big Five guide", href: "/big-five" },
      { label: "16 personality test", href: "/16-personality-test" }
    ],
    sections: [
      {
        heading: "The simple difference",
        body: [
          "Extraversion describes how much a person tends to seek stimulation, social movement, expressiveness, and outward engagement.",
          "Introversion is not shyness. It often means a person prefers lower stimulation, deeper focus, or more recovery time after social demand."
        ]
      },
      {
        heading: "Why it matters",
        body: [
          "Many conflicts come from pace, not character. One person wants to talk now; the other wants to think first.",
          "Good communication often starts by respecting the other person's energy system."
        ]
      }
    ]
  }
};
