import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingPage, {initialTimes} from "./BookingPage";
import BookingForm from "./BookingForm";
import { BrowserRouter } from 'react-router-dom';


describe("Booking Page", () => {
test('Renders the BookingForm heading', () => {
    render(
        <BrowserRouter>
            <BookingPage/>
        </BrowserRouter>);
        const headerElement = screen.getByText("Reservation Details:");
        expect(headerElement).toBeInTheDocument();
});

const guests = "2";
const newGuests = "5";
const mockArray = [ 
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
        maxGuests: 5,
        tableSituation: 3
    }]


const availableTimes= mockArray;
const filteredTimeSlots= mockArray;
const setFilteredTimeSlots= jest.fn();

test('If initializing function is being called', async () => {

    const updateTimes= jest.fn();
    const dispatch = jest.fn();
    const initializeTimes = jest.fn(() => {
        dispatch({ type: "INITIALIZE_TIMES", payload: initialTimes });
        return { type: "INITIALIZE_TIMES", payload: initialTimes };
    });

    render(
        <BrowserRouter>
            <BookingForm 
                availableTimes={availableTimes}
                filteredTimeSlots={filteredTimeSlots}
                setFilteredTimeSlots={setFilteredTimeSlots}
                updateTimes={updateTimes}
                initializeTimes={initializeTimes}
                dispatch={dispatch}
            />
        </BrowserRouter>);

    const selectGuests = screen.getByTestId('select-guests');

    await userEvent.selectOptions(selectGuests, guests); 

    await userEvent.selectOptions(selectGuests, newGuests); 
    
    await waitFor(() => {
        expect(initializeTimes).toHaveReturnedWith({
            type: "INITIALIZE_TIMES",
            payload: initialTimes
        });
    }, { timeout: 1000 });

    initializeTimes.mockRestore();
    });

    const targetDate = new Date('2023-08-22');
    const today = new Date();
    const formatDate = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
    };

    test('If values are updated and are the same as in the state', async () => {

        const dispatch = jest.fn();
        const updateTimes= jest.fn(() => {
            dispatch({ type: "UPDATE_TIMES", payload: filteredTimeSlots });
            return{ type: "UPDATE_TIMES", payload: filteredTimeSlots };
        });
        const initializeTimes = jest.fn();
    
        render(
            <BrowserRouter>
                <BookingForm 
                    availableTimes={availableTimes}
                    filteredTimeSlots={filteredTimeSlots}
                    setFilteredTimeSlots={setFilteredTimeSlots}
                    updateTimes={updateTimes}
                    initializeTimes={initializeTimes}
                    dispatch={dispatch}
                />
            </BrowserRouter>);
    
        const selectGuests = screen.getByTestId('select-guests');
    
        await userEvent.selectOptions(selectGuests, guests); 
    
        const datepickerInput = screen.getByDisplayValue(formatDate(today).toString());
  
        fireEvent.change(datepickerInput, { target: { value: targetDate } });
        
        await waitFor(() => {
            expect(updateTimes).toHaveReturnedWith({
                type: "UPDATE_TIMES",
                payload: filteredTimeSlots
            });
        }, { timeout: 1000 });

        await waitFor(() => {
            expect(filteredTimeSlots).toBe(availableTimes);
        }, { timeout: 1000 });
    
        initializeTimes.mockRestore();
        });

});