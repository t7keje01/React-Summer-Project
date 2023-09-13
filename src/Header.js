import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./components/styles.css";
import "./components/layout.css";
import { Nav, Navbar } from "react-bootstrap";

const logo = require("./images/logo_oneline.JPG");

const Header = () => {
  const [textColor, setTextColor] = useState(0);
  const [selectedPath, setSelectedPath] = useState("");
  const [element, setElement] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname } = location;

    switch (pathname) {
      case "/":
        setTextColor(1);
        break;
      case "/about":
        setTextColor(2);
        break;
      case "/activity":
        setTextColor(3);
        break;
      case "/leaderboard":
        setTextColor(4);
        break;
      case "/tournament":
        setTextColor(5);
        break;
      case "/reservation":
        setTextColor(6);
        break;
      case "/pricing":
        setTextColor(7);
        break;
      default:
        setTextColor(0);
    }
  }, [location]);

  useEffect(() => {
    if (selectedPath !== "") {
      navigate(selectedPath);
    }
  }, [selectedPath, navigate]);

  const handleClick = (anchor) => (e) => {
    e.preventDefault();
    const id = `${anchor}Section`;
    const currentElement = document.getElementById(id);
    setElement(currentElement);

    if ( anchor !== "home" ) {
      const currentPath = "/" + anchor;
      setSelectedPath(currentPath);
    } else {
      setSelectedPath("/");
    }

    if (location.pathname !== selectedPath) {
      navigate(selectedPath);
    }
  
    if (currentElement) {
      const padding = parseInt(getComputedStyle(currentElement).paddingTop, 10);
      const scrollTo = currentElement.offsetTop - padding;
  
      window.scrollTo({
        top: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="homeGrid">
      <div className="navGrid">
        <Navbar collapseOnSelect expand="lg" className="navType" sticky="top">
        <Navbar.Brand href="/">
          <img src={logo} alt="The Game Garden logo" height="50px" width="auto" className="d-inline-block align-top"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" onClick={(e) => handleClick("home")(e)} className={textColor === 1 ? 'activeLink' : '' }>Home</Nav.Link>
              <Nav.Link href="/about" onClick={(e) => handleClick("about")(e)} className={textColor === 2 ? 'activeLink' : '' }>About</Nav.Link>
              <Nav.Link href="/activity" onClick={(e) => handleClick("activity")(e)} className={textColor === 3 ? 'activeLink' : '' }>Activities</Nav.Link>
              <Nav.Link href="/leaderboard" onClick={(e) => handleClick("leaderboard")(e)} className={textColor === 4 ? 'activeLink' : '' }>Leaderboard</Nav.Link>
              <Nav.Link href="/tournament" onClick={(e) => handleClick("tournament")(e)} className={textColor === 5 ? 'activeLink' : '' }>Tournaments</Nav.Link>
              <Nav.Link href="/reservation" className={textColor === 6 ? 'activeLink' : '' }>Reservations</Nav.Link>
              <Nav.Link href="/pricing" onClick={(e) => handleClick("pricing")(e)} className={textColor === 7 ? 'activeLink' : '' }>Pricing</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};
export default Header;
