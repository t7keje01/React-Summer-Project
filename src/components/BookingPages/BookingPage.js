import { useEffect, useReducer, useState } from "react";
import BookingForm from "./BookingForm";
import BegingBookingTitle from "./BeginBookingTitle";
import ConfirmBookingTitle from "./ConfirmBookingTitle";
import CheckBooking from "./CheckBooking";
import AddContactsForm from "./AddContacsForm";
import ConfirmedBooking from "./ConfirmedBooking"

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

    const jsonStructure = {
        guests: null,
        chairs: null,
        date: null,
        time: null,
        occasion: null,
        table: null,
        tableset: null,
        firstName: null,
        lastName: null,
        phone: null,
        email: null,
        comment: null
    }

    const [reservationData, setReservationData] = useState(jsonStructure);
    const [step, setStep] = useState(1);
    const [editRequested, setEditRequested] = useState(false);
    const [initialTimes, setInitialTimes] = useState([]);
    const [availableTimes, dispatch] = useReducer(reducer, initialTimes);

    /* Fetch the available times from an external source */
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

    /* Functions regarding the reducer */
    const updateTimes = async (selectedDate, selectedGuests) => {
        const updatedData = await fetchData(selectedDate, selectedGuests);
        dispatch({ type: "UPDATE_TIMES", payload: updatedData });
    };

    const initializeTimes = async (today) => {
        const initializedData  = await fetchData(today, 0);
        dispatch({ type: "INITIALIZE_TIMES", payload: initializedData });
    };

    /* Submit form functionalities */
    const addContactDetails = ({ firstName, lastName, phone, email, comment }) => {
        setReservationData((prevData) => ({
            ...prevData,
            firstName,
            lastName,
            phone,
            email,
            comment,
        }));
    };

    useEffect(() => {  
        console.log("Check current status of reservationData", reservationData)
        if (reservationData.time !== null || reservationData.firstName !== null) { 
            submitForm();
        }

    }, [reservationData.time, reservationData.firstName]);  

    useEffect(() => {  
        window.scrollTo(0, 0)
    }, [setStep]);  

    const submitForm = async () => {
        console.log(reservationData);
        const arrayDate = reservationData.date;
        const formattedDate = new Date(arrayDate.getFullYear(), arrayDate.getMonth(), arrayDate.getDate()).toLocaleDateString();

        const url = "https://api.jsonbin.io/v3/b/64e2b4158e4aa6225ed30a86"; 
        const apiKey = "$2b$10$Ljhgzqti8Dc8Lhsz.q9YtOyirnzzzjki4lRP8wnqJs.FdyV/GgZCW"; 

        const sendData = {
            "numberOfDiners": reservationData.guests,
            "numberOfChairs": reservationData.chairs,
            "reservationDate": formattedDate,
            "reservationTime": reservationData.time,
            "specialOccasion": reservationData.occasion,
            "selectedTable": reservationData.table,
            "selectedTableSet": reservationData.tableset,
            "firstName": reservationData.firstName,
            "lastName": reservationData.lastName,
            "phoneNumber": reservationData.phone,
            "emailAddress": reservationData.email,
            "reservationComment": reservationData.comment
        };

        const headers = {
        "Content-Type": "application/json",
        "X-Master-Key": apiKey
        };

        fetch(url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(sendData)
        })
        .then(response => response.json())
        .then(sendData => {
            console.log(sendData);
            setStep(step + 1);
        })
        .catch(error => {
            console.error(error);
        });

    };

    return (
        <>
            {step === 1 ? (
                <>
                    <BegingBookingTitle/>
                    <BookingForm 
                        availableTimes={availableTimes}
                        updateTimes={updateTimes}
                        initializeTimes={initializeTimes}
                        setReservationData={setReservationData}
                        reservationData={reservationData}
                        editRequested={editRequested}
                        setEditRequested={setEditRequested}
                    />
                </>
            ) : step === 2 ? (
                <>
                    <ConfirmBookingTitle/>
                    <CheckBooking
                        reservationData={reservationData}
                        setStep={setStep}
                        setEditRequested={setEditRequested}
                    />
                    <AddContactsForm
                        addContactDetails={addContactDetails}
                        submitForm={submitForm}/>
                </>
            ) : step === 3 ? (
                <>
                    <ConfirmedBooking/>
                </>
            ) : null }
        </>
    );
};

export default BookingPage;