import { Link } from "@tanstack/react-router";
import { Github, Linkedin, X } from "lucide-react";

import { Container } from "@/components/ui/container";
import { footerColumns } from "@/components/layout/nav-links";

function Footer() {
  return (
    <footer className="footer-dark border-t border-line">
      <Container className="grid gap-10 py-14 md:grid-cols-6">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="logo-mark" aria-hidden="true">
              <span>N</span>
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight">DOVIXORA</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            DOVIXORA is a verification infrastructure platform for modern businesses and developers, built by Dovix
            AI.
          </p>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground/70">
            Jaipur, Rajasthan, India · info@dovix.ai · +91 91163 82399
          </p>
          <div className="mt-6 flex gap-3">
            <a className="social-link" href="https://linkedin.com" aria-label="DOVIXORA on LinkedIn" target="_blank" rel="noreferrer">
              <Linkedin className="size-4" />
            </a>
            <a className="social-link" href="https://x.com" aria-label="DOVIXORA on X" target="_blank" rel="noreferrer">
              <X className="size-4" />
            </a>
            <a className="social-link" href="https://github.com" aria-label="DOVIXORA on GitHub" target="_blank" rel="noreferrer">
              <Github className="size-4" />
            </a>
          </div>
        </div>
        {footerColumns.map((column) => (
          <div key={column.heading}>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
              {column.heading}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {column.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-6 font-mono text-[10px] text-muted-foreground/70">
          <span>© 2026 DOVIXORA. All rights reserved.</span>
          <span>The infrastructure behind modern finance.</span>
        </Container>
      </div>
    </footer>
  );
}

export { Footer };
