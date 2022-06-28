import React from 'react'
import { useLocation } from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


function NavbarSite() {
  const location = useLocation();

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

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>{Name}</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavbarSite