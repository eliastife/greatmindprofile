export function AdSlot({ label = "Advertisement" }: { label?: string }) {
  return (
    <aside className="ad-slot" aria-label={label}>
      {label}
    </aside>
  );
}
