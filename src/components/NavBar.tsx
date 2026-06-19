import { NavLink } from "react-router";

export function NavBar() {
  return (
    <div className="sticky top-0 z-50 border-b border-[var(--charcoal)]/15 bg-[var(--cream)]/95 backdrop-blur">
      <header
        className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-[0.55rem] px-[1.375rem] py-[0.825rem] sm:flex-row sm:px-[2.2rem] lg:px-[3.3rem]"
      >
        <h1 className="hidden font-serif text-[1.4375rem] lg:block lg:text-[1.725rem]">
          Paige Cook
        </h1>
        <p className="text-center text-[1.006rem] font-semibold uppercase tracking-[0.13em] md:text-[1.15rem]">
          Psychedelic Queen Artistry
        </p>
        <div className="flex w-full flex-wrap items-center justify-center gap-x-[0.825rem] gap-y-[0.55rem] sm:w-auto sm:gap-x-[1.1rem]">
          <nav className="flex w-full max-w-full flex-wrap justify-center gap-x-[0.825rem] gap-y-[0.275rem] text-[1.127rem] sm:w-auto sm:gap-x-[1.1rem] sm:text-[1.254rem] lg:text-[1.369rem]">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-option nav-option--selected" : "nav-option"
              }
              end
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-option nav-option--selected" : "nav-option"
              }
              to="/gallery"
            >
              Gallery
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-option nav-option--selected" : "nav-option"
              }
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-option nav-option--selected" : "nav-option"
              }
              to="/events"
            >
              Events
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-option nav-option--selected" : "nav-option"
              }
              to="/contact"
            >
              Contact
            </NavLink>
          </nav>
          <NavLink
            className="nav-cta shrink-0"
            to="/contact#inquiry-form"
          >
            Request a Piece
          </NavLink>
        </div>
      </header>
    </div>
  );
}
