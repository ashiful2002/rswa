import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaArrowAltCircleUp } from "react-icons/fa";
import logo from "../assets/logo.png";
import { navigation } from "../constants";

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
      <div className="flex justify-around items-center text-center capitalize bg-neutral-700 text-white tracking-widest rounded-sm font-light ">
        <p>
          Copyright © {date}
          <a href="#" className=" text-green-400 m-2">
            RSWA
          </a>
          . All Rights Reserved.
        </p>
        <p>
          <a href="#" className="text-white">
            <FaArrowAltCircleUp />
          </a>
        </p>
      </div>
    </>
  );
}

export default BsNavbar;
