import { NavLink } from "react-router";

export function NavBar() {
  return (
    <div className="sticky top-0 z-50 border-b border-[var(--charcoal)]/15 bg-[var(--cream)]/95 backdrop-blur">
      <header
        className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-2 px-5 py-3 sm:flex-row sm:px-8 lg:px-12"
      >
        <h1 className="hidden font-serif text-xl lg:block lg:text-2xl">
          Paige Cook
        </h1>
        <p className="text-center text-sm font-semibold uppercase tracking-[0.13em] md:text-base">
          Psychedelic Queen Artistry
        </p>
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[1.09rem] sm:text-[1.19rem]">
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-option nav-option--selected" : "nav-option"
            }
            to="/home"
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
      </header>
    </div>
  );
}
