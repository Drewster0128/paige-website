import { NavLink } from "react-router";
//import { useState, useEffect, useRef } from "react";

export function NavBar() {

  // const navRef<HTMLN
  // const [currentPage, setCurrentPage] = useState<string>("home");

  // useEffect(() => {

  // })

  return (
    <div className="bg-neutral-100">
      <header
        className="flex flex-row justify-between items-center
        px-4 max-w-[1264px]
        xl:mx-auto"
      >
        <h1 className="text-4xl">Paige Cook</h1>
        {/* <h1 className="text-4xl">Psychedelic Queen Artistry</h1> */}
        <nav className="flex flex-row gap-4">
          <NavLink
            className={({ isActive }) => isActive ? "nav-option nav-option--selected" : "nav-option"}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => isActive ? "nav-option nav-option--selected" : "nav-option"}
            to="/gallery"
          >
            Gallery
          </NavLink>
        </nav>
      </header>
    </div>
  );
}
