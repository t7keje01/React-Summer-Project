import React, { useState, useEffect, useRef } from "react";
import { useNavigate} from "react-router-dom";
import { Box, HStack } from "@chakra-ui/react";
import "./components/typeSystem.css";

const logo = require("./images/logo.JPG");

const Header = () => {
  
    const navigate = useNavigate();

    const navigateHome = () => {
    // 👇️ navigate to /
    navigate('/');
  };

    /*
  const [scrollTop, setScrollTop] = useState(0);
  const previousScrollValue = useRef(1);

  useEffect(() => {
1    const handleScroll = (event) => {
      setScrollTop(window.scrollY);
    };

    previousScrollValue.current = scrollTop;

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollTop]);

  const currentTranslateY = scrollTop < previousScrollValue.current ? 0 : -200;
  */

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      /* transform={`translateY(${currentTranslateY}px)`} */
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="white"
      zIndex={1}
    >
    <HStack
        py={16}
        alignItems="center"
        justifyContent="center"
    >
        <nav>
            <img src={logo} alt="Little Lemon logo" style={{ width: "100%", height: "auto" }} onClick={navigateHome}></img>
        </nav>
        <nav>
        <HStack spacing={30} marginLeft={80} className="cardTitle">
            <a href="/home">Home</a>
            <a href="/about">About</a>
            <a href="/menu">Menu</a>
            <a href="/reservations">Reservations</a>
            <a href="/order">Order Online</a>
            <a href="/login">Login</a>
        </HStack>
        </nav>
    </HStack>
    </Box>
  );
};
export default Header;
