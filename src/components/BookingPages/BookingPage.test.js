import { render, screen, waitFor, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as fetchDataModule from './fetchData';
import BookingPage from "./BookingPage";
import BookingForm from "./BookingForm";
import { BrowserRouter } from 'react-router-dom';
import AddContactsForm from "./AddContacsForm";

let originalScrollTo;

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();

const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

const guests = "2";
const newGuests = "5";
const mockFetchedData = [
    {
        "checkDate": "2023-08-25",
        "targetDate": "2023-09-06",
        "id": "t7",
        "time": "08:00 PM",
        "maxGuests": 6,
        "tableSituation": 1
    },
    {
        "checkDate": "2023-08-25",
        "targetDate": "2023-09-07",
        "id": "t8",
        "time": "01.30 PM",
        "maxGuests": 8,
        "tableSituation": 2
    }
];

const targetDate = '2023-09-06';
const today = "2023-08-25";
const actualToday = new Date();
const formatDate = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
        value: {
            getItem: () => mockGetItem(),
            setItem: () => mockSetItem(),
            removeItem: () => mockRemoveItem()
        }
    });
    window.addEventListener = mockAddEventListener;
    window.removeEventListener = mockRemoveEventListener;

    originalScrollTo = window.scrollTo;
    window.scrollTo = jest.fn();
});
afterEach(() => {
    jest.clearAllMocks();
    cleanup();
});
afterAll(() => {
    window.scrollTo = originalScrollTo;
});

