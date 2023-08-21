
const ConfirmBookingTitle = () => {
    const confirm_reserve = require("../../images/served_dinner_table.jpg");

    return (
        <div className="tableGrid" id="startBookingTitle">
            <div className="t_title_img">
                <img src={confirm_reserve} alt="Reserved table" className="reserve_table_img"/>
            </div>
            <div className="t_title_desc">
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