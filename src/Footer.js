import {Link} from "react-router-dom";
import "./components/styles.css";
import "./components/layout.css";

const footer_logo = require("./images/footer_logo.JPG");

const Footer = () => {

  return (
    <footer className="homeGrid" id="footerSection">
        <div className="f_logo">
            <Link to="/home"><img src={footer_logo} alt="Little Lemon footer logo" className="footer_logo"></img></Link>
        </div>
        <h4 id="footTitle" className="f_links1_h">Doormat Navigation</h4>
        <ul className="f_links1">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservations">Reservations</Link></li>
            <li><Link to="/order">Order Online</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
        <h4 id="footTitle" className="f_links2_h">Contact</h4>
        <ul className="f_links2">
            <li><Link to="/about/contact">Address</Link></li>
            <li><Link to="/about/contact">Phone Number</Link></li>
            <li><Link to="/about/contact">Email</Link></li>
        </ul>
        <h4 id="footTitle" className="f_links3_h">Social Media Links</h4>
        <ul className="f_links3">
            <li><Link to="https://facebook.com">Facebook</Link></li>
            <li><Link to="https://twitter.com">Twitter</Link></li>
            <li><Link to="https://instagram.com">Instagram</Link></li>
        </ul>
    </footer>
  );
};
export default Footer;