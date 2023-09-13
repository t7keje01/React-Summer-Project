import { Link } from "react-router-dom";

const BegingBookingTitle = () => {
    const mainReserve = require("../../images/reservation_main_image.jpg");

    const phoneLink = <Link className="contactLink" to="/">phone</Link>;
    const emailLink = <Link className="contactLink" to="/">email</Link>;

    return (
        <article className="tableGrid" id="startBookingTitle">
            <div className="largeTitleImg">
                <img src={mainReserve} alt="Arcade room" className="reservedTableImg"/>
            </div>
            <main className="altTitleDesc" aria-label="Reservation info">
                <h1>Make a Reservation Here!</h1>
                <p>The reservation will be held for 15 minutes from the appointed time, after which the reserved game will become available for other players.</p>
                <p>You can make a reservation in 30 min sections, up to 3 hours in total.</p>
                <p>Regarding reservations for more than eight people and/or 3 hours, please contact us via {phoneLink} or by {emailLink}!</p>
            </main>
        </article>
    );
};

export default BegingBookingTitle;