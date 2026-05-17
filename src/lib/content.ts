export type ContentPage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  sections: { heading: string; body: string[] }[];
  faq?: { question: string; answer: string }[];
};

export const modelPages: Record<string, ContentPage> = {
  "big-five": {
    slug: "big-five",
    eyebrow: "Trait science",
    title: "Big Five Personality Traits",
    description:
      "Learn how openness, conscientiousness, extraversion, agreeableness, and emotional stability can describe everyday patterns.",
    sections: [
      {
        heading: "What the model measures",
        body: [
          "The Big Five describes broad patterns in how people explore ideas, organize work, seek stimulation, cooperate, and respond to pressure.",
          "Great Mind Profile uses Big Five-style trait scoring as one part of an educational estimate, not as a diagnosis or clinical label."
        ]
      },
      {
        heading: "How to read your scores",
        body: [
          "High and low scores are both meaningful. A high conscientiousness score may support planning and follow-through, while a lower score may reflect adaptability and comfort with change.",
          "The most useful interpretation is practical: what your pattern suggests about work, relationships, stress, and growth."
        ]
      }
    ],
    faq: [
      {
        question: "Is this a clinical assessment?",
        answer: "No. It is designed for self-reflection and educational insight."
      }
    ]
  },
  hexaco: {
    slug: "hexaco",
    eyebrow: "Six-factor framework",
    title: "HEXACO Personality Model",
    description:
      "Explore the six HEXACO-inspired dimensions, including honesty-humility, emotionality, extraversion, agreeableness, conscientiousness, and openness.",
    sections: [
      {
        heading: "Why HEXACO matters",
        body: [
          "HEXACO adds honesty-humility to the familiar trait landscape, giving extra language for sincerity, fairness, modesty, and self-interest.",
          "Our quiz uses HEXACO-inspired signals to enrich the final profile alongside Big Five, 16-type, and Enneagram-style estimates."
        ]
      },
      {
        heading: "Practical use",
        body: [
          "A HEXACO-inspired profile can help you reflect on trust, conflict, ambition, patience, and creativity.",
          "Scores should be read as estimates that invite reflection rather than fixed judgments."
        ]
      }
    ]
  },
  enneagram: {
    slug: "enneagram",
    eyebrow: "Motivation lens",
    title: "Enneagram Motivation Styles",
    description:
      "Understand the nine motivation patterns often used to describe core concerns, defenses, and growth themes.",
    sections: [
      {
        heading: "What it adds",
        body: [
          "The Enneagram is most useful when treated as a narrative lens for motivation, not a hard measurement of ability.",
          "Great Mind Profile estimates likely motivation themes based on values, stress responses, and repeated answer patterns."
        ]
      },
      {
        heading: "Growth over labels",
        body: [
          "A useful result should help you notice patterns: what you protect, what energizes you, and what tends to become exaggerated under stress.",
          "Your result page includes a growth plan so the type estimate turns into something actionable."
        ]
      }
    ]
  },
  "personality-types": {
    slug: "personality-types",
    eyebrow: "Type guide",
    title: "Personality Types and Trait Patterns",
    description:
      "Browse how trait scores, preference estimates, and motivation styles combine into practical personality archetypes.",
    sections: [
      {
        heading: "How types are estimated",
        body: [
          "The 16-type result is estimated from four preference axes: energy direction, information style, decision style, and structure style.",
          "Secondary possible types are shown when scores are close, because personality is often more nuanced than a single label."
        ]
      },
      {
        heading: "Use types lightly",
        body: [
          "Types can be memorable shortcuts, but trait scores usually carry more detail.",
          "The best use is comparing the type summary with the trait bars and reading what feels practically accurate."
        ]
      }
    ]
  },
  methodology: {
    slug: "methodology",
    eyebrow: "How scoring works",
    title: "Great Mind Profile Methodology",
    description:
      "A transparent explanation of how the integrated personality quiz combines established frameworks into educational estimates.",
    sections: [
      {
        heading: "What the quiz is designed to do",
        body: [
          "Great Mind Profile is designed to translate everyday self-report answers into a useful personality reflection. It is not a medical, clinical, employment, or diagnostic assessment.",
          "The quiz uses one question flow and maps each answer into several interpretive lenses. This keeps the experience simple for users while still producing a richer result page."
        ]
      },
      {
        heading: "Model 1: Big Five traits",
        body: [
          "The Big Five lens looks at broad trait patterns: openness, conscientiousness, extraversion, agreeableness, and emotional stability.",
          "These scores are useful because traits describe tendencies rather than fixed identities. A high or low score can be helpful depending on context."
        ]
      },
      {
        heading: "Model 2: HEXACO-inspired scores",
        body: [
          "The HEXACO-inspired lens adds six-factor language: honesty-humility, emotionality, extraversion, agreeableness, conscientiousness, and openness.",
          "The honesty-humility and emotionality signals help the result talk about sincerity, fairness, sensitivity, security, and social trust with more nuance."
        ]
      },
      {
        heading: "Model 3: 16-type preference estimate",
        body: [
          "The 16-type result is estimated from four preference axes: energy direction, information style, decision style, and structure style.",
          "This is a preference estimate, not a claim that people fit neatly into boxes. The result includes secondary possible types when the pattern is close."
        ]
      },
      {
        heading: "Model 4: Enneagram-style motivation",
        body: [
          "The Enneagram-style estimate looks for motivational themes such as improvement, helping, achievement, identity, understanding, security, freedom, strength, or harmony.",
          "This lens is useful for reflection on stress and growth, but it should be read as an interpretive signal rather than a verified diagnosis."
        ]
      },
      {
        heading: "Scoring and confidence",
        body: [
          "Each answer is normalized onto a 0 to 100 scale, with reverse-scored questions used where agreement indicates the opposite trait direction.",
          "Confidence is based on completion and the distance between leading signals. Close scores lower certainty and make secondary results more important.",
          "Results are estimates, not diagnoses. The best use is to compare the result with your lived experience and keep what helps you reflect."
        ]
      }
    ]
  }
};

