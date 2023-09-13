const CheckBooking = (props) => {

    const marioGif = 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzRxY2Z2eXk0ZDMzcGkybmVlZWJjdjJhZjF2dm1qMjN0aHEwdnk0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j0PJNeOsgOejwGjvPQ/giphy.gif';

    /* Props */
    const {
        setStepWithAction,
        setEditRequested
    } = props;

    const handleEdit = () => {
        setStepWithAction(1);
        setEditRequested(true);
    }
    
    return (
        <article className="tableGrid" id="tableGridContainer">

                <h2 className="titleForm">Reservation Details:</h2>
                <section className="tableForm">
                    <article className="checkGrid">
                        <div className="checkTitle">Number of Players:</div>
                        <div>{localStorage.getItem("players")}</div>

                        <div className="checkTitle">Chosen Game:</div>
                        <div>{localStorage.getItem("game")}</div>

                        <div className="checkTitle">Chosen Date:</div>
                        <div>{localStorage.getItem("date")}</div>

                        <div className="checkTitle">Chosen Time:</div>
                        <div>{localStorage.getItem("time")}</div>

                        <div className="checkTitle">Chosen Duration:</div>
                        <div>{localStorage.getItem("duration")}</div>
                    </article>
                </section>
                <section className="pixelImg">
                    <img src={marioGif} alt="Gif" className="gif"></img>
                    <img src={marioGif} alt="Gif" className="gif"></img>
                    <img src={marioGif} alt="Gif" className="gif"></img>
                </section>
            <button id="neonButton" className="formButtons neonText editButton" onClick={handleEdit}>Edit Information</button>
        </article>
    );
};

export default CheckBooking;