export function TraitBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="trait-row">
      <div className="trait-label">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="bar">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
