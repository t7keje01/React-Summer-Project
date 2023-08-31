import { Link } from "react-router-dom";

const BegingBookingTitle = () => {
    const mainReserve = require("../../images/reserve.png");

    const phoneLink = <Link className="contactLink" to="/about/contact">phone</Link>;
    const emailLink = <Link className="contactLink" to="/about/contact">email</Link>;

    return (
        <div className="tableGrid" id="startBookingTitle">
            <div className="largeTitleImg">
                <img src={mainReserve} alt="Reserved table" className="reservedTableImg"/>
            </div>
            <div className="altTitleDesc" aria-label="Reservation info">
                <h1>Reserve a table here!</h1>
                <p>The seats will be held for 15 minutes from the time of the reservation, after which the reserved seats will become available for other diners.</p>
                <p>Dinner reservations will last for 2 hours.</p>
                <p>For reservations for more than ten people, please contact us via {phoneLink} or by {emailLink}!</p>
            </div>
        </div>
    );
};

export default BegingBookingTitle;