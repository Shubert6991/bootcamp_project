import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image'
import Offcanvas from 'react-bootstrap/Offcanvas'

import cart from './cart.png'

function NavbarSite() {
  const location = useLocation();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  let Name:string = "";

  let UserPic:any = ""
  let UserType:any = 0
  switch (location.pathname) {
    case "/":
      Name = "Bootcamp Ruby";
      UserPic = sessionStorage.getItem("userPic") ? sessionStorage.getItem("userPic") : ""
      UserType = sessionStorage.getItem("userType") ? +sessionStorage.getItem("userType")! : 0
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

  const logOut = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('uid');
    sessionStorage.removeItem('userPic');
    sessionStorage.removeItem('userType');
    navigate("/login", { replace: true });
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(UserType)
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand>{Name}</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>

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

          {location.pathname !== "/register" && location.pathname !== "/login" && (
            <>
            <Nav.Item className="d-none d-md-block" >
              <Nav.Link onClick={handleShow}>
                <Image 
                  roundedCircle 
                  src={cart} 
                  alt="cart link" 
                  height={25}
                  width={25}
                />
              </Nav.Link>
            </Nav.Item>


            <Offcanvas show={show} onHide={handleClose} placement="end" scroll>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              Cart Items
            </Offcanvas.Body>
            </Offcanvas>
            </>
          )}

          {location.pathname === "/" && (
            <>
              <Nav.Item className="d-none d-md-block">
                <Nav.Link href="/profile">
                  <Image 
                    roundedCircle 
                    src={UserPic}
                    alt="profile Image" 
                    height={25}
                    className="bg-white"
                  />
                </Nav.Link>
              </Nav.Item>
              
              <NavDropdown title="Options" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
                {UserType == 1 && (<NavDropdown.Item href="/add/product">AddProducts</NavDropdown.Item>)}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logOut}>
                  <div className="d-grid gap-2">
                    <div className="btn btn-danger">Log Out</div>
                  </div>
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarSite