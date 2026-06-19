import { NavLink } from "react-router";

const primaryLinks = [
  { label: "Home", to: "/" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Events", to: "/events" },
  { label: "Contact", to: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms-of-service" },
];

export function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-[var(--charcoal)] bg-[var(--charcoal)] px-5 py-5 text-[var(--cream)] sm:px-8 sm:py-6 lg:px-12">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-[1.56rem]">Psychedelic Queen Artistry</p>
          <p className="mt-1 max-w-md text-[0.94rem] leading-relaxed text-[var(--cream)]/60">
            Artwork, appearances, and inquiries for Paige Cook.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-4 gap-y-1 text-[0.94rem]"
          >
            {primaryLinks.map((link) => (
              <NavLink className="footer-link" key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <nav
            aria-label="Legal"
            className="flex flex-wrap gap-x-4 gap-y-1 text-[0.94rem] uppercase tracking-[0.14em] text-[var(--cream)]/55"
          >
            {legalLinks.map((link) => (
              <NavLink className="footer-link" key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <p className="text-[0.94rem] text-[var(--cream)]/45">
            &copy; {new Date().getFullYear()} Paige Cook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
