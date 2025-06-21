import { Link, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.png";
import { navigation } from "../constants";
import Footer from "./Footer";
function BsNavbar() {
  return (
    <div className="">
      <Navbar
        sticky="top"
        expand="md"
        className="bg-body-tertiary sticky"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand>
            <Link to="/">
              {" "}
              <img src={logo} alt="rswa" width={70} />{" "}
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
           <Link to="signin" className=" btn btn-success ml-3 bg-green-700">
              Sign in
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
      <Footer />
    </div>
  );
}

export default BsNavbar;
