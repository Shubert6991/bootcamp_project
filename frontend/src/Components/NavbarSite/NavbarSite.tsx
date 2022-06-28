import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image'

function NavbarSite() {
  const location = useLocation();
  const navigate = useNavigate();

  let Name:string = "";
  switch (location.pathname) {
    case "/":
      Name = "Bootcamp Ruby";
      break;
    case "/register":
      Name = "Register";
      break;
    case "/login":
      Name = "Log In";
      break;
    default:
      Name = "Error";
      break;
  }

  // actions to different buttons showed in the navbar
  const goToLogin = () => {
    navigate("/login", { replace: true });
  };

  const goToRegister = () => {
    navigate("/register", { replace: true });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand>{Name}</Navbar.Brand>

        {location.pathname === "/register" && (
          <Button variant="success" onClick={goToLogin}>
            Login
          </Button>
        )}

        {location.pathname === "/login" && (
          <Button className="success" onClick={goToRegister}>
            Registrarse
          </Button>
        )}

        <Navbar.Toggle aria-controls="navbar-nav" />
        {location.pathname === "/" && (
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav>
              <Image 
                roundedCircle 
                src="https://via.placeholder.com/300.png/09f/fff" 
                alt="profile Image" 
                height={40}
                className="d-none d-md-block"
              />

              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  )
}

export default NavbarSite