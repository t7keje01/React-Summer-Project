import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaClock, FaCalendarAlt, FaDice, FaStopwatch } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formBlurChecker } from "./formBlurChecker";


const BookingForm = (props) => {

    /* Props */
    const {
        availableDates,
        availableTimes,
        updateDates,
        updateTimes,
        submitForm
    } = props;


    /* Basic values */
    const maxPlayers = 8;
    const gameTypes = ["Billiards", "Snooker", "Air Hockey", "Skeeball", "Mario Kart", "Slot Machine", "Pinball"];
    const durations = [ "30 mins", "1 hour", "1.5 hours", "2 hours", "2,5 hours", "3 hours"]

    /* UseStates */
    const [selectedPlayers, setSelectedPlayers] = useState(0);
    const [selectedGame, setSelectedGame] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("");
    const [durationValue, setDurationValue] = useState(0);
    const [selectedDuration, setSelectedDuration] = useState("");
    const [canSubmit, setCanSubmit] = useState(false);

    /* Set up previous states for later use */
    const selectedPlayersPrev = usePrevious(selectedPlayers);
    const selectedGamePrev = usePrevious(selectedGame);
    const selectedDatePrev = usePrevious(selectedDate);
    const selectedTimePrev = usePrevious(selectedTime);
    const selectedDurationPrev = usePrevious(selectedDuration);


    /* Set up date to make it comparable */
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDateWithoutTime = new Date(selectedDate);
    selectedDateWithoutTime.setHours(0, 0, 0, 0);

    /* Handlers */
    const handleChanges = async (event, id, value) => {
    
        switch (id) {
        case "players":
            setSelectedPlayers(value);

            break;
        case "game":
            setSelectedGame(value);

            break;
        case "time":
            setSelectedTime(event.target.value);

            break;
        case "reservationDate":
            setSelectedDate(value);

            if (selectedDatePrev !== today.getTime() && selectedDatePrev !== undefined) {
                setSelectedTime('');
                setSelectedDuration('');
            }

            break;
        case "reservationDuration":
            setSelectedDuration(value);
            break;
        default:
            break;
        }
    };

    const handleSubmit = () => {
        const savedDate = selectedDate.toLocaleDateString();
        localStorage.setItem("players", selectedPlayers);
        localStorage.setItem("game", selectedGame);
        localStorage.setItem("date", savedDate);
        localStorage.setItem("time", selectedTime);
        localStorage.setItem("duration", selectedDuration);
        submitForm();
    }


    /* Functions */

    const canBeSubmitted = () => {
        const isValid =
            selectedPlayers !== 0 &&
            selectedGame.length > 0 &&
            selectedDateWithoutTime.getTime() !== today.getTime() &&
            selectedTime.length > 0 &&
            selectedDuration.length > 0;
        
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
    }, [selectedDuration])

    /*
    useEffect(() => {
        console.log("today",selectedDateWithoutTime)
        console.log("AvailableTimes", availableTimes)
        console.log("Selected Players (updated):", selectedPlayers);
        console.log("Selected Game (updated):", selectedGame);
        console.log("Selected Date (updated):", selectedDate);
        console.log("Selected Time (updated):", selectedTime);
        console.log("Selected Duration (updated):", selectedDuration);
    }, [selectedPlayers, selectedDate, selectedTime, selectedGame, availableTimes, selectedDuration]); */


    /* Update the filtered times when there has been a state change. */
    useEffect(() => {  
        if ( selectedPlayers > 0 && selectedGame !== "") {
            updateDates(selectedGame);
        }

        if (selectedPlayers > 0 && selectedGame.length > 0 && selectedDateWithoutTime.getTime() !== today.getTime()) {
            
            if (selectedPlayers !== selectedPlayersPrev || selectedGame !== selectedGamePrev || selectedDate !== selectedDatePrev) {
                updateTimes(selectedGame, selectedDate);
            }
        }

        if (availableTimes !== undefined) {
            const matchingDuration = availableTimes.find(item => item.time === selectedTime)?.duration;
            setDurationValue(matchingDuration);
        }

    }, [selectedPlayers, selectedDate, selectedGame, selectedTime]); 
    
    /* Validation */
    useEffect(() => {
        formBlurChecker();
    }, [selectedDate, selectedPlayers, selectedGame, selectedTime, selectedDuration]);
    
    return (
        <article className="tableGrid" id="tableGridContainer">

                <h2 className="titleForm">Reservation Details:</h2>
                <section className="tableForm">
                    <form className="formGrid" aria-label="Reservation information">
                        <label htmlFor="players" className="iconTitle" ><FaUsers size={28} alt="Person"/> Number of Players:</label>
                            <select id="players" className="formValidation" onChange={(event) => handleChanges(event, "players", parseInt(event.target.value))} data-testid="selectPlayers" required>
                                <option key="g0">Select players</option>
                                {[...Array(maxPlayers)].map((_, index) => (
                                    <option key={"g" + (index + 1)} value={index + 1} role="playerOption">{index + 1}</option>
                                ))}
                            </select>

                        <label htmlFor="game" className="iconTitle">
                            <FaDice size={28} alt="Game"/> Game:</label>
                            <select id="game" className="formValidation" onChange={(event) => handleChanges(event, "game", event.target.value)} data-testid="selectGame" required>
                                <option key={"gt" + 0}>Select a game</option>
                                {gameTypes.map((type, index) => (
                                    <React.Fragment key={"entry" + index}>
                                        <option key={"gt" + {index}}>{type}</option>
                                    </React.Fragment>
                                ))};
                            </select>

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
                        <select id="reservationTime" className="formValidation" value={selectedTime} onChange={(event) => handleChanges(event, "time", event.target.value)} 
                            aria-label="Lists the available times based on the chosen amount of players and date." data-testid="selectTime" required>
                            {selectedPlayers === 0 ? (
                                <option value="" disabled>Select players</option>
                            ) : (
                                selectedGame === "" ? (
                                    <option value="" disabled>Select a game</option>
                            ) : (
                                <>
                                    <option value="">Select a time</option>
                                    {availableTimes ? (
                                        availableTimes.map((item, index) => (
                                            <option key={"t" + index} value={item.time} data-testid="filteredTime">
                                                {item.time}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>Loading...</option>
                                    )}
                                </>
                            ))}
                        </select>

                        <label htmlFor="reservationDuration" className="iconTitle"><FaStopwatch size={28} alt="Stopwatch"/> Choose Duration:</label>
                        <select id="reservationDuration" className="formValidation" value={selectedDuration} onChange={(event) => handleChanges(event, "reservationDuration", event.target.value)} 
                            aria-label="Lists the available duration based on the chosen amount of players, date and time." data-testid="selectDuration" required>
                                {selectedPlayers === 0 ? (
                                    <option value="" disabled>Select players</option>
                                ) : (
                                    selectedGame.length === 0 ? (
                                        <option value="" disabled>Select a game</option>
                                    ) : (
                                        selectedTime.length === 0 ? (
                                            <option value="" disabled>Select a time</option>
                                        ) : (
                                            <>
                                                <option value="">Select duration</option>
                                                {durations.slice(0, durationValue).map((duration, index) => (
                                                    <option key={"d" + index} value={duration} data-testid="filteredDuration">
                                                        {duration}
                                                    </option>
                                                ))}
                                            </>
                                        )
                                    )
                                )}
                        </select>
                    </form>
                </section>
                <section className="tableImg">
                    <div className="placeHolder"/>
                </section>
            <div className="formButtons">
                <input 
                    type="submit" 
                    value={`Reserve for ${selectedTime}`} 
                    id="neonButton" 
                    className="tableNextBtn neonText" 
                    disabled={!canSubmit} 
                    aria-disabled={!canSubmit} 
                    onClick={handleSubmit}
                    data-testid="submit"
                ></input>
                <Link to="/" id="neonButtonVariant" className="tableCancelBtn neonTextVariant">Cancel Reservation</Link>
            </div>
        </article>
    );
};

export default BookingForm;