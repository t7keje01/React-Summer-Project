import { useState } from "react";
import "../components/styles.css";
import "../components/layout.css";
import { useNavigate } from "react-router-dom";

const main_food = require("../images/restaurantfood.jpg");

const CalltoAction = () => {
    const navigate = useNavigate();
  
    const handleClick  = () => {
        navigate("/reservations", { replace: true });
    };

    return (
        <article className="homeGrid" id="heroSection">
            <div className="title_desc">
                <h1>Little Lemon</h1>
                <h2>Chigaco</h2>
                <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                <button id="blackButton" onClick={handleClick}>Reserve a Table</button>
            </div>
            <div className="title_img">
                <img src={main_food} alt="Restaurant food" className="home_img"/>
            </div>
        </article>
    );
};

export default CalltoAction;