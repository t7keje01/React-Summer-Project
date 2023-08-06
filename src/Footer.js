import {Link} from "react-router-dom";
import "./components/styles.css";
import "./components/layout.css";

const footer_logo = require("./images/footer_logo.JPG");

const Footer = () => {

  return (
    <footer className="grid" id="footerSection">
        <div className="f_logo">
            <Link to="/home"><img src={footer_logo} alt="Little Lemon footer logo" className="footer_logo"></img></Link>
        </div>
        <div className="f_links1">
        <ul>
            <h4 className="footTitle">Doormat Navigation</h4>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservations">Reservations</Link></li>
            <li><Link to="/order">Order Online</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
        </div>
        <div className="f_links2">
        <ul>
            <h4 className="footTitle">Contact</h4>
            <li><Link to="/about/contact">Address</Link></li>
            <li><Link to="/about/contact">Phone Number</Link></li>
            <li><Link to="/about/contact">Email</Link></li>
        </ul>
        </div>
        <div className="f_links3">
        <ul>
            <h4 className="footTitle">Social Media Links</h4>
            <li><Link to="https://facebook.com">Facebook</Link></li>
            <li><Link to="https://twitter.com">Twitter</Link></li>
            <li><Link to="https://instagram.com">Instagram</Link></li>
        </ul>
        </div>
    </footer>
  );
};
export default Footer;