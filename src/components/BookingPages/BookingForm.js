import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaClock, FaCalendarAlt, FaChair, FaBirthdayCake } from 'react-icons/fa';
import TableSystem from "./TableSystem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const BookingForm = (props) => {

    /* Props */
    const {
        availableTimes,
        filteredTimeSlots,
        setFilteredTimeSlots, 
        updateTimes,
        initializeTimes
    } = props;


    /* Basic values */
    const maxDiners = 8;
    const maxChairs = 4;

    const availableDates = [
        new Date('2023-08-22'),
        new Date('2023-08-23'),
        new Date('2023-08-31')
    ]


    /* UseStates */
    const [selectedGuests, setSelectedGuests] = useState(0);
    const [selectedChairs, setSelectedChairs] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedOccasion, setSelectedOccasion] = useState('');
    const [selectedTableSituation, setSelectedTableSituation] = useState('');
    const [chosenTable, setChosenTable] = useState("");
    const [canSubmit, setCanSubmit] = useState(false);
    const [checkboxState, setCheckboxState] = useState({
        isChairChecked: false,
        isOccasionChecked: false,
        isTableChecked: false,
      });

    /* Set up previous states for later use */
    const selectedGuestsPrev = usePrevious(selectedGuests);
    const selectedDatePrev = usePrevious(selectedDate);

    /* Set up date to make it comparable */
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDateWithoutTime = new Date(selectedDate);
    selectedDateWithoutTime.setHours(0, 0, 0, 0);


    /* Handlers */
    const handleChanges = async (event, id, value) => {
    
        switch (id) {
        case "guests":
            setSelectedGuests(value);

            if (selectedGuestsPrev !== undefined) {
                initializeTimes();
                setSelectedTime('');
            }
            resetTables();
            break;

        case "chairs":
            setSelectedChairs(value);

            break;
        case "res-date":
            setSelectedDate(value);

            if (selectedDatePrev !== today.getTime() && selectedDatePrev !== undefined) {
                initializeTimes();
                setSelectedTime('');
            }
            resetTables();

            break;
        case "occasion":
            setSelectedOccasion(value);

            break;
        default:
            break;
        }
    };

    const handleTimeChanges = (event) => {
        setSelectedTime(event.target.value);

        const selectedTimeSlot = availableTimes.find(item => item.time === event.target.value);
        if (selectedTimeSlot) {
            setSelectedTableSituation(selectedTimeSlot.tableSituation);
        } else {
            setSelectedTableSituation(null);
        }
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (name === "isTableChecked" && !checked) {
            setChosenTable("");
        }

        setCheckboxState((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const handleTableSelect = (selectedTable) => {
        setChosenTable(selectedTable);
    };


    /* Functions */

    const resetTables = () => {
        setCheckboxState(prevState => ({
          ...prevState,
          isTableChecked: false
        }));
        setChosenTable("");
      };

    const updateFilteredTimes = () => {
        const filteredTimes = availableTimes.filter(item => 
            item.date === selectedDate.toLocaleDateString() && item.maxGuests >= selectedGuests);

        setFilteredTimeSlots(filteredTimes);
    }

    const canBeSubmitted = () => {
        const isValid =
            selectedGuests !== 0 &&
            selectedDateWithoutTime.getTime() !== today.getTime() &&
            selectedTime.includes('M');
        
        setCanSubmit(isValid);
    };


    /* Allows the tracking of the previous states */
    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        }, [value]);
        return ref.current;
      }


    /* UseEffects */

    /* Button disabling validation */
    useEffect(() => {
        canBeSubmitted();
    }, [selectedTime])

    /* Can be used to track states.
    useEffect(() => {
        console.log("AvailableTimes", availableTimes)
        console.log("filtered", filteredTimeSlots)
        console.log("Selected Guests (updated):", selectedGuests);
        console.log("Selected Chairs (updated):", selectedChairs);
        console.log("Selected Date (updated):", selectedDate);
        console.log("Selected Time (updated):", selectedTime);
        console.log("Selected Occasion (updated):", selectedOccasion);
        console.log("Selected Table (updated):", chosenTable);
    }, [selectedGuests, selectedChairs, selectedDate, selectedTime, selectedOccasion, chosenTable, availableTimes, filteredTimeSlots]); */


    /* Update the filtered times when there has been a state change. */
    useEffect(() => {    
        if (selectedGuests.length !== 0 && selectedDateWithoutTime.getTime() !== today.getTime()) {
            if (selectedGuests !== selectedGuestsPrev || selectedDate !== selectedDatePrev) {
                updateFilteredTimes();
            }
        }

    }, [selectedGuests, selectedDate]);    

    /* Check that there are values in the filteredTimeSlots */
    useEffect(() => {
            
        if (filteredTimeSlots.length > 0) {
            updateTimes();
        }
    }, [filteredTimeSlots])
    
    return (
        <article className="tableGrid" id="tableGridContainer">

                <h2 className="title_form">Reservation Details:</h2>
                <section className="table_form">
                    <form className="form_grid">
                        <label htmlFor="guests" className="icon_title" ><FaUsers size={28}/> Number of diners</label>
                            <select id="guests" onChange={(event) => handleChanges(event, "guests", parseInt(event.target.value))} data-testid="select-guests">
                                <option key="g0"></option>
                                {[...Array(maxDiners)].map((_, index) => (
                                    <option key={"g" + (index + 1)} value={index + 1} role="guestOption">{index + 1}</option>
                                ))}
                            </select>

                        <label>There will be a need for a children’s high chair:</label>
                        <input
                            type="checkbox"
                            name="isChairChecked"
                            checked={checkboxState.isChairChecked}
                            onChange={handleCheckboxChange}
                            aria-checked={checkboxState.isChairChecked}
                            aria-label="This is an optional checkbox"
                            />

                        {checkboxState.isChairChecked && <>
                            <label htmlFor="chairs" className="icon_title"><FaChair size={28}/> Number of chairs:</label>
                            <select id="chairs" onChange={(event) => handleChanges(event, "chairs", parseInt(event.target.value))}>
                                <option key="c0"></option>
                                {[...Array(maxChairs)].map((_, index) => (
                                    <option key={"c" + index + 1}>{index + 1}</option>
                                ))}
                            </select>
                            </>}

                        <label htmlFor="res-date" className="icon_title" aria-label="Shows a calender with available dates highlighted.">
                            <FaCalendarAlt size={28}/> Choose date:</label>
                        <DatePicker 
                            className="dateContainer"
                            id="res-date"
                            selected={selectedDate}
                            minDate={new Date()}
                            onChange={(date) => handleChanges(null, "res-date", date)}
                            includeDates={availableDates}
                            highlightDates={availableDates}
                            placeholderText=""
                            withPortal
                        />

                        <label htmlFor="res-time" className="icon_title"><FaClock size={28}/> Choose time:</label>
                        <select id="res-time" value={selectedTime} onChange={handleTimeChanges} 
                            aria-label="Lists the available times based on the chosen amount of diners and date.">
                            <option key="t0"></option>
                            {availableTimes.map((timeSlot, index) => (
                                <option key={"t" + index + 1} value={timeSlot.time}>
                                {timeSlot.time}
                                </option>
                            ))}
                        </select>

                        <label>There will be a special occasion:</label>
                        <input
                            type="checkbox"
                            name="isOccasionChecked"
                            checked={checkboxState.isOccasionChecked}
                            onChange={handleCheckboxChange}
                            aria-checked={checkboxState.isOccasionChecked}
                            aria-label="This is an optional checkbox"
                            />

                        {checkboxState.isOccasionChecked && <>
                            <label htmlFor="occasion" className="icon_title" aria-label="List of possible occasions with the option to choose 'others' if none of them fit.">
                                <FaBirthdayCake size={28}/> Occasion</label>
                                <select id="occasion" onChange={(event) => handleChanges(event, "occasion", event.target.value)}>
                                    <option key="o1"></option>
                                    <option key="o2">Birthday</option>
                                    <option key="o3">Anniversary</option>
                                    <option key="o4">Engagement</option>
                                    <option key="o5">Other</option>
                                </select></>}

                        <label>I want to choose my table:</label>
                        <input
                            id="tableCheckbox"
                            type="checkbox"
                            name="isTableChecked"
                            checked={checkboxState.isTableChecked}
                            onChange={handleCheckboxChange}
                            disabled={!canSubmit}
                            aria-label="An optional checkbox that allows to manually select a table when the amount of diners, date and time have already been chosen."
                            aria-checked={checkboxState.isTableChecked}
                            aria-disabled={!canSubmit}
                            />

                        {checkboxState.isTableChecked ? (
                            <>
                                <label>You've chosen:</label>
                                <div aria-label="Shows the chosen table with the table and number.">{chosenTable}</div>
                            </>
                        ) : null}
                    </form>
                </section>
                {checkboxState.isTableChecked ? (
                    <section className="table_img">
                        <TableSystem 
                            selectedGuests={selectedGuests}
                            tableSetIndex={selectedTableSituation} 
                            onTableSelect={handleTableSelect}
                        />
                    </section>
                ) : (
                    <section className="table_img">
                        <div className="place_holder"/>
                    </section>
                )}
            <input type="submit" value={`Reserve table for ${selectedTime}`} id="blackButton" className="table_next" disabled={!canSubmit}></input>
            <Link to="/" id="greyButton" className="table_canc">Cancel Reservation</Link>
        </article>
    );
};

export default BookingForm;