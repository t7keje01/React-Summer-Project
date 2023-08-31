import { useNavigate } from "react-router-dom";

const mainFoodPic = require("../../images/restaurantfood.jpg");

const CalltoAction = () => {
    const navigate = useNavigate();
  
    const handleClick  = () => {
        navigate("/reservations", { replace: true });
    };

    return (
        <div className="homeGrid" id="heroSection">
            <div className="titleDesc">
                <h1>Little Lemon</h1>
                <h2>Chigaco</h2>
                <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                <button id="blackButton" onClick={handleClick}>Reserve a Table</button>
            </div>
            <div className="titleImg">
                <img src={mainFoodPic} alt="Restaurant food" className="homeImg"/>
            </div>
        </div>
    );
};

export default CalltoAction;