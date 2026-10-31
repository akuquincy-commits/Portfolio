import { personalInfo } from "../data/siteData";
import "./Footer.css";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo-row">
            <div className="footer__logo-badge">
              <img
                src="/images/logo.png"
                alt="AB Logo"
                className="footer__logo-img"
              />
            </div>
            <p className="footer__name">{personalInfo.name}</p>
          </div>
          <p className="footer__tagline">{personalInfo.title}</p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__social">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {currentYear} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
