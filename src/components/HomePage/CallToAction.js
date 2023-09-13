import { useNavigate } from "react-router-dom";

const mainPic = require("../../images/arcade_layout.jpg");

const CalltoAction = () => {
    const navigate = useNavigate();
  
    const handleClick  = () => {
        navigate("/reservations", { replace: true });
    };

    return (
        <main className="homeGrid" id="homeSection">
            <div className="mainImg">
                <img src={mainPic} alt="Game lounge" className="homeImg"/>
            </div>
            <article className="mainDesc">
                <h1>The Game Garden</h1>
                <h2>"The most fun place to be here in Oulu!"</h2>
                <p>Whether you are into billiards, snooker, arcade games... We offer a variety of fun games to play and enjoy!</p>
                <button id="neonButton" className="neonText" onClick={handleClick}>Make a Reservation</button>
            </article>
        </main>
    );
};

export default CalltoAction;