export const testPages: Record<string, ContentPage> = {
  "personality-test": {
    slug: "personality-test",
    eyebrow: "Integrated assessment",
    title: "Free Personality Test",
    description:
      "Take a mobile-friendly personality test that estimates Big Five traits, HEXACO-inspired scores, 16-type preferences, and Enneagram-style motivations.",
    sections: [
      {
        heading: "One quiz, several useful lenses",
        body: [
          "Instead of sending you through separate tests, Great Mind Profile uses one integrated quiz and translates your answers into multiple practical frameworks.",
          "You can choose Quick, Standard, or Deep mode depending on how much detail you want."
        ]
      },
      {
        heading: "Private by design",
        body: [
          "No login is required. Progress is saved locally in your browser so you can continue if you leave the page.",
          "Results can use an anonymous result ID for easier revisiting on the same device."
        ]
      }
    ]
  },
  "big-five-personality-test": {
    slug: "big-five-personality-test",
    eyebrow: "Trait profile",
    title: "Big Five Personality Test",
    description:
      "Estimate your Big Five-style trait pattern with a practical result page focused on strengths, blind spots, and growth.",
    sections: [
      {
        heading: "What you receive",
        body: [
          "Your result includes trait bars for openness, conscientiousness, extraversion, agreeableness, and emotional stability.",
          "The same quiz also provides related estimates across other frameworks so you can compare patterns."
        ]
      }
    ]
  },
  "hexaco-personality-test": {
    slug: "hexaco-personality-test",
    eyebrow: "Six-factor profile",
    title: "HEXACO Personality Test",
    description:
      "Explore HEXACO-inspired scores for honesty-humility, emotionality, extraversion, agreeableness, conscientiousness, and openness.",
    sections: [
      {
        heading: "What you receive",
        body: [
          "The HEXACO-inspired view adds language for sincerity, fairness, modesty, emotional sensitivity, patience, diligence, and curiosity.",
          "Use it as an educational estimate, not a diagnosis."
        ]
      }
    ]
  },
  "16-personality-test": {
    slug: "16-personality-test",
    eyebrow: "Preference estimate",
    title: "16 Personality Test",
    description:
      "Estimate your 16-type preference pattern alongside trait scores and motivation themes.",
    sections: [
      {
        heading: "How it works",
        body: [
          "The 16-type estimate is derived from preference axes related to energy, information, decisions, and structure.",
          "Close secondary types are shown when your answers suggest more than one plausible interpretation."
        ]
      }
    ]
  },
  "enneagram-test": {
    slug: "enneagram-test",
    eyebrow: "Motivation estimate",
    title: "Enneagram Test",
    description:
      "Estimate your likely Enneagram-style motivation pattern and see how it connects to stress, relationships, and growth.",
    sections: [
      {
        heading: "A motivation lens",
        body: [
          "The Enneagram-style result focuses on likely motivations and protective habits rather than fixed traits.",
          "It is included as one lens in the integrated result page."
        ]
      }
    ]
  }
};

