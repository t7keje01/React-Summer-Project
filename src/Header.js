import {Link, useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import "./components/styles.css";
import "./components/layout.css";

const logo = require("./images/logo.JPG");

const Header = () => {
  const [textColor, setTextColor] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;

    switch (pathname) {
      case "/":
        setTextColor(1);
        break;
      case "/about":
        setTextColor(2);
        break;
      case "/menu":
        setTextColor(3);
        break;
      case "/reservations":
        setTextColor(4);
        break;
      case "/order":
        setTextColor(5);
        break;
      case "/login":
        setTextColor(6);
        break;
      default:
        setTextColor(0);
    }
  }, [location]);


  return (
    <header className="homeGrid">
      <nav className="navGrid">
        <div className="logoContainer">
          <Link to="/">
            <img src={logo} alt="Little Lemon logo" className="logo" />
          </Link>
        </div>
        <div className="navLinks">
          <ul className="navType">
            <li><Link to="/" className={textColor === 1 ? 'activeLink' : '' }>Home</Link></li>
            <li><Link to="/about" className={textColor === 2 ? 'activeLink' : '' }>About</Link></li>
            <li><Link to="/menu" className={textColor === 3 ? 'activeLink' : '' }>Menu</Link></li>
            <li><Link to="/reservations" className={textColor === 4 ? 'activeLink' : '' }>Reservations</Link></li>
            <li><Link to="/order" className={textColor === 5 ? 'activeLink' : '' }>Order Online</Link></li>
            <li><Link to="/login" className={textColor === 6 ? 'activeLink' : '' }>Login</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Header;
