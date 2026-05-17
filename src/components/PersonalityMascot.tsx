import { typeVisuals, type PersonalityType } from "@/lib/typeVisuals";
import type { CSSProperties } from "react";

function PropIcon({ type }: { type: PersonalityType }) {
  const visual = typeVisuals[type];
  const common = { stroke: "#1f2937", strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (visual.prop) {
    case "telescope":
      return (
        <g transform="translate(122 132) rotate(-18)">
          <rect x="0" y="0" width="46" height="18" rx="9" fill={visual.secondary} {...common} />
          <line x1="8" y1="18" x2="-8" y2="48" {...common} />
          <line x1="36" y1="18" x2="52" y2="48" {...common} />
        </g>
      );
    case "book":
      return (
        <g transform="translate(122 128)">
          <path d="M0 8c14-8 28-8 42 0v44c-14-8-28-8-42 0z" fill={visual.secondary} {...common} />
          <path d="M42 8c14-8 28-8 42 0v44c-14-8-28-8-42 0z" fill={visual.accent} {...common} />
        </g>
      );
    case "flag":
      return (
        <g transform="translate(138 108)">
          <line x1="0" y1="0" x2="0" y2="80" {...common} />
          <path d="M0 4c18-12 34 10 52-2v38c-18 12-34-10-52 2z" fill={visual.secondary} {...common} />
        </g>
      );
    case "bulb":
      return (
        <g transform="translate(136 114)">
          <path d="M24 0a24 24 0 0 1 14 43c-5 4-5 7-5 12H15c0-5 0-8-5-12A24 24 0 0 1 24 0z" fill={visual.secondary} {...common} />
          <path d="M16 64h16M18 74h12" {...common} />
        </g>
      );
    case "lantern":
      return (
        <g transform="translate(132 112)">
          <path d="M14 0h36M22 0c-12 10-12 48 0 58h20c12-10 12-48 0-58" fill={visual.accent} {...common} />
          <path d="M20 22h24M20 38h24" {...common} />
        </g>
      );
    case "brush":
      return (
        <g transform="translate(128 132) rotate(-24)">
          <rect x="12" y="0" width="14" height="62" rx="7" fill={visual.secondary} {...common} />
          <path d="M8 58h22l-6 22c-2 8-14 8-16 0z" fill={visual.accent} {...common} />
        </g>
      );
    case "heart":
      return (
        <path d="M158 132c-22-22-48-2-30 22l30 34 30-34c18-24-8-44-30-22z" fill={visual.secondary} stroke="#1f2937" strokeWidth="3" />
      );
    case "kite":
      return (
        <g transform="translate(130 104)">
          <path d="M34 0l34 34-34 56L0 34z" fill={visual.secondary} {...common} />
          <path d="M34 0v90M0 34h68M34 90c-4 20 10 28 0 44" {...common} fill="none" />
        </g>
      );
    case "clipboard":
    case "checklist":
      return (
        <g transform="translate(132 112)">
          <rect x="0" y="8" width="58" height="76" rx="10" fill={visual.accent} {...common} />
          <rect x="16" y="0" width="26" height="18" rx="7" fill={visual.secondary} {...common} />
          <path d="M16 34h28M16 52h28M16 70h28" {...common} />
          {visual.prop === "checklist" ? <path d="M8 32l5 5 8-10M8 50l5 5 8-10" {...common} /> : null}
        </g>
      );
    case "cup":
      return (
        <g transform="translate(132 128)">
          <path d="M0 10h54l-8 54H8z" fill={visual.secondary} {...common} />
          <path d="M54 20h12c12 0 12 22 0 22H50" fill="none" {...common} />
          <path d="M10 0c0-12 12-12 12-24M32 0c0-12 12-12 12-24" {...common} fill="none" />
        </g>
      );
    case "bouquet":
      return (
        <g transform="translate(128 114)">
          <path d="M34 34L14 94M34 34l20 60M34 34v64" {...common} fill="none" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={18 + i * 16} cy={24 + (i % 2) * 10} r="14" fill={i === 1 ? visual.secondary : visual.accent} stroke="#1f2937" strokeWidth="3" />
          ))}
        </g>
      );
    case "wrench":
      return (
        <g transform="translate(126 128) rotate(-28)">
          <path d="M18 0a28 28 0 0 0 30 36L12 72 0 60 36 24A28 28 0 0 0 18 0z" fill={visual.secondary} {...common} />
        </g>
      );
    case "palette":
      return (
        <g transform="translate(126 124)">
          <path d="M40 0C16 0 0 16 0 38c0 20 16 34 38 34h10c8 0 10-10 4-14-8-6-2-18 10-18h8C74 18 60 0 40 0z" fill={visual.accent} {...common} />
          <circle cx="22" cy="26" r="5" fill={visual.primary} />
          <circle cx="42" cy="18" r="5" fill={visual.secondary} />
          <circle cx="18" cy="48" r="5" fill="#ef4444" />
        </g>
      );
    case "bolt":
      return <path d="M166 104l-42 58h28l-12 54 44-68h-28z" fill={visual.secondary} stroke="#1f2937" strokeWidth="3" strokeLinejoin="round" />;
    case "mic":
      return (
        <g transform="translate(140 112)">
          <rect x="8" y="0" width="34" height="58" rx="17" fill={visual.secondary} {...common} />
          <path d="M0 34c0 24 50 24 50 0M25 58v28M10 86h30" {...common} fill="none" />
        </g>
      );
  }
}