export const policyPages: Record<string, ContentPage> = {
  "privacy-policy": {
    slug: "privacy-policy",
    eyebrow: "Policy",
    title: "Privacy Policy",
    description:
      "How Great Mind Profile handles quiz progress, anonymous results, analytics, advertising, and contact information.",
    sections: [
      {
        heading: "Information we collect",
        body: [
          "Great Mind Profile does not require an account to take the quiz. Quiz progress and results are stored in your browser local storage unless you choose to clear them.",
          "We may use privacy-conscious analytics events to understand aggregate site usage, such as quiz starts, quiz completions, and page views."
        ]
      },
      {
        heading: "Advertising and cookies",
        body: [
          "The site is prepared for Google AdSense. Advertising partners may use cookies or similar technologies according to their own policies.",
          "You can manage cookies through your browser settings."
        ]
      }
    ]
  },
  terms: {
    slug: "terms",
    eyebrow: "Policy",
    title: "Terms of Use",
    description: "The rules for using Great Mind Profile and interpreting personality test results.",
    sections: [
      {
        heading: "Educational use",
        body: [
          "Great Mind Profile is provided for self-reflection and educational insight. Results are estimates, not diagnoses or professional advice.",
          "Do not use results as the sole basis for medical, hiring, legal, financial, or other high-stakes decisions."
        ]
      },
      {
        heading: "Site availability",
        body: [
          "We aim to keep the site useful and available, but features may change as the platform improves."
        ]
      }
    ]
  },
  contact: {
    slug: "contact",
    eyebrow: "Contact",
    title: "Contact Great Mind Profile",
    description: "Contact information for questions about the site, content, privacy, or advertising.",
    sections: [
      {
        heading: "Reach us",
        body: [
          "For editorial, privacy, or advertising questions, email hello@greatmindprofile.com.",
          "Please do not send sensitive medical or diagnostic information. The assessment is designed for education and self-reflection."
        ]
      }
    ]
  },
  "editorial-policy": {
    slug: "editorial-policy",
    eyebrow: "Policy",
    title: "Editorial Policy",
    description: "How Great Mind Profile creates and reviews personality education content.",
    sections: [
      {
        heading: "Content standards",
        body: [
          "We use careful, non-clinical wording and avoid presenting personality estimates as diagnoses.",
          "Content is written to be practical, transparent, and grounded in established personality frameworks."
        ]
      }
    ]
  },
  "advertising-policy": {
    slug: "advertising-policy",
    eyebrow: "Policy",
    title: "Advertising Policy",
    description: "How advertising is prepared and separated from quiz results and editorial content.",
    sections: [
      {
        heading: "Ad placement",
        body: [
          "Advertising slots may appear on informational pages and select result areas, but the quiz experience should remain focused and not overloaded.",
          "Ads do not determine quiz scoring or result interpretation."
        ]
      }
    ]
  },
  "cookie-policy": {
    slug: "cookie-policy",
    eyebrow: "Policy",
    title: "Cookie Policy",
    description: "How Great Mind Profile may use local storage, analytics cookies, and advertising cookies.",
    sections: [
      {
        heading: "Local storage",
        body: [
          "Quiz progress and anonymous result data can be saved in your browser local storage so the quiz can resume smoothly.",
          "You can clear this data through your browser settings."
        ]
      },
      {
        heading: "Analytics and advertising cookies",
        body: [
          "Analytics and advertising providers may use cookies to measure traffic or serve ads. Availability depends on the deployed configuration."
        ]
      }
    ]
  }
};
