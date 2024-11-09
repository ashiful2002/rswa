import { Link, Outlet } from "react-router-dom";
import logo3 from '../assets/logo3.jpg'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaUpLong } from "react-icons/fa6";
import logo from "../assets/logo.png";
import { navigation } from "../constants";
import iconTOP from "../assets/go-top-symbolic.svg";
import Footer from "./Footer";
function BsNavbar() {
  return (
    <div className="h-auto">
      <Navbar sticky="top" expand="md" className="bg-body-tertiary sticky">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              {" "}
              <img src={logo3} alt="rswa" width={70} />{" "}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {navigation.map((item) => (
                //  <Link to={item.url}> </Link>

                <Nav.Link className="btn" key={item.id} href={item.url}>
                  {item.title}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
      <Footer />
    </div>
  );
}

export default BsNavbar;
