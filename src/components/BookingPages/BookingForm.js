import { useState, useEffect } from "react";
import TableSystem from "./TableSystem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = () => {

    const maxDiners = 8;
    const maxChairs = 4;
    const availableDates = [new Date('2023-08-18'), new Date('2023-08-22'), new Date('2023-08-23')];

    const initialTimes = {
        '2023-08-18': [
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
            },
        ],
        '2023-08-22': [
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
            },
        ],
        '2023-08-23': [
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
            },
        ]
    }

    const [selectedGuests, setSelectedGuests] = useState();
    const [selectedChairs, setSelectedChairs] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date()); 
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedOccasion, setSelectedOccasion] = useState('');
    const [selectedTableSituation, setSelectedTableSituation] = useState('');
    const [chosenTable, setChosenTable] = useState("");
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
            break;
        case "chairs":
            setSelectedChairs(parseInt(value));
            break;
        case "res-date":
            setSelectedDate(value);
            resetTables();
            break;
        case "res-time":
            const selectedTimeValue = event.target.value;
            setSelectedTime(selectedTimeValue);
        
            const selectedOption = initialTimes[selectedDate.toISOString().split('T')[0]]
              .find((tm) => tm.time === selectedTimeValue);
        
            setSelectedTableSituation(selectedOption.tableSituation);
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

    useEffect(() => {
        console.log("Selected Guests (updated):", selectedGuests);
        console.log("Selected Chairs (updated):", selectedChairs);
        console.log("Selected Date (updated):", selectedDate);
        console.log("Selected Time (updated):", selectedTime);
        console.log("Selected Occasion (updated):", selectedOccasion);
        console.log("Selected Table (updated):", chosenTable);
    }, [selectedGuests, selectedChairs, selectedDate, selectedTime, selectedOccasion, chosenTable]);
    
    return (
        <article>
            <div className="tableGrid">
            <h2 className="title_form">Reservation Details:</h2>
            <section className="table_form">
                <form className="form_grid">
                    <label htmlFor="guests">Number of guests</label>
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
                        <label htmlFor="chairs">Number of chairs</label>
                        <select id="chairs" onChange={handleChanges}>
                            <option></option>
                            {[...Array(maxChairs)].map((_, index) => (
                                <option key={index + 1}>{index + 1}</option>
                            ))}
                        </select>
                        </>}

                    <label htmlFor="res-date">Choose date</label>
                    <DatePicker 
                        id="res-date"
                        selected={selectedDate} 
                        minDate={new Date()}
                        onChange={(date) => handleChanges({ target: { id: "res-date", value: date } })} 
                        includeDates={availableDates}
                        highlightDates={availableDates}
                        withPortal
                    />

                    <label htmlFor="res-time">Choose time</label>
                    <select id="res-time" value={selectedTime} onChange={handleChanges}>
                        <option></option>
                        {selectedDate && initialTimes[selectedDate.toISOString().split('T')[0]] ? (
                            initialTimes[selectedDate.toISOString().split('T')[0]]
                                .filter((tm) => tm.maxGuests >= selectedGuests)
                                .map((tm) => (
                                    <option key={tm.id} value={tm.time}>
                                        {tm.time}
                                    </option>
                                ))
                        ) : (
                            <option value="">Select a date first</option>
                        )}
                    </select>

                    <label>There will be a special occasion:</label>
                    <input
                        type="checkbox"
                        name="isOccasionChecked"
                        checked={checkboxState.isOccasionChecked}
                        onChange={handleCheckboxChange}
                        />

                    {checkboxState.isOccasionChecked && <>
                        <label htmlFor="occasion">Occasion</label>
                            <select id="occasion" onChange={handleChanges}>
                                <option></option>
                                <option>Birthday</option>
                                <option>Anniversary</option>
                                <option>Engagement</option>
                                <option>Other</option>
                            </select></>}

                    <label>I want to choose my table:</label>
                    <input
                        type="checkbox"
                        name="isTableChecked"
                        checked={checkboxState.isTableChecked}
                        onChange={handleCheckboxChange}
                        />
                    {checkboxState.isTableChecked ? (
                        <>
                            <div>You've chosen:</div>
                            <div>{chosenTable}</div>
                        </>
                    ) : null}

                    <input type="submit" value="Make Your reservation" />
                </form>
            </section>
            {checkboxState.isTableChecked && ( <>
                <TableSystem 
                    tableSetIndex={selectedTableSituation} 
                    onTableSelect={handleTableSelect}
                /></>)}
            </div>
        </article>
    );
};

export default BookingForm;