export function RadarChart({ values }: { values: Record<string, number> }) {
  const entries = Object.entries(values);
  const points = entries
    .map(([, value], index) => {
      const angle = (Math.PI * 2 * index) / entries.length - Math.PI / 2;
      const radius = 18 + (value / 100) * 72;
      return `${100 + Math.cos(angle) * radius},${100 + Math.sin(angle) * radius}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 200 200" role="img" aria-label="Radar chart of personality trait scores">
      <polygon points="100,20 176,76 147,164 53,164 24,76" fill="none" stroke="var(--line)" />
      <polygon points={points} fill="rgba(37, 99, 235, 0.28)" stroke="var(--brand)" strokeWidth="3" />
      {entries.map(([key], index) => {
        const angle = (Math.PI * 2 * index) / entries.length - Math.PI / 2;
        return (
          <text key={key} x={100 + Math.cos(angle) * 94} y={104 + Math.sin(angle) * 94} textAnchor="middle" fontSize="8" fill="currentColor">
            {key.slice(0, 4)}
          </text>
        );
      })}
    </svg>
  );
}
