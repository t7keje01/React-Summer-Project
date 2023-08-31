
const ConfirmBookingTitle = () => {
    const confirmReservation = require("../../images/served_dinner_table.jpg");

    return (
        <div className="tableGrid" id="startBookingTitle">
            <div className="largeTitleImg">
                <img src={confirmReservation} alt="Reserved table" className="reservedTableImg"/>
            </div>
            <div className="altTitleDesc" aria-label="Reservation info">
                <h1>Confirm your reservation!</h1>
                <p>Please inform us for possible allergies or special diets on the comment section.</p>
                <p>If you’ve chosen the Occasion section, please provide us with further information on the comment section.
                    We might not be able to fulfill all requests and we might need to contact you back regarding potential arrangements.</p>
                <p>The reservation will become valid after you have confirmed the reservation and have received a confirmation via email.</p>
            </div>
        </div>
    );
};

export default ConfirmBookingTitle;