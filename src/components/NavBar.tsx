import { NavLink } from "react-router";
//import { useState, useEffect, useRef } from "react";

export function NavBar() {

  return (
    <>
      <h1 className="hidden sm:block">Paige Cook</h1>
      <h1 className="text-xl md:text-3xl lg:text-4xl">Psychedelic Queen Artistry</h1>
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
    </>
  );
}
