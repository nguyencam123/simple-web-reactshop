import "bootstrap/dist/css/bootstrap.css";
import "./header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import mying from "../assets/shopping_cart_FILL0_wght400_GRAD0_opsz48.png";
import myimgperson from "../assets/person_FILL0_wght400_GRAD0_opsz48.png";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  var name = localStorage.getItem("username");
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, [cartItems]);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="https://html.design/preview/?theme=timups">
            CAMPHONES
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to={"/"} className="textnabar">
                Home
              </Link>
              <Link to={"/watches"} className="textnabar">
                Watches
              </Link>
              <Link to={"/about"} className="textnabar">
                About
              </Link>
              <NavDropdown title="Contact US" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/action">Action</NavDropdown.Item>

                <NavDropdown.Item href="/Anotheraction">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="/Something">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/Separatedlink">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div className="headercart">
              <Link to="/shopingcart" className="headercart">
                <span className="picturecart">
                  <span className="cc">
                    <img src={mying} alt="" width={"35px"} height={"35px"} />
                    <span className="cartItemCount">({cartItems.length})</span>
                  </span>
                </span>
              </Link>
              <Link to="/login" className="headercart">
                <span className="picturecart">
                  <img src={myimgperson} alt="" width={"35px"} height={"35px"} />
                  {name}
                </span>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>

  );
}
export default Header;
