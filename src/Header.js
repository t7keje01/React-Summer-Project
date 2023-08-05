import {Link} from "react-router-dom";
import "./components/styles.css";
import "./components/layout.css";

const logo = require("./images/logo.JPG");

const Header = () => {

  return (
    <header>
      <nav className="grid">
        {/* Logo */}
        <div className="logo-container">
          <Link to="/home">
            <img src={logo} alt="Little Lemon logo" className="logo" />
          </Link>
        </div>
        {/* Navigation Links */}
        <div className="nav-links">
          <ul className="navType">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservations">Reservations</Link></li>
            <li><Link to="/order">Order Online</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Header;
