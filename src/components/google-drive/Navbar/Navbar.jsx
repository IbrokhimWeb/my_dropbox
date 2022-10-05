//  Import React
import React from "react";

//  Import Bootstrap Components
import { Navbar, Nav } from "react-bootstrap";

//  Import Link => React-router-dom
import { Link } from "react-router-dom"

// Import module css
import s from "./Navbar.module.css"

export default function NavbarComponent() {
    return (
        <Navbar bg="light" expand="sm" className={s.navbar}>
            <Navbar.Brand className={s.brand} as={Link} to="/">
                Dropbox
            </Navbar.Brand>
            <Nav>
                <Nav.Link className={s.profile} as={Link} to="/user">
                    Profile
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}
