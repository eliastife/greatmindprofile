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

type CareerArticleInput = {
  focus: string;
  riasec: string;
  roles: string[];
  environments: string[];
  avoid: string[];
  growth: string;
  jobSearch: string;
  interview: string;
};

const careerInputs: Record<PersonalityType, CareerArticleInput> = {
  INTJ: {
    focus: "strategy, systems, research, and long-term problem solving",
    riasec: "Investigative, Enterprising, and Conventional",
    roles: ["software engineer", "data analyst", "product strategist", "systems architect", "research lead", "operations strategist"],
    environments: ["clear goals", "high standards", "independent thinking time", "leaders who respect evidence"],
    avoid: ["constant emergency work", "political decision-making", "vague roles with no authority to improve the system"],
    growth: "Practice explaining the human reason behind your plan, not only the logical reason. People often support strategy faster when they feel included.",
    jobSearch: "Look for roles with words like strategy, systems, architecture, research, analysis, optimization, roadmap, or transformation.",
    interview: "Bring one example where you improved a messy process and one example where you adapted after feedback."
  },
  INTP: {
    focus: "analysis, models, technical depth, and original problem solving",
    riasec: "Investigative and Artistic",
    roles: ["software developer", "research analyst", "data scientist", "technical writer", "UX researcher", "R&D specialist"],
    environments: ["deep work", "freedom to test ideas", "smart peers", "low micromanagement"],
    avoid: ["performative busyness", "strict scripts", "roles that punish questions before understanding"],
    growth: "Turn good thinking into visible next steps. A small shipped version is often more useful than a perfect private theory.",
    jobSearch: "Look for roles that mention research, experimentation, architecture, data, logic, systems, prototyping, or technical documentation.",
    interview: "Show how your curiosity becomes useful: explain a complex problem, the options you considered, and what you finally built or recommended."
  },
  ENTJ: {
    focus: "leadership, business building, decision-making, and operational momentum",
    riasec: "Enterprising, Conventional, and Investigative",
    roles: ["operations manager", "founder", "consultant", "product manager", "business development lead", "program director"],
    environments: ["clear authority", "ambitious goals", "measurable outcomes", "competent teams"],
    avoid: ["low-accountability cultures", "roles with responsibility but no decision power", "teams that avoid honest feedback"],
    growth: "Slow down enough to bring people with you. Directness works better when others understand the purpose and feel respected.",
    jobSearch: "Look for roles with ownership, growth, leadership, P&L, operations, transformation, strategy, or scale in the description.",
    interview: "Use stories that show both results and people judgment: what changed, who was affected, and how you handled resistance."
  },
  ENTP: {
    focus: "innovation, persuasion, creative strategy, and fast problem reframing",
    riasec: "Enterprising, Artistic, and Investigative",
    roles: ["startup operator", "product marketer", "sales engineer", "innovation consultant", "creative strategist", "founder"],
    environments: ["variety", "room to challenge assumptions", "fast feedback", "people who enjoy debate without taking it personally"],
    avoid: ["repetitive maintenance work", "rigid hierarchy", "roles where every idea needs long permission chains"],
    growth: "Choose fewer bets and finish them. Your range is a gift, but careers grow when people can trust your follow-through.",
    jobSearch: "Look for discovery, growth, partnerships, strategy, market development, product, creator, or innovation roles.",
    interview: "Prepare a clear example of an idea you turned into measurable value, not only a clever idea you discussed."
  },
  INFJ: {
    focus: "meaningful work, human insight, communication, and long-range improvement",
    riasec: "Social, Artistic, and Investigative",
    roles: ["counselor", "UX researcher", "writer", "teacher", "people development specialist", "public health strategist"],
    environments: ["clear purpose", "quiet focus", "ethical leadership", "space for deep listening"],
    avoid: ["constant shallow meetings", "values conflict", "chaotic teams that rely on emotional overwork"],
    growth: "Ask for priorities early instead of silently carrying everyone. You can care deeply without becoming the whole support system.",
    jobSearch: "Look for roles with research, education, writing, coaching, strategy, human-centered, community, or impact in the description.",
    interview: "Share one story about understanding a person or system deeply, and one story about turning that insight into action."
  },
  INFP: {
    focus: "creative expression, values-based work, helping roles, and personal meaning",
    riasec: "Artistic and Social",
    roles: ["writer", "designer", "counseling assistant", "community coordinator", "brand storyteller", "nonprofit program associate"],
    environments: ["authentic mission", "kind feedback", "creative freedom", "work that respects personal values"],
    avoid: ["high-pressure sales", "cynical cultures", "roles that require hiding your values every day"],
    growth: "Protect your values with practical structure. A calendar, checklist, or scope limit can make creativity feel safer, not smaller.",
    jobSearch: "Look for mission, writing, design, advocacy, community, storytelling, education, or creative support roles.",
    interview: "Prepare examples that connect heart and execution: what mattered to you, what you made, and how it helped someone."
  },
  ENFJ: {
    focus: "people development, communication, leadership, and group alignment",
    riasec: "Social, Enterprising, and Artistic",
    roles: ["teacher", "coach", "people operations partner", "community manager", "partnerships lead", "training specialist"],
    environments: ["collaborative teams", "visible impact", "healthy feedback", "roles where communication matters"],
    avoid: ["isolated technical work with no people contact", "unclear social expectations", "cultures that exploit helpfulness"],
    growth: "Let people own their part. Helping is strongest when it builds capacity instead of quietly taking over.",
    jobSearch: "Look for coaching, education, training, community, communications, partnerships, customer success, or leadership roles.",
    interview: "Use examples where you improved a group outcome, handled tension, and helped people move toward a shared goal."
  },
  ENFP: {
    focus: "creative connection, possibility, communication, and energizing new work",
    riasec: "Artistic, Social, and Enterprising",
    roles: ["creative strategist", "marketer", "community builder", "teacher", "product discovery researcher", "content lead"],
    environments: ["variety", "mission", "warm collaboration", "room to experiment"],
    avoid: ["repetitive detail work", "low-autonomy roles", "teams that punish enthusiasm or new ideas"],
    growth: "Give your ideas a simple finish line. Freedom becomes more powerful when you can show what changed because of it.",
    jobSearch: "Look for creative strategy, communications, community, product discovery, campaigns, education, or entrepreneurship.",
    interview: "Bring one story about inspiring people and one story about finishing something when the novelty wore off."
  },
  ISTJ: {
    focus: "accuracy, responsibility, procedures, and dependable execution",
    riasec: "Conventional and Realistic",
    roles: ["accountant", "compliance analyst", "project coordinator", "logistics planner", "quality assurance specialist", "information systems analyst"],
    environments: ["clear rules", "stable expectations", "respect for detail", "measurable responsibilities"],
    avoid: ["constant ambiguity", "unreliable leadership", "roles that change direction without evidence"],
    growth: "Keep your standards, but leave room for useful change. New does not always mean careless.",
    jobSearch: "Look for operations, compliance, finance, administration, logistics, quality, documentation, or systems roles.",
    interview: "Show how your reliability prevents problems: a detail you caught, a process you improved, or a commitment you protected."
  },
  ISFJ: {
    focus: "practical care, service, memory for details, and steady support",
    riasec: "Social and Conventional",
    roles: ["nurse", "teacher", "client care coordinator", "office manager", "human services worker", "healthcare administrator"],
    environments: ["kind teams", "clear duties", "real human usefulness", "predictable rhythms"],
    avoid: ["aggressive competition", "emotionally cold cultures", "roles where support is invisible and never appreciated"],
    growth: "Practice saying needs sooner. Your care is more sustainable when your limits are part of the plan.",
    jobSearch: "Look for healthcare, education, client care, administration, support operations, HR support, or service coordination.",
    interview: "Use examples that show quiet excellence: remembering needs, preventing issues, and making people feel safe and respected."
  },
  ESTJ: {
    focus: "organization, management, accountability, and practical results",
    riasec: "Enterprising and Conventional",
    roles: ["operations manager", "finance manager", "project manager", "public administrator", "supply chain lead", "team supervisor"],
    environments: ["clear hierarchy", "defined goals", "reliable processes", "people who follow through"],
    avoid: ["vague ownership", "endless brainstorming with no decision", "teams that avoid accountability"],
    growth: "Ask before correcting. Your clarity lands better when people know you are solving the problem, not judging their worth.",
    jobSearch: "Look for management, operations, administration, logistics, finance, compliance, project delivery, or civic leadership.",
    interview: "Bring numbers and examples: what you organized, what improved, and how you handled a person who was not aligned."
  },
  ESFJ: {
    focus: "community, service, coordination, and relationship-centered execution",
    riasec: "Social, Enterprising, and Conventional",
    roles: ["teacher", "event coordinator", "HR coordinator", "customer success manager", "care coordinator", "hospitality manager"],
    environments: ["friendly teams", "clear expectations", "people contact", "visible appreciation for service"],
    avoid: ["isolated work", "cold cultures", "roles where social labor is expected but not valued"],
    growth: "Do not measure your worth by keeping everyone happy. Good support includes honest boundaries.",
    jobSearch: "Look for education, healthcare, events, HR, customer success, hospitality, or community operations.",
    interview: "Tell stories about coordinating people, noticing needs, and creating a smoother experience for a group."
  },
  ISTP: {
    focus: "hands-on problem solving, troubleshooting, tools, and real-time logic",
    riasec: "Realistic and Investigative",
    roles: ["field engineer", "security analyst", "mechanic", "industrial designer", "emergency responder", "technical troubleshooter"],
    environments: ["autonomy", "practical problems", "direct feedback", "room to test solutions"],
    avoid: ["long abstract meetings", "high emotional drama", "rules that block practical fixes"],
    growth: "Let people see your thinking sooner. Explaining the fix can build trust as much as making the fix.",
    jobSearch: "Look for technical support, security, engineering technology, trades, field work, diagnostics, or emergency operations.",
    interview: "Bring examples where you stayed calm, found the mechanical cause, and solved the problem under real constraints."
  },
  ISFP: {
    focus: "hands-on creativity, beauty, care, and values in action",
    riasec: "Artistic, Realistic, and Social",
    roles: ["designer", "artist", "wellness practitioner", "occupational therapy assistant", "content creator", "environmental field worker"],
    environments: ["autonomy", "sensory quality", "respectful feedback", "work that feels personally honest"],
    avoid: ["controlling managers", "loud pressure", "roles that separate work from values or taste"],
    growth: "Name what you want before withdrawing. Your preferences are easier to respect when people can understand them.",
    jobSearch: "Look for design, craft, wellness, care work, content, environmental work, or hands-on creative production.",
    interview: "Use a portfolio or concrete examples. Show what you made, why it mattered, and how you responded to feedback."
  },
  ESTP: {
    focus: "action, negotiation, fast feedback, and practical opportunity",
    riasec: "Enterprising and Realistic",
    roles: ["sales representative", "entrepreneur", "operations coordinator", "real estate agent", "field producer", "emergency management specialist"],
    environments: ["movement", "visible results", "competition", "freedom to solve in the moment"],
    avoid: ["slow bureaucracy", "desk-only analysis", "roles with no immediate feedback or real stakes"],
    growth: "Pause long enough to check the long-term cost. Speed is powerful when it is guided by a clear aim.",
    jobSearch: "Look for sales, business development, field operations, entrepreneurship, media production, emergency response, or performance roles.",
    interview: "Tell stories with stakes: what changed quickly, what risk you read, and what result you created."
  },
  ESFP: {
    focus: "people energy, performance, experience, and practical warmth",
    riasec: "Social, Artistic, and Enterprising",
    roles: ["event producer", "performer", "customer experience lead", "teacher", "brand ambassador", "hospitality specialist"],
    environments: ["people contact", "variety", "warm culture", "work where energy and timing matter"],
    avoid: ["lonely desk work", "heavy future planning with no action", "cultures that treat joy as unprofessional"],
    growth: "Protect tomorrow while enjoying today. A simple plan can support your freedom instead of trapping it.",
    jobSearch: "Look for events, entertainment, education, customer experience, hospitality, brand activation, or wellness roles.",
    interview: "Share examples where you improved the mood, experience, or trust of a group while still delivering the practical outcome."
  }
};

