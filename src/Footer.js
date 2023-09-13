import {Link} from "react-router-dom";
import "./components/styles.css";
import "./components/layout.css";
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const footerLogoImg = require("./images/stacked_logo.JPG");

const Footer = () => {

  const [selectedPath, setSelectedPath] = useState("");
  const [element, setElement] = useState();
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleLinkClick = (site) => {

    switch (site) {
      case "facebook":
        window.location.href = "https://www.facebook.com"; 
        break;
      case "twitter":
        window.location.href = "https://twitter.com";
        break;
      case "instagram":
        window.location.href = "https://www.instagram.com";
        break;
      case "youtube":
        window.location.href = "https://www.youtube.com";
        break;
      default:
        console.log("Action failed");
    }
  };

  return (
    <>
    <MDBFooter id="footer" className='text-center homeGrid' color='white' bgColor="black">
      <MDBContainer className='p-4' id="foot">
        <section className='mb-4'>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button' onClick={() => handleLinkClick("facebook")}>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button' onClick={() => handleLinkClick("twitter")}>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button' onClick={() => handleLinkClick("instagram")}>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button' onClick={() => handleLinkClick("youtube")}>
            <MDBIcon fab icon='youtube' />
          </MDBBtn>
        </section>
        <section className=''>
          <MDBRow>
            <MDBCol lg='4' md='6' className='mb-4 mb-md-0' id="footLogo">
              <Link to="/"><img src={footerLogoImg} alt="Company logo" className="footerLogo"></img></Link>
            </MDBCol>

            <MDBCol lg='4' id="footBlockLinks">
              <h5 className='text-uppercase'>Navigate</h5>

              <ul className='list-unstyled mb-0' id="footLinks">
                  <li><Link to="/" onClick={(e) => handleClick("home")(e)} className='text-white'>Home</Link></li>
                  <li><Link to="/about" onClick={(e) => handleClick("about")(e)} className='text-white'>About</Link></li>
                  <li><Link to="/activity" onClick={(e) => handleClick("activity")(e)} className='text-white'>Activities</Link></li>
                  <li><Link to="/leaderboard" onClick={(e) => handleClick("leaderboard")(e)} className='text-white'>Leaderboard</Link></li>
                  <li><Link to="/tournament" onClick={(e) => handleClick("tournament")(e)} className='text-white'>Tournaments</Link></li>
                  <li><Link to="/reservation" className='text-white'>Reservations</Link></li>
                  <li><Link to="/pricing" onClick={(e) => handleClick("pricing")(e)} className='text-white'>Pricing</Link></li>
              </ul>
            </MDBCol>

            <MDBCol lg='4' md='6' className='mb-4 mb-md-0' id="footBlockContact">
              <h5 className='text-uppercase'>Contact</h5>
              <p>
                  <MDBIcon color='secondary' icon='home' className='me-2' />
                  Pelaaja Street 123, 90100 Oulu
              </p>
              <p>
                  <MDBIcon color='secondary' icon='envelope' className='me-3' />
                  thegamegarden@google.com
              </p>
              <p>
                  <MDBIcon color='secondary' icon='phone' className='me-3' /> 
                  + 040 123 4567
              </p>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>
    </MDBFooter>
    <div className='text-center p-3' id="copyright">
      © 2023 Copyright: The Game Garden
    </div>
  </>
);
};
export default Footer;