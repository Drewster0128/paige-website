import { NavBar } from "./NavBar";
import { Outlet } from "react-router-dom";

export function Layout() : React.JSX.Element {
  return(
    <body>
      <header>
        <NavBar />
      </header>
      <main>
        <section className="page-layout">
          <Outlet />
        </section>
      </main>
    </body>
  )
}