function AnimalDetails({ type }: { type: PersonalityType }) {
  const visual = typeVisuals[type];
  const stroke = "#1f2937";

  switch (visual.animal) {
    case "owl":
      return (
        <>
          <path d="M64 66Q108 22 152 66Q130 50 108 62Q86 50 64 66Z" fill={visual.secondary} stroke={stroke} strokeWidth="4" />
          <circle cx="88" cy="92" r="18" fill="#fff" stroke={stroke} strokeWidth="4" />
          <circle cx="128" cy="92" r="18" fill="#fff" stroke={stroke} strokeWidth="4" />
          <path d="M108 98l-9 14h18z" fill={visual.accent} stroke={stroke} strokeWidth="3" />
        </>
      );
    case "cat":
    case "fox":
      return (
        <>
          <path d="M62 78L74 34l30 30" fill={visual.secondary} stroke={stroke} strokeWidth="4" />
          <path d="M154 78l-12-44-30 30" fill={visual.secondary} stroke={stroke} strokeWidth="4" />
          {visual.animal === "fox" ? <path d="M152 164c32 4 44 34 18 48-8-16-22-24-46-24" fill={visual.secondary} stroke={stroke} strokeWidth="4" /> : null}
        </>
      );
    case "lion":
      return <circle cx="108" cy="92" r="62" fill={visual.secondary} stroke={stroke} strokeWidth="4" />;
    case "deer":
      return (
        <>
          <path d="M74 62C58 34 62 22 80 42M142 62c16-28 12-40-6-20M74 48H56M142 48h18" fill="none" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
          <path d="M68 76L44 52M148 76l24-24" fill="none" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
        </>
      );
    case "rabbit":
      return (
        <>
          <rect x="70" y="18" width="26" height="72" rx="13" fill={visual.secondary} stroke={stroke} strokeWidth="4" transform="rotate(-12 83 54)" />
          <rect x="120" y="18" width="26" height="72" rx="13" fill={visual.secondary} stroke={stroke} strokeWidth="4" transform="rotate(12 133 54)" />
        </>
      );
    case "dog":
      return (
        <>
          <path d="M62 76c-32 18-28 76 8 70 10-28 10-48-8-70z" fill={visual.secondary} stroke={stroke} strokeWidth="4" />
          <path d="M154 76c32 18 28 76-8 70-10-28-10-48 8-70z" fill={visual.secondary} stroke={stroke} strokeWidth="4" />
        </>
      );
    case "squirrel":
      return <path d="M152 160c42-20 42-80 0-82 26 28 14 54-24 74" fill={visual.secondary} stroke={stroke} strokeWidth="4" />;
    case "turtle":
      return <path d="M54 144c8-44 100-44 108 0z" fill={visual.secondary} stroke={stroke} strokeWidth="4" />;
    case "sheep":
      return (
        <path d="M58 78c-18-28 18-50 36-28 10-30 50-26 54 4 28-2 36 34 12 48" fill={visual.secondary} stroke={stroke} strokeWidth="4" />
      );
    case "bear":
    case "panda":
      return (
        <>
          <circle cx="70" cy="58" r="20" fill={visual.secondary} stroke={stroke} strokeWidth="4" />
          <circle cx="146" cy="58" r="20" fill={visual.secondary} stroke={stroke} strokeWidth="4" />
          {visual.animal === "panda" ? (
            <>
              <ellipse cx="88" cy="94" rx="18" ry="22" fill="#1f2937" opacity=".86" />
              <ellipse cx="128" cy="94" rx="18" ry="22" fill="#1f2937" opacity=".86" />
            </>
          ) : null}
        </>
      );
    case "beaver":
      return (
        <>
          <path d="M156 168l34 24-34 24-34-24z" fill={visual.secondary} stroke={stroke} strokeWidth="4" />
          <rect x="98" y="118" width="20" height="24" rx="3" fill="#fff" stroke={stroke} strokeWidth="3" />
        </>
      );
    case "hedgehog":
      return <path d="M52 80l16-24 14 18 14-26 14 24 18-22 10 28 24-8-14 34" fill={visual.secondary} stroke={stroke} strokeWidth="4" />;
    case "tiger":
      return (
        <>
          <path d="M62 78L74 36l26 30M154 78l-12-42-26 30" fill={visual.secondary} stroke={stroke} strokeWidth="4" />
          <path d="M82 62l-14 28M108 50v34M134 62l14 28" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
        </>
      );
    case "penguin":
      return (
        <>
          <path d="M70 76c0-52 76-52 76 0v46H70z" fill={visual.primary} stroke={stroke} strokeWidth="4" />
          <ellipse cx="108" cy="102" rx="42" ry="48" fill="#fff" />
          <path d="M108 98l-10 12h20z" fill={visual.accent} stroke={stroke} strokeWidth="3" />
        </>
      );
  }
}

