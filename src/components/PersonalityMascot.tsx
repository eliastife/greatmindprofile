import { typeVisuals, type PersonalityType } from "@/lib/typeVisuals";

function typeKey(type: string): PersonalityType {
  return (type in typeVisuals ? type : "INFP") as PersonalityType;
}

function Heart({ x, y, fill }: { x: number; y: number; fill: string }) {
  return (
    <path
      d={`M ${x} ${y + 5} C ${x - 7} ${y - 1}, ${x - 2} ${y - 10}, ${x + 5} ${y - 5} C ${x + 12} ${y - 10}, ${x + 17} ${y - 1}, ${x + 10} ${y + 5} L ${x + 5} ${y + 11} Z`}
      fill={fill}
      opacity="0.88"
    />
  );
}

function PropBadge({ type, x, y, color }: { type: PersonalityType; x: number; y: number; color: string }) {
  const letter = type[1] === "N" ? "N" : type[3] === "J" ? "J" : type[2] === "F" ? "F" : "P";
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx="0" cy="0" r="18" fill="white" opacity="0.88" />
      <circle cx="0" cy="0" r="14" fill={color} opacity="0.18" />
      <text
        dominantBaseline="central"
        fill={color}
        fontFamily="Poppins, Arial, sans-serif"
        fontSize="20"
        fontWeight="800"
        textAnchor="middle"
      >
        {letter}
      </text>
    </g>
  );
}

function Character({
  x,
  primary,
  secondary,
  accent,
  variant
}: {
  x: number;
  primary: string;
  secondary: string;
  accent: string;
  variant: "female" | "male";
}) {
  const hair = variant === "female" ? secondary : primary;
  const outfit = variant === "female" ? primary : secondary;
  const sleeve = variant === "female" ? accent : "#ffffff";
  const shorts = variant === "female" ? "#fff7ed" : primary;
  const face = "#ffc49f";
  const cheek = "#f472b6";

  return (
    <g transform={`translate(${x} 0)`}>
      <ellipse cx="80" cy="248" rx="54" ry="12" fill="rgba(31,41,55,0.14)" />
      <path d="M54 116 C42 108 38 128 47 140 C36 146 38 166 53 171 Z" fill={hair} />
      <path d="M106 116 C118 108 122 128 113 140 C124 146 122 166 107 171 Z" fill={hair} />
      <circle cx="80" cy="112" r="43" fill={hair} />
      <path d="M39 116 C45 72 115 72 121 116 C104 104 80 105 61 123 C53 119 46 117 39 116 Z" fill={hair} />
      <circle cx="80" cy="128" r="40" fill={face} />
      <path d="M45 109 C61 76 103 78 118 110 C92 106 70 110 50 129 Z" fill={hair} />
      <path d="M58 123 C67 116 73 116 79 123" fill="none" stroke="#6b4f44" strokeLinecap="round" strokeWidth="4" />
      <path d="M87 123 C96 116 102 116 108 123" fill="none" stroke="#6b4f44" strokeLinecap="round" strokeWidth="4" />
      <circle cx="66" cy="132" r="5" fill="#5b463f" />
      <circle cx="96" cy="132" r="5" fill="#5b463f" />
      <path d="M77 143 Q80 146 83 143" fill="none" stroke="#9b5d4d" strokeLinecap="round" strokeWidth="3" />
      <path d="M70 154 Q80 160 91 154" fill="none" stroke="#7c4b41" strokeLinecap="round" strokeWidth="3" />
      <Heart x={47} y={140} fill={cheek} />
      <Heart x={99} y={140} fill={cheek} />
      {variant === "female" ? (
        <>
          <circle cx="39" cy="96" r="15" fill={hair} />
          <circle cx="119" cy="96" r="15" fill={hair} />
          <circle cx="123" cy="87" r="6" fill={accent} />
          <circle cx="130" cy="94" r="5" fill={accent} />
        </>
      ) : (
        <path d="M44 109 C53 81 111 80 118 108 C92 94 68 97 44 109 Z" fill={hair} opacity="0.95" />
      )}
      <path d="M47 178 C51 158 109 158 113 178 L121 224 C103 236 61 236 39 224 Z" fill={outfit} />
      <path d="M47 178 L28 205" stroke={sleeve} strokeLinecap="round" strokeWidth="18" />
      <path d="M113 178 L132 205" stroke={sleeve} strokeLinecap="round" strokeWidth="18" />
      <circle cx="26" cy="209" r="10" fill={face} />
      <circle cx="134" cy="209" r="10" fill={face} />
      <path d="M59 189 H101 V219 H59 Z" fill="white" opacity="0.28" />
      <path d="M62 194 Q80 206 98 194" fill="none" stroke="white" strokeLinecap="round" strokeWidth="5" opacity="0.75" />
      <path d="M56 226 L56 255" stroke={shorts} strokeLinecap="round" strokeWidth="20" />
      <path d="M101 226 L101 255" stroke={shorts} strokeLinecap="round" strokeWidth="20" />
      <path d="M50 266 H72" stroke={primary} strokeLinecap="round" strokeWidth="10" />
      <path d="M91 266 H113" stroke={primary} strokeLinecap="round" strokeWidth="10" />
    </g>
  );
}

export function PersonalityMascot({ type }: { type: string }) {
  const key = typeKey(type);
  const visual = typeVisuals[key];

  return (
    <div className="mascot-card" aria-label={`${key} character pair`}>
      <svg viewBox="0 0 360 290" role="img" aria-label={`Cute character pair for ${key}`}>
        <rect width="360" height="290" rx="28" fill={visual.soft} />
        <circle cx="58" cy="56" r="24" fill={visual.secondary} opacity="0.22" />
        <circle cx="306" cy="74" r="34" fill={visual.primary} opacity="0.14" />
        <path d="M19 245 C76 222 111 250 169 231 C227 212 267 233 343 210 V290 H19 Z" fill="#ffffff" opacity="0.46" />
        <Character x={34} primary={visual.primary} secondary={visual.secondary} accent={visual.accent} variant="female" />
        <Character x={172} primary={visual.primary} secondary={visual.secondary} accent={visual.accent} variant="male" />
        <PropBadge type={key} x={177} y={45} color={visual.primary} />
      </svg>
    </div>
  );
}
