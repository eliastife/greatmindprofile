export type PersonalityType =
  | "INTJ"
  | "INTP"
  | "ENTJ"
  | "ENTP"
  | "INFJ"
  | "INFP"
  | "ENFJ"
  | "ENFP"
  | "ISTJ"
  | "ISFJ"
  | "ESTJ"
  | "ESFJ"
  | "ISTP"
  | "ISFP"
  | "ESTP"
  | "ESFP";

export type TypeVisual = {
  primary: string;
  secondary: string;
  accent: string;
  soft: string;
  animal:
    | "owl"
    | "cat"
    | "lion"
    | "fox"
    | "deer"
    | "rabbit"
    | "dog"
    | "squirrel"
    | "turtle"
    | "sheep"
    | "bear"
    | "panda"
    | "beaver"
    | "hedgehog"
    | "tiger"
    | "penguin";
  prop:
    | "telescope"
    | "book"
    | "flag"
    | "bulb"
    | "lantern"
    | "brush"
    | "heart"
    | "kite"
    | "clipboard"
    | "cup"
    | "checklist"
    | "bouquet"
    | "wrench"
    | "palette"
    | "bolt"
    | "mic";
};

export const typeVisuals: Record<PersonalityType, TypeVisual> = {
  INTJ: { primary: "#3949ab", secondary: "#90caf9", accent: "#ffd166", soft: "#eef2ff", animal: "owl", prop: "telescope" },
  INTP: { primary: "#5b4bdb", secondary: "#66d9ef", accent: "#ffffff", soft: "#f0f7ff", animal: "cat", prop: "book" },
  ENTJ: { primary: "#172554", secondary: "#f59e0b", accent: "#fb7185", soft: "#eff6ff", animal: "lion", prop: "flag" },
  ENTP: { primary: "#f97316", secondary: "#38bdf8", accent: "#fff7ed", soft: "#fff7ed", animal: "fox", prop: "bulb" },
  INFJ: { primary: "#0f766e", secondary: "#c084fc", accent: "#fef3c7", soft: "#ecfeff", animal: "deer", prop: "lantern" },
  INFP: { primary: "#7c9f6e", secondary: "#f9a8d4", accent: "#fefce8", soft: "#f7fee7", animal: "rabbit", prop: "brush" },
  ENFJ: { primary: "#ef6f6c", secondary: "#14b8a6", accent: "#fff1f2", soft: "#fff7ed", animal: "dog", prop: "heart" },
  ENFP: { primary: "#facc15", secondary: "#22d3ee", accent: "#fb7185", soft: "#fefce8", animal: "squirrel", prop: "kite" },
  ISTJ: { primary: "#166534", secondary: "#1e3a8a", accent: "#d9f99d", soft: "#f0fdf4", animal: "turtle", prop: "clipboard" },
  ISFJ: { primary: "#60a5fa", secondary: "#86efac", accent: "#fff7ed", soft: "#eff6ff", animal: "sheep", prop: "cup" },
  ESTJ: { primary: "#2563eb", secondary: "#ef4444", accent: "#ffffff", soft: "#eff6ff", animal: "bear", prop: "checklist" },
  ESFJ: { primary: "#fb923c", secondary: "#7dd3fc", accent: "#fde68a", soft: "#fff7ed", animal: "panda", prop: "bouquet" },
  ISTP: { primary: "#374151", secondary: "#22c55e", accent: "#e5e7eb", soft: "#f3f4f6", animal: "beaver", prop: "wrench" },
  ISFP: { primary: "#4d7c0f", secondary: "#fda4af", accent: "#fef3c7", soft: "#f7fee7", animal: "hedgehog", prop: "palette" },
  ESTP: { primary: "#dc2626", secondary: "#94a3b8", accent: "#fde047", soft: "#fff1f2", animal: "tiger", prop: "bolt" },
  ESFP: { primary: "#f43f5e", secondary: "#fbbf24", accent: "#67e8f9", soft: "#fff1f2", animal: "penguin", prop: "mic" }
};
