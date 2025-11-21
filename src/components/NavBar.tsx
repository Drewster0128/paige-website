function NavBar({ selection }: { selection: string }) {

    return(
        <nav className="nav">
            <a className={selection == "home" ? "nav-option nav-option--selection" : "nav-option"}></a>
            <a className={selection == "gallery" ? "nav-option nav-option--selection" : "nav-option"}></a>
            <a className={selection == "about me" ? "nav-option nav-option--selection" : "nav-option"}></a>
        </nav>
    )
}

export default NavBar