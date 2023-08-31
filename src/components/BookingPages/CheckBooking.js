import VisualizeChosenTable from "./VisualizeChosenTable";

const CheckBooking = (props) => {

    const bookingImg = require("../../images/book_and_pen.jpg");

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
                        <div className="checkTitle">Number of Diners:</div>
                        <div>{localStorage.getItem("guests")}</div>

                        {localStorage.getItem("chairs") !== "" && <>
                        <div className="checkTitle">Number of Children’s Chairs:</div>
                        <div>{localStorage.getItem("chairs")}</div>
                        </>}

                        <div className="checkTitle">Chosen Date:</div>
                        <div>{localStorage.getItem("date")}</div>

                        <div className="checkTitle">Chosen Time:</div>
                        <div>{localStorage.getItem("time")}</div>

                        {localStorage.getItem("occasion") !== "" && <>
                        <div className="checkTitle">Chosen Occasion:</div>
                        <div>{localStorage.getItem("occasion")}</div>
                        </>}

                        {localStorage.getItem("table") !== "" && <>
                        <div className="checkTitle">Chosen Table:</div>
                        <div>{localStorage.getItem("table")}</div>
                        </>}

                    </article>
                </section>
                {localStorage.getItem("table") !== "" ? (
                    <section className="tableImg" aria-label="Picture of chosen table">
                        <VisualizeChosenTable chosenTable={localStorage.getItem("table")}/> 
                    </section> ) : (
                    <section className="tableImg">
                        <div className="placeHolder">
                            <img src={bookingImg} className="bookImg" alt="Book and pen."/>
                        </div>
                    </section>
                    )}
            <button id="blackButton" className="tableNextBtn" onClick={handleEdit}>Edit Information</button>
        </article>
    );
};

export default CheckBooking;