function careerArticleFor(type: PersonalityType): ArticlePage {
  const profile = typeProfiles[type];
  const input = careerInputs[type];
  const lower = type.toLowerCase();

  return {
    slug: `articles/${lower}-careers`,
    eyebrow: "Career guide",
    title: `${type} Careers: Work That Fits ${profile.name}`,
    description: `A detailed, easy-language career guide for ${type} personality patterns, with role ideas, work environments, stress signs, and job-search tips.`,
    related: [
      { label: `${type} type guide`, href: `/personality-types/${lower}` },
      { label: `${type} result guide`, href: `/results/${lower}` },
      { label: "Take the career-friendly quiz", href: "/personality-test/start" }
    ],
    sections: [
      {
        heading: "Start with the honest truth",
        body: [
          `A ${type} result should not choose your career for you. It is a reflection tool. Your skills, training, health, money needs, location, culture, and opportunities matter too.`,
          `Still, the ${type} pattern can help you notice where work may feel easier. This guide focuses on ${input.focus}, then connects that pattern to practical career choices.`
        ]
      },
      {
        heading: "Work that may feel natural",
        body: [
          `${profile.overview} In career terms, this often means you do better when your daily tasks let you use that pattern instead of fighting it all day.`,
          `Your likely interest mix leans toward ${input.riasec} themes from the Holland/RIASEC career model. That does not mean you must choose one of those fields. It means these activity types may be worth exploring first.`
        ]
      },
      {
        heading: "Roles to explore",
        body: [
          `Possible roles to research: ${input.roles.join(", ")}.`,
          `Also look at related study paths such as ${profile.bestStudyPaths.join(", ")}. The best choice is usually the role where your interest, skill level, and real work conditions overlap.`
        ]
      },
      {
        heading: "Work environments that may help",
        body: [
          `You may feel more steady in environments with ${input.environments.join(", ")}.`,
          "When reading job posts, look past the title. A good title in a bad environment can still drain you. A surprising title in the right environment can become a very good fit."
        ]
      },
      {
        heading: "Jobs or cultures to be careful with",
        body: [
          `Be careful with ${input.avoid.join(", ")}.`,
          "This does not mean you cannot succeed there. It means you may need stronger boundaries, better support, or a clear reason for accepting the tradeoff."
        ]
      },
      {
        heading: "How to search smarter",
        body: [
          input.jobSearch,
          "Before applying, ask: What will I do every week? Who will I work with? How is success measured? What problems will I solve? These answers predict fit better than a job title alone."
        ]
      },
      {
        heading: "Interview and resume tips",
        body: [
          input.interview,
          "On your resume, translate personality into proof. Do not write 'I am an INFJ' or 'I am an ESTP.' Show outcomes, skills, projects, relationships, systems, or decisions that prove the strength."
        ]
      },
      {
        heading: "Growth edge",
        body: [
          input.growth,
          "A career is not just a match. It is a relationship you keep shaping. Check in with yourself every few months: What gives energy? What drains it? What skill would make the next step easier?"
        ]
      },
      {
        heading: "Research basis",
        body: [
          "This article does not claim that 16-type labels are scientifically decisive career tests. The safer evidence base is broader: Big Five research links traits such as conscientiousness to job performance, and vocational-interest research uses person-environment fit to help people explore work activities.",
          "Sources used to shape the guidance include Barrick & Mount's Big Five job-performance meta-analysis, the O*NET Interest Profiler from the U.S. Department of Labor, Holland/RIASEC vocational interest theory, and research connecting personality traits with vocational interests."
        ]
      }
    ],
    faq: [
      {
        question: `What is the best career for ${type}?`,
        answer: `There is no single best career for ${type}. Start with roles that fit your interests, skills, and preferred work environment, then test them through projects, conversations, internships, or entry-level experience.`
      },
      {
        question: `Should I choose a job only because I am ${type}?`,
        answer: "No. Use type as one clue. Real career fit also depends on abilities, values, labor market demand, training, pay needs, and the actual manager or team."
      }
    ]
  };
}

export const careerArticlePages: Record<string, ArticlePage> = Object.fromEntries(
  personalityTypeCodes.map((type) => [`${type.toLowerCase()}-careers`, careerArticleFor(type)])
) as Record<string, ArticlePage>;

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
  },
  ...careerArticlePages
};
