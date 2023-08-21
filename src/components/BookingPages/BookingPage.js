import { useEffect, useReducer, useState } from "react";
import BookingForm from "./BookingForm";
import BegingBookingTitle from "./BeginBookingTitle";

const today = '2023-08-25';

/* Commented out since using external URL to read data
const initialTimes = [ 
    {
        checkDate: '2023-08-25',
        targetDate: '2023-08-29',
        id: "t4",
        time: "04.30 PM",
        maxGuests: 2,
        tableSituation: 1
    },
    { 
        checkDate: '2023-08-25',
        targetDate: '2023-08-29',
        id: "t5",
        time: "06.45 PM",
        maxGuests: 2,
        tableSituation: 3
    },
    { 
        checkDate: '2023-08-25',
        targetDate: '2023-08-29',
        id: "t6",
        time: "07:30 PM",
        maxGuests: 8,
        tableSituation: 3
    },
    { 
        checkDate: '2023-08-25',
        targetDate: '2023-08-29',
        id: "t7",
        time: "08:00 PM",
        maxGuests: 6,
        tableSituation: 1
    },
    { 
        checkDate: '2023-08-25',
        targetDate: '2023-08-30',
        id: "t8",
        time: "01.30 PM",
        maxGuests: 8,
        tableSituation: 2
    },
    { 
        checkDate: '2023-08-25',
        targetDate: '2023-08-30',
        id: "t9",
        time: "02.15 PM",
        maxGuests: 6,
        tableSituation: 3
    },
    { 
        checkDate: '2023-08-25',
        targetDate: '2023-08-30',
        id: "t10",
        time: "07:30 PM",
        maxGuests: 4,
        tableSituation: 3
    },
    { 
        checkDate: '2023-08-25',
        targetDate: '2023-08-31',
        id: "t1",
        time: "02.00 PM",
        maxGuests: 8,
        tableSituation: 1
    },
    { 
        checkDate: '2023-08-25',
        targetDate: '2023-08-31',
        id: "t2",
        time: "06.00 PM",
        maxGuests: 8,
        tableSituation: 3
    },
    { 
        checkDate: '2023-08-25',
        targetDate: '2023-08-31',
        id: "t3",
        time: "07.15 PM",
        maxGuests: 2,
        tableSituation: 2
    }
]; */

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

    const fetchData = async (selectedDate, selectedGuests) => {
        const response =  await fetch("https://api.jsonbin.io/v3/b/64e2990e9d312622a39436ad");
        const json = await response.json();

        const filteredTimes = json.record.filter(item => 
            new Date(item.targetDate).toLocaleDateString() === new Date(selectedDate).toLocaleDateString() && item.maxGuests >= selectedGuests);

        return filteredTimes;
    };

    useEffect(() => {
        const timeLineUp = fetchData(today, 0);
        setInitialTimes(timeLineUp);

    }, []);

    const [initialTimes, setInitialTimes] = useState([]);
    const [availableTimes, dispatch] = useReducer(reducer, initialTimes);

    const updateTimes = async (selectedDate, selectedGuests) => {
        const updatedData = await fetchData(selectedDate, selectedGuests);
        dispatch({ type: "UPDATE_TIMES", payload: updatedData });
    };

    const initializeTimes = async (today) => {
        const initializedData  = await fetchData(today, 0);
        dispatch({ type: "INITIALIZE_TIMES", payload: initializedData });
    };

    return (
        <>
            <BegingBookingTitle/>
            <BookingForm 
                availableTimes={availableTimes}
                updateTimes={updateTimes}
                initializeTimes={initializeTimes}
            />
        </>
    );
};

export default BookingPage;