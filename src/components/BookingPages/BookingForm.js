import { useState } from "react";

const BookingForm = () => {

    const [checkboxState, setCheckboxState] = useState({
        isChairChecked: false,
        isOccasionChecked: false,
        isTableChecked: false,
      });
    
    const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxState((prevState) => ({
        ...prevState,
        [name]: checked,
    }));
    };

    const availableTimes = [ {
        id: "time1",
    },
    ]

    const TableSystem = () => {
        return (
            <div className="table_img">There will be buttons</div>
        );
    };

    return (
        <article>
            <div className="tableGrid">
            <h2 className="title_form">Reservation Details:</h2>
            <section className="table_form">
                <form className="form_grid">
                    <label htmlFor="guests">Number of guests</label>
                    <input type="number" placeholder="1" min="1" max="8" id="guests" />

                    <label>There will be a need for a children’s high chair</label>
                    <input
                        type="checkbox"
                        name="isChairChecked"
                        checked={checkboxState.isChairChecked}
                        onChange={handleCheckboxChange}
                        />

                    {checkboxState.isChairChecked && <>
                        <label htmlFor="chairs">Number of chairs</label>
                        <input type="number" placeholder="1" min="1" max="4" id="chairs" /></>}

                    <label htmlFor="res-date">Choose date</label>
                    <input type="date" id="res-date" />

                    <label htmlFor="res-time">Choose time</label>
                    <select id="res-time">
                        <option>17:00</option>
                        <option>18:00</option>
                        <option>19:00</option>
                        <option>20:00</option>
                        <option>21:00</option>
                        <option>22:00</option>
                    </select>

                    <label>There will be a special occasion</label>
                    <input
                        type="checkbox"
                        name="isOccasionChecked"
                        checked={checkboxState.isOccasionChecked}
                        onChange={handleCheckboxChange}
                        />

                    {checkboxState.isOccasionChecked && <>
                        <label htmlFor="occasion">Occasion</label>
                            <select id="occasion">
                                <option>Birthday</option>
                                <option>Anniversary</option>
                                <option>Engagement</option>
                                <option>Other</option>
                            </select></>}

                    <label>I want to choose my table</label>
                    <input
                        type="checkbox"
                        name="isTableChecked"
                        checked={checkboxState.isTableChecked}
                        onChange={handleCheckboxChange}
                        />

                    <input type="submit" value="Make Your reservation" />
                </form>
            </section>
            {checkboxState.isTableChecked && ( <>
                <TableSystem/></>)}
            </div>
        </article>
    );
};

export default BookingForm;