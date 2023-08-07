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
    <header>
      <nav className="homeGrid">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Little Lemon logo" className="logo" />
          </Link>
        </div>
        {/* Navigation Links */}
        <div className="nav-links">
          <ul className="navType">
            <li><Link to="/" style={{ color: textColor === 1 ? '#F4CE14' : 'black' }}>Home</Link></li>
            <li><Link to="/about" style={{ color: textColor === 2 ? '#F4CE14' : 'black' }}>About</Link></li>
            <li><Link to="/menu" style={{ color: textColor === 3 ? '#F4CE14' : 'black' }}>Menu</Link></li>
            <li><Link to="/reservations" style={{ color: textColor === 4 ? '#F4CE14' : 'black' }}>Reservations</Link></li>
            <li><Link to="/order" style={{ color: textColor === 5 ? '#F4CE14' : 'black' }}>Order Online</Link></li>
            <li><Link to="/login" style={{ color: textColor === 6 ? '#F4CE14' : 'black' }}>Login</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Header;
