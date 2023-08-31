import { Link } from "react-router-dom";

const ConfirmedBooking = (props) => {

    const {
        setStepWithAction
    } = props;

    const handleStepReset = () => {
        setStepWithAction(1);
    }

    const successfulReservation = require("../../images/welcome_sign.png");

    return (
        <div className="tableGrid" id="finishBooking">
            <div className="largeTitleImg">
                <img src={successfulReservation} alt="Reserved table" className="reservedTableImg"/>
            </div>
            <div className="altTitleDesc" aria-label="Reservation info">
                <h1>Table has been reserved!</h1>
                <p>You have successfully reserved a table at our reservation. 
                    You will be receiving a confirmation email within an hour to the email you’ve provided. Please be sure to check the Junk Mailbox just in case!</p>
                <p>If you didn’t receive a confirmation email even after a day, please contact us so we may confirm that the table was reserved as intended.</p>
                <p>We will be sure to contact you back if there is a need to confirm something regarding the comment section!</p>
                <p>Thank you for your reservation and we welcome you warmly to our restaurant!</p>
            </div>
            <Link to="/reservations" id="blackButton" className="tableNextBtn" onClick={handleStepReset}>Make Another Reservation</Link>
            <Link to="/" id="greyButton" className="tableCancelBtn" onClick={handleStepReset}>Return to Homepage</Link>
        </div>
    );
};

export default ConfirmedBooking;