export function PersonalityMascot({ type }: { type: string }) {
  const safeType = (type in typeVisuals ? type : "INFP") as PersonalityType;
  const visual = typeVisuals[safeType];

  return (
    <div
      className="mascot-card"
      style={
        {
          "--type-primary": visual.primary,
          "--type-secondary": visual.secondary,
          "--type-soft": visual.soft
        } as CSSProperties
      }
    >
      <svg viewBox="0 0 240 240" role="img" aria-label={`${safeType} personality character`}>
        <ellipse cx="92" cy="214" rx="62" ry="14" fill="rgba(31,41,55,.14)" />
        <path d="M54 138c0-34 24-58 54-58s54 24 54 58v54c0 20-108 20-108 0z" fill={visual.primary} stroke="#1f2937" strokeWidth="4" />
        <circle cx="108" cy="92" r="48" fill={visual.animal === "penguin" ? "transparent" : "#ffd9b8"} stroke={visual.animal === "penguin" ? "transparent" : "#1f2937"} strokeWidth="4" />
        <AnimalDetails type={safeType} />
        <circle cx="90" cy="92" r="5" fill="#1f2937" />
        <circle cx="126" cy="92" r="5" fill="#1f2937" />
        <path d="M96 116c8 8 20 8 28 0" fill="none" stroke="#1f2937" strokeWidth="4" strokeLinecap="round" />
        <circle cx="76" cy="110" r="8" fill="#fb7185" opacity=".45" />
        <circle cx="140" cy="110" r="8" fill="#fb7185" opacity=".45" />
        <path d="M70 156c-18 12-22 32-8 44M146 156c18 12 22 32 8 44" fill="none" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" />
        <path d="M84 142h48l-6 42H90z" fill={visual.accent} stroke="#1f2937" strokeWidth="3" />
        <PropIcon type={safeType} />
      </svg>
    </div>
  );
}
