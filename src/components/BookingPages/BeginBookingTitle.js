import { Link } from "react-router-dom";

const BegingBookingTitle = () => {
    const main_reserve = require("../../images/reserve.png");

    const phone_link = <Link className="contact_link" to="/about/contact">phone</Link>;
    const email_link = <Link className="contact_link" to="/about/contact">email</Link>;

    return (
        <div className="tableGrid" id="startBookingTitle">
            <div className="t_title_img">
                <img src={main_reserve} alt="Reserved table" className="reserve_table_img"/>
            </div>
            <div className="t_title_desc">
                <h1>Reserve a table here!</h1>
                <p>The seats will be held for 15 minutes from the time of the reservation, after which the reserved seats will become available for other diners.</p>
                <p>Dinner reservations will last for 2 hours.</p>
                <p>For reservations for more than ten people, please contact us via {phone_link} or by {email_link}!</p>
            </div>
        </div>
    );
};

export default BegingBookingTitle;