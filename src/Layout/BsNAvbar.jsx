import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.png";
import { navigation } from "../constants";
import { Link, Outlet } from "react-router-dom";

function BsNavbar() {
  const date = new Date().getFullYear();

  return (
    <>
      <Navbar sticky="top" expand="md" className="bg-body-tertiary sticky">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="rswa" width={70} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {navigation.map((item) => (
                <Nav.Link className="btn" key={item.id} href={item.url}>
                    {item.title}
                 
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
      <div className="text-center capitalize">
        <p> Copyright © {date} <a href="#" className="no-underline">RSWA.</a> All rights reserved{date}</p>
      </div>
    </>
  );
}

export default BsNavbar;
