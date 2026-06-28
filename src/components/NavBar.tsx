import { NavLink } from "react-router";
import { PRIMARY_NAV_LINKS, ROUTES } from "../config/routes";
import { SITE_ARTIST_NAME, SITE_BRAND_NAME } from "../config/site";

export function NavBar() {
  return (
    <div className="sticky top-0 z-50 border-b border-[var(--charcoal)]/15 bg-[var(--cream)]/95 backdrop-blur">
      <header className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-[0.55rem] px-[1.375rem] py-[0.825rem] sm:flex-row sm:px-[2.2rem] lg:px-[3.3rem]">
        <NavLink
          className="hidden font-serif text-[1.4375rem] lg:block lg:text-[1.725rem]"
          to={ROUTES.home}
        >
          {SITE_ARTIST_NAME}
        </NavLink>
        <NavLink
          className="text-center text-[1.006rem] font-semibold uppercase tracking-[0.13em] md:text-[1.15rem]"
          to={ROUTES.home}
        >
          {SITE_BRAND_NAME}
        </NavLink>
        <div className="flex w-full flex-wrap items-center justify-center gap-x-[0.825rem] gap-y-[0.55rem] sm:w-auto sm:gap-x-[1.1rem]">
          <nav className="flex w-full max-w-full flex-wrap justify-center gap-x-[0.825rem] gap-y-[0.275rem] text-[1.127rem] sm:w-auto sm:gap-x-[1.1rem] sm:text-[1.254rem] lg:text-[1.369rem]">
            {PRIMARY_NAV_LINKS.map((link) => (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-option nav-option--selected" : "nav-option"
                }
                end={link.end}
                key={link.to}
                to={link.to}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <NavLink className="nav-cta shrink-0" to={ROUTES.contactInquiry}>
            Request a Piece
          </NavLink>
        </div>
      </header>
    </div>
  );
}
