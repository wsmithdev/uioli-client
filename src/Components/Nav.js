// Modules
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

// Styles
import "./Styles/Nav.css";

// Context
import UserContext from "../UserContext";
import { useContext } from "react";

const NavBar = ({ logout }) => {
  const user = useContext(UserContext);
  return (
    <div className="nav-main">
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt=""
              src={require("../Assets/nav-logo-blue.png")}
              height="70"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-start"
            id="responsive-navbar-nav"
          >
            <Nav>
              {user.token ? (
                <>
                  <Nav.Link as={Link} to="/cards">
                    Cards
                  </Nav.Link>
                </>
              ) : null}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Nav>
              {user.token ? (
                <>
                  <Nav.Link as={Link} to="/profile">
                    {user.first_name}
                  </Nav.Link>
                  <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Signup
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
