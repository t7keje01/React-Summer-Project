import { useEffect, useReducer, useState } from "react";
import { fetchData } from "./fetchData";
import BookingForm from "./BookingForm";
import BegingBookingTitle from "./BeginBookingTitle";
import ConfirmBookingTitle from "./ConfirmBookingTitle";
import CheckBooking from "./CheckBooking";
import AddContactsForm from "./AddContacsForm";
import ConfirmedBooking from "./ConfirmedBooking"

/* Since the API is pretty much static, I've used a static today value in the coding. */
const today = '2023-08-25';

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

    const [step, setStep] = useState(1);
    const [availableDates, setAvailableDates] = useState();
    const [editRequested, setEditRequested] = useState(false);
    const [availableTimes, dispatch] = useReducer(reducer, []);

    /* Functions */
    const updateDates = async (selectedGame) => {
        const dates = await fetchData(selectedGame, "", 1);
        setAvailableDates(dates);
    };

    const updateTimes = async (selectedGame, selectedDate) => {
        const updatedData = await fetchData(selectedGame, selectedDate, 2);
        dispatch({ type: "UPDATE_TIMES", payload: updatedData });
    };

    const initializeTimes = async (today) => {
        const initializedData  = await fetchData(today, "", 0);
        dispatch({ type: "INITIALIZE_TIMES", payload: initializedData });
    };

    const setStepWithAction = (newStep) => {
        window.scrollTo(0, 0);
        setStep(newStep);
    }

    const submitForm = async () => {

        if (step === 1) {
            console.log("Data saved to local storage");
            setStepWithAction(step + 1);
        }
        else {
            const url = "https://api.jsonbin.io/v3/b/64e2b4158e4aa6225ed30a86"; 
            const apiKey = "$2b$10$Ljhgzqti8Dc8Lhsz.q9YtOyirnzzzjki4lRP8wnqJs.FdyV/GgZCW"; 

            const sendData = {
                "numberOfPlayers": localStorage.getItem("players"),
                "specialGame": localStorage.getItem("game"),
                "reservationDate": localStorage.getItem("date"),
                "reservationTime": localStorage.getItem("time"),
                "reservationDuration": localStorage.getItem("duration"),
                "firstName": localStorage.getItem("lastName"),
                "lastName": localStorage.getItem("lastName"),
                "phoneNumber": localStorage.getItem("phone"),
                "emailAddress": localStorage.getItem("email"),
                "reservationComment": localStorage.getItem("comment")
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
                setStepWithAction(step + 1);
            })
            .catch(error => {
                console.error(error);
            });
        }
    };

    return (
        <>
            {step === 1 ? (
                <>
                    <BegingBookingTitle/>
                    <BookingForm 
                        availableDates={availableDates}
                        availableTimes={availableTimes}
                        updateDates={updateDates}
                        updateTimes={updateTimes}
                        initializeTimes={initializeTimes}
                        submitForm={submitForm}
                    />
                </>
            ) : step === 2 ? (
                <>
                    <ConfirmBookingTitle/>
                    <CheckBooking
                        setStepWithAction={setStepWithAction}
                        setEditRequested={setEditRequested}
                    />
                    <AddContactsForm
                        submitForm={submitForm}/>
                </>
            ) : step === 3 ? (
                <>
                    <ConfirmedBooking
                        setStep={setStep}/>
                </>
            ) : null }
        </>
    );
};

export default BookingPage;