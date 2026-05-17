import Link from "next/link";
import { navLinks } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />
          <span>Great Mind Profile</span>
        </Link>
        <nav className="nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
