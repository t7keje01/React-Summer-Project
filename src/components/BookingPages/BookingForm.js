import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaClock, FaCalendarAlt, FaChair, FaBirthdayCake } from 'react-icons/fa';
import TableSystem from "./TableSystem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = () => {

    const maxDiners = 8;
    const maxChairs = 4;

    const availableDates = [
        new Date('2023-08-18'),
        new Date('2023-08-22'),
        new Date('2023-08-23')
    ]

    const initialTimes = useMemo(() => [
        {
            date: new Date('2023-08-18').toLocaleDateString(),
            timeSlots: [
                { 
                    id: "t1",
                    time: "02.00 PM",
                    maxGuests: 8,
                    tableSituation: 1
                },
                { 
                    id: "t2",
                    time: "06.00 PM",
                    maxGuests: 8,
                    tableSituation: 3
                },
                { 
                    id: "t3",
                    time: "07.15 PM",
                    maxGuests: 2,
                    tableSituation: 2
                }
            ]
        },
        {
            date: new Date('2023-08-22').toLocaleDateString(),
            timeSlots: [
                { 
                    id: "t1",
                    time: "04.30 PM",
                    maxGuests: 2,
                    tableSituation: 1
                },
                { 
                    id: "t2",
                    time: "06.45 PM",
                    maxGuests: 2,
                    tableSituation: 3
                },
                { 
                    id: "t3",
                    time: "07:30 PM",
                    maxGuests: 8,
                    tableSituation: 3
                },
                { 
                    id: "t4",
                    time: "08:00 PM",
                    maxGuests: 6,
                    tableSituation: 1
                }
            ]
        },
        {
            date: new Date('2023-08-23').toLocaleDateString(),
            timeSlots: [
                { 
                    id: "t1",
                    time: "01.30 PM",
                    maxGuests: 8,
                    tableSituation: 2
                },
                { 
                    id: "t2",
                    time: "02.15 PM",
                    maxGuests: 6,
                    tableSituation: 3
                },
                { 
                    id: "t3",
                    time: "07:30 PM",
                    maxGuests: 4,
                    tableSituation: 3
                }
            ]
        }
    ], []);
    

    const [selectedGuests, setSelectedGuests] = useState(0);
    const [selectedChairs, setSelectedChairs] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredTimeSlots, setFilteredTimeSlots]  =useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedOccasion, setSelectedOccasion] = useState('');
    const [selectedTableSituation, setSelectedTableSituation] = useState('');
    const [chosenTable, setChosenTable] = useState("");
    const [canSubmit, setCanSubmit] = useState(false);
    const [checkboxState, setCheckboxState] = useState({
        isChairChecked: false,
        isOccasionChecked: false,
        isTableChecked: false,
      });


    const resetTables = () => {
        setCheckboxState(prevState => ({
          ...prevState,
          isTableChecked: false
        }));
        setChosenTable("");
      };

    const handleChanges = (event) => {
        const { id, value } = event.target;
    
        switch (id) {
        case "guests":
            setSelectedGuests(parseInt(value));
            resetTables();
            setSelectedTime('');
            break;
        case "chairs":
            setSelectedChairs(parseInt(value));
            break;
        case "res-date":
            setSelectedDate(value);
            resetTables();
            setSelectedTime('');
            break;
        case "res-time":
            setSelectedTime(event.target.value);
            const selectedTimeSlot = filteredTimeSlots.find((timeSlot) => timeSlot.time === value);
            if (selectedTimeSlot) {
              setSelectedTableSituation(selectedTimeSlot.tableSituation);
            }
            console.log('selected aika', selectedTime)
            break;
        case "occasion":
            setSelectedOccasion(value);
            break;
        default:
            break;
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

    const canBeSubmitted = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const selectedDateWithoutTime = new Date(selectedDate);

        selectedDateWithoutTime.setHours(0, 0, 0, 0);

        const isValid =
            selectedGuests !== 0 &&
            selectedDateWithoutTime.getTime() !== today.getTime() &&
            selectedTime.includes('M');
        
        setCanSubmit(isValid);
    };

    useEffect(() => {
        canBeSubmitted();
    })

    useEffect(() => {
        console.log("Selected Guests (updated):", selectedGuests);
        console.log("Selected Chairs (updated):", selectedChairs);
        console.log("Selected Date (updated):", selectedDate);
        console.log("Selected Time (updated):", selectedTime);
        console.log("Selected Occasion (updated):", selectedOccasion);
        console.log("Selected Table (updated):", chosenTable);
    }, [selectedGuests, selectedChairs, selectedDate, selectedTime, selectedOccasion, chosenTable]);

    useEffect(() => {
        const targetTimeSlots = initialTimes.find(item => item.date === selectedDate.toLocaleDateString());
      
        setFilteredTimeSlots(targetTimeSlots
          ? targetTimeSlots.timeSlots.filter((timeSlot) => timeSlot.maxGuests >= selectedGuests)
          : []);
      
      }, [selectedDate, initialTimes, selectedGuests]);


    return (
        <article className="tableGrid" id="tableGridContainer">

                <h2 className="title_form">Reservation Details:</h2>
                <section className="table_form">
                    <form className="form_grid">
                        <label htmlFor="guests" className="icon_title"><FaUsers size={28}/> Number of diners</label>
                        <select id="guests" onChange={handleChanges}>
                            <option></option>
                            {[...Array(maxDiners)].map((_, index) => (
                                <option key={index + 1}>{index + 1}</option>
                            ))}
                        </select>

                        <label>There will be a need for a children’s high chair:</label>
                        <input
                            type="checkbox"
                            name="isChairChecked"
                            checked={checkboxState.isChairChecked}
                            onChange={handleCheckboxChange}
                            />

                        {checkboxState.isChairChecked && <>
                            <label htmlFor="chairs" className="icon_title"><FaChair size={28}/> Number of chairs:</label>
                            <select id="chairs" onChange={handleChanges}>
                                <option></option>
                                {[...Array(maxChairs)].map((_, index) => (
                                    <option key={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                            </>}

                        <label htmlFor="res-date" className="icon_title"><FaCalendarAlt size={28}/> Choose date:</label>
                        <DatePicker 
                            className="dateContainer"
                            id="res-date"
                            selected={selectedDate}
                            minDate={new Date()}
                            onChange={(date) => handleChanges({ target: { id: "res-date", value: date } })} 
                            includeDates={availableDates}
                            highlightDates={availableDates}
                            placeholderText=""
                            withPortal
                        />

                        <label htmlFor="res-time" className="icon_title"><FaClock size={28}/> Choose time:</label>
                        <select id="res-time" value={selectedTime} onChange={handleChanges}>
                        <option></option>
                        {filteredTimeSlots.map((timeSlot) => (
                            <option key={timeSlot.id} value={timeSlot.time}>
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
                            />

                        {checkboxState.isOccasionChecked && <>
                            <label htmlFor="occasion" className="icon_title"><FaBirthdayCake size={28}/> Occasion</label>
                                <select id="occasion" onChange={handleChanges}>
                                    <option></option>
                                    <option>Birthday</option>
                                    <option>Anniversary</option>
                                    <option>Engagement</option>
                                    <option>Other</option>
                                </select></>}

                        <label>I want to choose my table:</label>
                        <input
                            id="tableCheckbox"
                            type="checkbox"
                            name="isTableChecked"
                            checked={checkboxState.isTableChecked}
                            onChange={handleCheckboxChange}
                            disabled={!canSubmit}
                            />
                        {checkboxState.isTableChecked ? (
                            <>
                                <label>You've chosen:</label>
                                <div>{chosenTable}</div>
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