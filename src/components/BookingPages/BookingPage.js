import { useReducer, useState, useEffect } from "react";
import BookingForm from "./BookingForm";
import BegingBookingTitle from "./BeginBookingTitle";

const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_TIMES":
        return action.payload;
      case "INITIALIZE_TIMES":
        return action.payload;
      default:
        return state;
    }
  };

const BookingPage = () => {

    const initialTimes = [ 
        { 
            date: new Date('2023-08-18').toLocaleDateString(),
            id: "t1",
            time: "02.00 PM",
            maxGuests: 8,
            tableSituation: 1
        },
        { 
            date: new Date('2023-08-18').toLocaleDateString(),
            id: "t2",
            time: "06.00 PM",
            maxGuests: 8,
            tableSituation: 3
        },
        { 
            date: new Date('2023-08-18').toLocaleDateString(),
            id: "t3",
            time: "07.15 PM",
            maxGuests: 2,
            tableSituation: 2
        },
        {
            date: new Date('2023-08-22').toLocaleDateString(),
            id: "t4",
            time: "04.30 PM",
            maxGuests: 2,
            tableSituation: 1
        },
        { 
            date: new Date('2023-08-22').toLocaleDateString(),
            id: "t5",
            time: "06.45 PM",
            maxGuests: 2,
            tableSituation: 3
        },
        { 
            date: new Date('2023-08-22').toLocaleDateString(),
            id: "t6",
            time: "07:30 PM",
            maxGuests: 8,
            tableSituation: 3
        },
        { 
            date: new Date('2023-08-22').toLocaleDateString(),
            id: "t7",
            time: "08:00 PM",
            maxGuests: 6,
            tableSituation: 1
        },
        { 
            date: new Date('2023-08-23').toLocaleDateString(),
            id: "t8",
            time: "01.30 PM",
            maxGuests: 8,
            tableSituation: 2
        },
        { 
            date: new Date('2023-08-23').toLocaleDateString(),
            id: "t9",
            time: "02.15 PM",
            maxGuests: 6,
            tableSituation: 3
        },
        { 
            date: new Date('2023-08-23').toLocaleDateString(),
            id: "t10",
            time: "07:30 PM",
            maxGuests: 4,
            tableSituation: 3
        }
    ];
    
    const [availableTimes, dispatch] = useReducer(reducer, initialTimes);
    const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);
    console.log("Available Times on Page", availableTimes);
    console.log("Initial Times on Page", initialTimes);
    console.log("Filtered Times on Page", filteredTimeSlots)


    const updateTimes = () => {
        console.log("Function called.");
        console.log("Available Times on function", availableTimes);
        console.log("Filtered Times on function", filteredTimeSlots);

        if (availableTimes.length !== 0) {
        console.log("Is this working?");
        dispatch({ type: "UPDATE_TIMES", payload: filteredTimeSlots });
        }
        else {
            console.log("Condition not fulfilled.")
        }
    };

    const initializeTimes = () => {
        console.log("Initializer called.")
        dispatch({ type: "INITIALIZE_TIMES", payload: initialTimes });
    };

    return (
        <>
            <BegingBookingTitle/>
            <BookingForm 
                availableTimes={availableTimes}
                filteredTimeSlots={filteredTimeSlots}
                setFilteredTimeSlots={setFilteredTimeSlots}
                updateTimes={updateTimes}
                initializeTimes={initializeTimes}
            />
        </>
    );
};

export default BookingPage;