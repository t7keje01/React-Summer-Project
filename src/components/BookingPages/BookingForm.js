import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaClock, FaCalendarAlt, FaChair, FaBirthdayCake } from 'react-icons/fa';
import TableSystem from "./TableSystem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formBlurChecker } from "./formBlurChecker";


const BookingForm = (props) => {

    /* Props */
    const {
        availableTimes,
        updateTimes,
        initializeTimes,
        submitForm
    } = props;


    /* Basic values */
    const maxDiners = 8;
    const [maxChairs, setMaxChairs] = useState(3);

    const availableDates = [
        new Date('2023-09-06'),
        new Date('2023-09-07'),
        new Date('2023-09-08')
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
    const [disableElement, setDisableElement] = useState(true);
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
        case "reservationDate":
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

    const handleSubmit = () => {
        const savedDate = selectedDate.toLocaleDateString();
        localStorage.setItem("guests", selectedGuests);
        localStorage.setItem("chairs", selectedChairs);
        localStorage.setItem("date", savedDate);
        localStorage.setItem("time", selectedTime);
        localStorage.setItem("occasion", selectedOccasion);
        localStorage.setItem("table", chosenTable);
        submitForm();
    }


    /* Functions */

    const resetTables = () => {
        setCheckboxState(prevState => ({
          ...prevState,
          isTableChecked: false
        }));
        setChosenTable("");
      };

    const canBeSubmitted = () => {
        const isValid =
            selectedGuests !== 0 &&
            selectedDateWithoutTime.getTime() !== today.getTime() &&
            selectedTime.length > 0;
        
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

    /*
    useEffect(() => {
        if (formSubmitted && editRequested) {
            setSelectedGuests(reservationData.guests);
            if (reservationData.chairs !== "") {
                handleCheckboxChange({
                    target: { name: "isChairChecked", checked: true },
                });
                setSelectedChairs(reservationData.chairs);
            }
            setSelectedDate(reservationData.date);
            setSelectedTime(reservationData.time);
            if (reservationData.occasion !== "") {
                handleCheckboxChange({
                    target: { name: "isOccasionChecked", checked: true },
                });
                setSelectedOccasion(reservationData.occasion);
            }

            setStateUpdated(true);
            setEditRequested(false);
        }
    }, [editRequested]) */

    /* Button disabling validation */
    useEffect(() => {
        canBeSubmitted();
    }, [selectedTime])

    /*
    useEffect(() => {
        console.log("today",selectedDateWithoutTime)
        console.log("AvailableTimes", availableTimes)
        console.log("Selected Guests (updated):", selectedGuests);
        console.log("Selected Chairs (updated):", selectedChairs);
        console.log("Selected Date (updated):", selectedDate);
        console.log("Selected Time (updated):", selectedTime);
        console.log("Selected Occasion (updated):", selectedOccasion);
        console.log("Selected Table (updated):", chosenTable);
    }, [selectedGuests, selectedChairs, selectedDate, selectedTime, selectedOccasion, chosenTable, availableTimes]); */


    /* Manage the chairs so an unreasonable amount can't be reserved. Also update the filtered times when there has been a state change. */
    useEffect(() => {  
        if (selectedGuests <= maxChairs && selectedGuests !== 0) {
            setMaxChairs(selectedGuests - 1);
        }

        if(selectedGuests === 1) {
            setDisableElement(false);
            handleCheckboxChange({
                target: { name: "isChairChecked", checked: false },
            });
        }
        else {
            setDisableElement(true);
        }

        if (selectedGuests.length !== 0 && selectedDateWithoutTime.getTime() !== today.getTime()) {
            if (selectedGuests !== selectedGuestsPrev || selectedDate !== selectedDatePrev) {
                updateTimes(selectedDate, selectedGuests);
            }
        }

    }, [selectedGuests, selectedDate]); 
    
    /* Validation */
    useEffect(() => {
        formBlurChecker();
    }, [selectedDate, selectedGuests, selectedTime]);
    
    return (
        <article className="tableGrid" id="tableGridContainer">

                <h2 className="titleForm">Reservation Details:</h2>
                <section className="tableForm">
                    <form className="formGrid" aria-label="Reservation information">
                        <label htmlFor="guests" className="iconTitle" ><FaUsers size={28} alt="Person"/> Number of Diners:</label>
                            <select id="guests" className="formValidation" onChange={(event) => handleChanges(event, "guests", parseInt(event.target.value))} data-testid="selectGuests" required>
                                <option key="g0">Select number</option>
                                {[...Array(maxDiners)].map((_, index) => (
                                    <option key={"g" + (index + 1)} value={index + 1} role="guestOption">{index + 1}</option>
                                ))}
                            </select>

                        <label htmlFor="chairCheckbox">There will be a need for a children’s high chair:</label>
                        <input
                            id="chairCheckbox"
                            type="checkbox"
                            name="isChairChecked"
                            disabled={!disableElement}
                            checked={checkboxState.isChairChecked}
                            onChange={handleCheckboxChange}
                            aria-checked={checkboxState.isChairChecked}
                            aria-label="Optional checkbox"
                            aria-disabled={!disableElement}
                            />

                        {checkboxState.isChairChecked && <>
                            <label htmlFor="chairs" className="iconTitle"><FaChair size={28} alt="Chair"/> Number of Chairs:</label>
                            <select id="chairs" onChange={(event) => handleChanges(event, "chairs", parseInt(event.target.value))}>
                                <option key="c0"></option>
                                {[...Array(maxChairs)].map((_, index) => (
                                    <option key={"c" + index + 1}>{index + 1}</option>
                                ))}
                            </select>
                            </>}

                        <label htmlFor="reservationDate" className="iconTitle" aria-label="Calender with available dates highlighted.">
                            <FaCalendarAlt size={28} alt="Calendar"/> Choose Date:</label>
                        <DatePicker 
                            className="formValidation" 
                            id="reservationDate"
                            selected={selectedDate}
                            minDate={new Date()}
                            onChange={(date) => handleChanges(null, "reservationDate", date)}
                            includeDates={availableDates}
                            highlightDates={availableDates}
                            withPortal
                            required
                        />

                        <label htmlFor="reservationTime" className="iconTitle"><FaClock size={28} alt="Clock"/> Choose Time:</label>
                        <select id="reservationTime" className="formValidation" value={selectedTime} onChange={handleTimeChanges} 
                            aria-label="Lists the available times based on the chosen amount of diners and date." data-testid="selectTime" required>
                            {selectedGuests === 0 ? (
                                <option value="" disabled>Guests not chosen yet</option>
                            ) :
                            availableTimes.length === 0 || availableTimes.length > 8 ? (
                                <option value="" disabled>No Available Times</option>
                            ) : (
                                <>
                                    <option value="">Select a time</option>
                                    {availableTimes.map((timeSlot, index) => (
                                    <option key={"t" + index} value={timeSlot.time}>
                                        {timeSlot.time}
                                    </option>
                                    ))}
                                </>
                            )}
                        </select>

                        <label htmlFor="occasionCheckbox">There will be a special occasion:</label>
                        <input
                            id="occasionCheckbox"
                            type="checkbox"
                            name="isOccasionChecked"
                            checked={checkboxState.isOccasionChecked}
                            onChange={handleCheckboxChange}
                            aria-checked={checkboxState.isOccasionChecked}
                            aria-label="Optional checkbox"
                            />

                        {checkboxState.isOccasionChecked && <>
                            <label htmlFor="occasion" className="iconTitle">
                                <FaBirthdayCake size={28} alt="Cake"/> Occasion</label>
                                <select id="occasion" onChange={(event) => handleChanges(event, "occasion", event.target.value)}>
                                    <option key="o1"></option>
                                    <option key="o2">Birthday</option>
                                    <option key="o3">Anniversary</option>
                                    <option key="o4">Engagement</option>
                                    <option key="o5">Other</option>
                                </select></>}

                        <label htmlFor="tableCheckbox">I want to choose my table:</label>
                        <input
                            id="tableCheckbox"
                            type="checkbox"
                            name="isTableChecked"
                            checked={checkboxState.isTableChecked}
                            onChange={handleCheckboxChange}
                            disabled={!canSubmit}
                            aria-label="Optional checkbox for manual table selection"
                            aria-checked={checkboxState.isTableChecked}
                            aria-disabled={!canSubmit}
                            />

                        {checkboxState.isTableChecked ? (
                            <>
                                <div id="showTable" role="heading" aria-level="2" aria-label="Chosen Table">You've chosen:</div>
                                <div id="table" aria-label="Show chosen table">{chosenTable}</div>
                            </>
                        ) : null}
                    </form>
                </section>
                {checkboxState.isTableChecked ? (
                    <section className="tableImg">
                        <TableSystem 
                            selectedGuests={selectedGuests}
                            tableSetIndex={selectedTableSituation} 
                            onTableSelect={handleTableSelect}
                        />
                    </section>
                ) : (
                    <section className="tableImg">
                        <div className="placeHolder"/>
                    </section>
                )}
            <input 
                type="submit" 
                value={`Reserve table for ${selectedTime}`} 
                id="blackButton" 
                className="tableNextBtn" 
                disabled={!canSubmit} 
                onClick={handleSubmit}
                data-testid="submit"
            ></input>
            <Link to="/" id="greyButton" className="tableCancelBtn">Cancel Reservation</Link>
        </article>
    );
};

export default BookingForm;