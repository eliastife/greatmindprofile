export function AdSlot({ label = "Advertisement" }: { label?: string }) {
  return (
    <aside className="ad-slot" aria-label={label}>
      {label}
    </aside>
  );
}

export function AdGrid({ count = 8 }: { count?: number }) {
  return (
    <section className="ad-grid" aria-label="Advertisement placements">
      {Array.from({ length: count }, (_, index) => (
        <AdSlot key={index} label={`Advertisement ${index + 1}`} />
      ))}
    </section>
  );
}
