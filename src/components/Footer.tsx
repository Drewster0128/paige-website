import { NavLink } from "react-router";
import { LEGAL_NAV_LINKS, PRIMARY_NAV_LINKS } from "../config/routes";
import { SITE_ARTIST_NAME, SITE_BRAND_NAME } from "../config/site";

export function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-[var(--charcoal)]/15 bg-[var(--cream)] px-5 py-5 text-[var(--ink)] sm:px-8 sm:py-6 lg:px-12">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-serif text-[1.56rem]">{SITE_BRAND_NAME}</p>
          <p className="mt-1 max-w-md text-[0.94rem] leading-relaxed text-[var(--charcoal)]/70">
            Artwork, appearances, and inquiries for {SITE_ARTIST_NAME}.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-4 gap-y-1 text-[0.94rem]"
          >
            {PRIMARY_NAV_LINKS.map((link) => (
              <NavLink className="footer-link" key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <nav
            aria-label="Legal"
            className="flex flex-wrap gap-x-4 gap-y-1 text-[0.94rem] uppercase tracking-[0.14em] text-[var(--charcoal)]/65"
          >
            {LEGAL_NAV_LINKS.map((link) => (
              <NavLink className="footer-link" key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <p className="text-[0.94rem] text-[var(--charcoal)]/55">
            &copy; {new Date().getFullYear()} {SITE_ARTIST_NAME}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
