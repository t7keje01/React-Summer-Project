import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as fetchDataModule from './fetchData';
import BookingPage from "./BookingPage";
import { BrowserRouter } from 'react-router-dom';

afterEach(() => {
jest.clearAllMocks();
});

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
    const mockFetchedData = [
        {
            "checkDate": "2023-08-25",
            "targetDate": "2023-08-29",
            "id": "t7",
            "time": "08:00 PM",
            "maxGuests": 6,
            "tableSituation": 1
        },
        {
            "checkDate": "2023-08-25",
            "targetDate": "2023-08-30",
            "id": "t8",
            "time": "01.30 PM",
            "maxGuests": 8,
            "tableSituation": 2
        }
    ];

    const targetDate = '2023-08-30';
    const today = "2023-08-25";
    const actualToday = new Date();
    const formatDate = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
    };

    test('If the fetch regarding initializeTimes functions with correct parameters', async () => {
        jest.spyOn(fetchDataModule, 'fetchData').mockResolvedValue(mockFetchedData);


        render(
            <BrowserRouter>
                <BookingPage fetchData={fetchDataModule.fetchData}
                />
            </BrowserRouter>);

        const selectGuests = screen.getByTestId('select-guests');

        await userEvent.selectOptions(selectGuests, guests); 

        await userEvent.selectOptions(selectGuests, newGuests); 
        
        await waitFor(() => {
            expect(fetchDataModule.fetchData).toHaveBeenCalledWith(today, 0);
        });
    });

    test('If the fetch regarding updateTimes functions with correct parameters', async () => {

        jest.spyOn(fetchDataModule, 'fetchData').mockImplementation(async (date, guests) => {
            if (date === targetDate) {
                const filteredTimes = mockFetchedData.filter(item => 
                    new Date(item.targetDate).toLocaleDateString() === new Date(date).toLocaleDateString() && item.maxGuests >= guests);
                return filteredTimes;
            } else {
                return [];
            }
        });

        render(
            <BrowserRouter>
                <BookingPage fetchData={fetchDataModule.fetchData}
                />
            </BrowserRouter>);
    
        const selectGuests = screen.getByTestId('select-guests');
    
        await userEvent.selectOptions(selectGuests, guests); 
    
        const datepickerInput = screen.getByDisplayValue(formatDate(actualToday).toString());
  
        fireEvent.change(datepickerInput, { target: { value: targetDate } });

        await waitFor(() => {
            const lastCallArgs = fetchDataModule.fetchData.mock.calls[fetchDataModule.fetchData.mock.calls.length - 1];
            const [lastCallDate, ] = lastCallArgs;
            const checkDate = formatDate(new Date (lastCallDate));
            const checkTargetDate = formatDate(new Date (targetDate));
            
            expect(checkDate).toEqual(checkTargetDate);
        });
        await waitFor(() => {
            const lastCallArgs = fetchDataModule.fetchData.mock.calls[fetchDataModule.fetchData.mock.calls.length - 1];
            const [, lastCallGuests] = lastCallArgs;
        
            expect(lastCallGuests).toEqual(parseInt(guests));
        });

    });
});