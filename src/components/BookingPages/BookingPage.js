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
    const [editRequested, setEditRequested] = useState(false);
    const [availableTimes, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        const fetchDataAndSetTimes = async () => {
            try {
                const timeLineUp = await fetchData(today, 0);
                dispatch({ type: "INITIALIZE_TIMES", payload: timeLineUp });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchDataAndSetTimes();
    }, []);
      

    /* Functions regarding the reducer */
    const updateTimes = async (selectedDate, selectedGuests) => {
        const updatedData = await fetchData(selectedDate, selectedGuests);
        dispatch({ type: "UPDATE_TIMES", payload: updatedData });
    };

    const initializeTimes = async (today) => {
        console.log("Is this called");
        console.log(availableTimes);
        const initializedData  = await fetchData(today, 0);
        dispatch({ type: "INITIALIZE_TIMES", payload: initializedData });
    };

    const setStepWithAction = (newStep) => {
        window.scrollTo(0, 0)
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
                "numberOfDiners": localStorage.getItem("guests"),
                "numberOfChairs": localStorage.getItem("chairs"),
                "reservationDate": localStorage.getItem("date"),
                "reservationTime": localStorage.getItem("time"),
                "specialOccasion": localStorage.getItem("occasion"),
                "selectedTable": localStorage.getItem("table"),
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
                        availableTimes={availableTimes}
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
                        setStepWithAction={setStepWithAction}/>
                </>
            ) : null }
        </>
    );
};

export default BookingPage;