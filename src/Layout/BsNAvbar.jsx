import { Link, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaUpLong } from "react-icons/fa6";
import logo from "../assets/logo.png";
import { navigation } from "../constants";
import iconTOP from "../assets/go-top-symbolic.svg";
function BsNavbar() {
  const date = new Date().getFullYear();

  return (
    <div className="h-auto">
      <Navbar sticky="top" expand="md" className="bg-body-tertiary sticky">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="rswa" width={70} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {navigation.map((item) => (
              //  <Link to={item.url}> </Link>

                <Nav.Link className="btn" key={item.id}  href={item.url}>
                  {item.title}
                </Nav.Link>
                
                
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
      <div className="flex flex-col  justify-around items-center md:flex-row-reverse text-center capitalize bg-neutral-700 text-white tracking-widest rounded-sm font-light ">
        <p>
          <a
            href="#"
            className="text-white  hover:text-green-400 text-xl "
          >
            <FaUpLong className="mt-4" />
          </a>
        </p>
        <p className="text-sm">
          Copyright © {date}
          <a href="#" className=" text-green-400 mx-2">
            RSWA
          </a>
          . All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default BsNavbar;
