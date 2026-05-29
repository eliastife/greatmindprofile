import Link from "next/link";

const links = [
  ["/privacy-policy", "Privacy"],
  ["/terms", "Terms"],
  ["/contact", "Contact"],
  ["/editorial-policy", "Editorial Policy"],
  ["/advertising-policy", "Advertising Policy"],
  ["/cookie-policy", "Cookie Policy"],
  ["/fr", "Français"]
] as const;

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <strong>Great Mind Profile</strong>
        <p>Built from established personality frameworks for self-reflection and educational insight. Results are estimates, not diagnoses.</p>
        <div className="footer-links">
          {links.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