describe("BookingPages", () => {
    test('Renders the BookingForm heading', () => {
        render(
            <BrowserRouter>
                <BookingForm/>
            </BrowserRouter>);
            const headerElement = screen.getByText("Reservation Details:");
            expect(headerElement).toBeInTheDocument();
    });

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

    test('If local storaging works with given values', async () => {
        jest.spyOn(fetchDataModule, 'fetchData').mockImplementation(async (date, guests) => {
            return [
                {
                    "checkDate": "2023-08-25",
                    "targetDate": "2023-08-30",
                    "id": "t8",
                    "time": "01.30PM",
                    "maxGuests": 8,
                    "tableSituation": 2
                }
            ]
        });

        render(
            <BrowserRouter>
                <BookingPage fetchData={fetchDataModule.fetchData}
                />
            </BrowserRouter>);
    
        const selectGuests = screen.getByTestId('select-guests');
        
        await userEvent.selectOptions(selectGuests, guests); 

        await waitFor (() => {
            expect(selectGuests).toHaveTextContent("2");
        });
    
        const datepickerInput = screen.getByDisplayValue(formatDate(actualToday).toString());
  
        fireEvent.change(datepickerInput, { target: { value: targetDate } });

        let selectTime;

        await waitFor (() => {
            selectTime = screen.getByTestId('select-time');
            expect(selectTime).toBeInTheDocument();
        })

        const options = screen.getAllByRole('option', { within: selectTime });

        const time = options[2].textContent;

        await userEvent.selectOptions(selectTime, time);

        const button = screen.getByTestId('submit');

        fireEvent.click(button);

        await waitFor (() => {
            expect(mockSetItem).toHaveBeenCalled();
        });

        await waitFor (() => {
            expect(mockGetItem).toHaveBeenCalled();
        });
    });

    test('Check the BookingForm for correct input attributes', async () => {

        render(
            <BrowserRouter>
                <BookingForm/>
            </BrowserRouter>);

        const chairCBInput = screen.getByLabelText("There will be a need for a children’s high chair:");
        expect(chairCBInput).toHaveAttribute('type', 'checkbox');
        expect(chairCBInput).toHaveAttribute('id', 'chair_checkbox');
        expect(chairCBInput).toHaveAttribute('name', 'isChairChecked');
        userEvent.click(chairCBInput);
        await waitFor (() => {
            expect(chairCBInput).toBeChecked();
        });

        const occasionCBInput = screen.getByLabelText("There will be a special occasion:");
        expect(occasionCBInput).toHaveAttribute('type', 'checkbox');
        expect(occasionCBInput).toHaveAttribute('id', 'occasion_checkbox');
        expect(occasionCBInput).toHaveAttribute('name', 'isOccasionChecked');
        userEvent.click(occasionCBInput);
        await waitFor (() => {
            expect(occasionCBInput).toBeChecked();
        });

        const tableCBInput = screen.getByLabelText("I want to choose my table:");
        expect(tableCBInput).toHaveAttribute('type', 'checkbox');
        expect(tableCBInput).toHaveAttribute('id', 'table_checkbox');
        expect(tableCBInput).toHaveAttribute('name', 'isTableChecked');
        expect(tableCBInput).toHaveAttribute('disabled');

        const submitButton = screen.getByTestId("submit");
        expect(submitButton).toHaveAttribute('type', 'submit');
        expect(submitButton).toHaveAttribute('id', 'blackButton');
        expect(submitButton).toHaveAttribute('value', 'Reserve table for ');
        expect(submitButton).toHaveAttribute('disabled');
    });

    test('Check the AddContactsForm for correct input attributes', async () => {

        render(
            <BrowserRouter>
                <AddContactsForm/>
            </BrowserRouter>);

        const firstNameInput = screen.getByLabelText("First Name:");
        expect(firstNameInput).toHaveAttribute('type', 'text');
        expect(firstNameInput).toHaveAttribute('id', 'first_name');
        expect(firstNameInput).toHaveAttribute('name', 'first_name');
        expect(firstNameInput).toHaveAttribute('required');

        const lastNameInput = screen.getByLabelText("Last Name:");
        expect(lastNameInput).toHaveAttribute('type', 'text');
        expect(lastNameInput).toHaveAttribute('id', 'last_name');
        expect(lastNameInput).toHaveAttribute('name', 'last_name');
        expect(lastNameInput).toHaveAttribute('required');

        const phoneInput = screen.getByLabelText("Phone Number:");
        expect(phoneInput).toHaveAttribute('type', 'tel');
        expect(phoneInput).toHaveAttribute('id', 'phone');
        expect(phoneInput).toHaveAttribute('name', 'phone');
        expect(phoneInput).toHaveAttribute('required');
        expect(phoneInput).toHaveAttribute('minLength', '4');
        expect(phoneInput).toHaveAttribute('maxLength', '16');

        const emailInput = screen.getByLabelText("Email Address:");
        expect(emailInput).toHaveAttribute('type', 'email');
        expect(emailInput).toHaveAttribute('id', 'email');
        expect(emailInput).toHaveAttribute('name', 'email');
        expect(emailInput).toHaveAttribute('required');
        expect(emailInput).toHaveAttribute('minLength', '4');

        const commentInput = screen.getByLabelText("Comment:");
        expect(commentInput).toHaveAttribute('type', 'text');
        expect(commentInput).toHaveAttribute('id', 'comment');
        expect(commentInput).toHaveAttribute('name', 'comment');
        expect(commentInput).not.toHaveAttribute('required');
        expect(commentInput).toHaveAttribute('maxLength', '250');

        const submitButton = screen.getByTestId("contact_submit");
        expect(submitButton).toHaveAttribute('type', 'submit');
        expect(submitButton).toHaveAttribute('id', 'blackButton');
        expect(submitButton).toHaveAttribute('value', 'Confirm Reservation');
    });

    test('Check the state of the submit button in BookingForm', async () => {
        jest.spyOn(fetchDataModule, 'fetchData').mockImplementation(async (date, guests) => {
            return [
                {
                    "checkDate": "2023-08-25",
                    "targetDate": "2023-09-06",
                    "id": "t8",
                    "time": "01.30PM",
                    "maxGuests": 8,
                    "tableSituation": 2
                }
            ]
        });

        render(
            <BrowserRouter>
                <BookingPage fetchData={fetchDataModule.fetchData}
                />
            </BrowserRouter>);
    
        const sb_button = screen.getByTestId('submit');

        /* Let's make a wrong selection to provoke an invalid value, thus invoking the blur addEventListener */
        const selectGuests = screen.getByTestId('select-guests');
        const guestOptions = screen.getAllByRole('option', { within: selectGuests });
        const invalidGuest = guestOptions[0].textContent;

        await userEvent.selectOptions(selectGuests, invalidGuest); 

        await waitFor (() => {
            expect(mockAddEventListener).toBeCalled();
        });
        
        /* Let's choose the correct values */
        await userEvent.selectOptions(selectGuests, guests); 

        await waitFor (() => {
            expect(selectGuests).toHaveTextContent("2");
        });

        const datepickerInput = screen.getByDisplayValue(formatDate(actualToday).toString());

        fireEvent.change(datepickerInput, { target: { value: targetDate } });

        let selectTime;

        await waitFor (() => {
            selectTime = screen.getByTestId('select-time');
            expect(selectTime).toBeInTheDocument();
        })

        /* Let's check that the submit button is still disabled since not all of the required values have been chosen */
        expect(sb_button).toHaveAttribute('disabled');

        const options = screen.getAllByRole('option', { within: selectTime });

        const time = options[2].textContent;

        await userEvent.selectOptions(selectTime, time);

        /* Let's confirm that with all the required values A) the submit button isn't disabled and B) the blur has been removed */
        expect(sb_button).not.toHaveAttribute('disabled=""');
        
        await waitFor (() => {
            expect(mockRemoveEventListener).toBeCalled();
        });

        /* Lastly the submit works with all necessary values chosen */
        fireEvent.click(sb_button);
    });

    test('Check the AddContactsForm for validation behavior when incorrect inputs are chosen', async () => {

        render(
            <BrowserRouter>
                <AddContactsForm/>
            </BrowserRouter>);

        const submitButton = screen.getByTestId("contact_submit");

        userEvent.click(submitButton);

        /* Let's see if clicking with only one required value disables the button and invokes the blur addEventListener */
        await waitFor (() => {
            expect(submitButton).toHaveAttribute("disabled");
        });

        await waitFor (() => {
            expect(mockAddEventListener).toHaveBeenCalled();
        });

        /* Let's check that all of the error messages of the required inputs are triggered */
        const fn_error = screen.getByTestId("fn_error");
        const ln_error = screen.getByTestId("ln_error");
        const p_error = screen.getByTestId("p_error");
        const e_error = screen.getByTestId("e_error");
        expect(fn_error).toHaveTextContent("First name is required");
        expect(ln_error).toHaveTextContent("Last name is required");
        expect(p_error).toHaveTextContent("Phone number is required");
        expect(e_error).toHaveTextContent("Email address is required");

        /* Let's trigger all the error messages of the phone number input */
        const phoneInput = screen.getByLabelText("Phone Number:");

        userEvent.type(phoneInput, "999");
        await waitFor (() => {
            expect(p_error).toHaveTextContent("Invalid phone number: too short");
        });

        userEvent.type(phoneInput, "1234567890123456789");
        await waitFor (() => {
            expect(p_error).toHaveTextContent("Invalid phone number: too long");
        });

        userEvent.clear(phoneInput);
        userEvent.type(phoneInput, "040++99000");
        await waitFor (() => {
            expect(p_error).toHaveTextContent("Invalid phone number, please check");
        });

        /* Let's trigger all the error messages of the email address input */
        const emailInput = screen.getByLabelText("Email Address:");

        userEvent.type(emailInput, "aaa");
        await waitFor (() => {
            expect(e_error).toHaveTextContent("Invalid email address, please check");
        });

        userEvent.type(emailInput, "sarah_newman@jfjfk,fi");
        await waitFor (() => {
            expect(e_error).toHaveTextContent("Invalid email address, please check");
        });
    });

    test('Check the AddContactsForm for validation behavior when correct inputs are chosen, after triggering a disabled submit button', async () => {

        render(
            <BrowserRouter>
                <AddContactsForm/>
            </BrowserRouter>);

        const submitButton = screen.getByTestId("contact_submit");

        const firstNameInput = screen.getByLabelText("First Name:");
        userEvent.type(firstNameInput, "Sarah");
        userEvent.click(submitButton);

        /* Let's trigger the disabled button */
        await waitFor (() => {
            expect(submitButton).toHaveAttribute("disabled");
        });

        const lastNameInput = screen.getByLabelText("Last Name:");
        userEvent.type(lastNameInput, "Newman");

        const phoneInput = screen.getByLabelText("Phone Number:");
        userEvent.type(phoneInput, "0502347654");

        const emailInput = screen.getByLabelText("Email Address:");
        userEvent.type(emailInput, "sarah_newman@email.com");

        const commentInput = screen.getByLabelText("Comment:");
        userEvent.type(commentInput, "I'm looking forward to the dinner!")

        userEvent.click(submitButton);
    });
});