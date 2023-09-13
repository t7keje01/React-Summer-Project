
const ConfirmBookingTitle = () => {
    const confirmReservation = require("../../images/arcade_screen.png");

    return (
        <div className="tableGrid" id="startBookingTitle">
            <div className="largeTitleImg">
                <img src={confirmReservation} alt="Arcade screen" className="reservedTableImg"/>
            </div>
            <div className="altTitleDesc" aria-label="Reservation info">
                <h1>Confirm your reservation!</h1>
                <p>Please inform us if you have any inquieries or questions in the comment section.</p>
                <p>The reservation will become valid after you have confirmed the reservation and have received a confirmation via email.</p>
            </div>
        </div>
    );
};

export default ConfirmBookingTitle;