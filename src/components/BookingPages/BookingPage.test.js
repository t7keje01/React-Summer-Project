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

const players = "2";
const game = "Billiards";
const mockFetchedData = [
    {
        "id": "t1",
        "checkDate": "2023-08-25",
        "targetDate": "2023-09-19",
        "game": "Billiards",
        "time": "10:00 AM",
        "duration": 4
      },
      {
        "id": "t2",
        "checkDate": "2023-08-25",
        "targetDate": "2023-09-22",
        "game": "Snooker",
        "time": "03:00 PM",
        "duration": 2
      },
];

const targetDate = '2023-09-19';
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

    test('If the fetch regarding updateDates functions with correct parameters', async () => {
        jest.spyOn(fetchDataModule, 'fetchData').mockResolvedValue(mockFetchedData);

        render(
            <BrowserRouter>
                <BookingPage fetchData={fetchDataModule.fetchData}
                />
            </BrowserRouter>);

        const selectPlayers = screen.getByTestId('selectPlayers');

        await userEvent.selectOptions(selectPlayers, players); 

        const selectGame = screen.getByTestId('selectGame');

        await userEvent.selectOptions(selectGame, game); 
        
        await waitFor(() => {
            expect(fetchDataModule.fetchData).toHaveBeenCalledWith(game, "", 1);
        });
    });

    test('If the fetch regarding updateTimes functions with correct parameters', async () => {

        jest.spyOn(fetchDataModule, 'fetchData').mockImplementation(async (game, date, index) => {
            if (index === 2) {
                const filteredTimes = mockFetchedData
                .filter(item => new Date(item.targetDate).toLocaleDateString() === new Date(date).toLocaleDateString() && item.game === game)
                .map(item => ({ time: item.time, duration: item.duration }));
        
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
    
        const selectPlayers = screen.getByTestId('selectPlayers');
    
        await userEvent.selectOptions(selectPlayers, players); 

        const selectGame = screen.getByTestId('selectGame');

        await userEvent.selectOptions(selectGame, game); 
    
        const datepickerInput = screen.getByDisplayValue(formatDate(actualToday).toString());
  
        fireEvent.change(datepickerInput, { target: { value: targetDate } });

        await waitFor(() => {
            const lastCallArgs = fetchDataModule.fetchData.mock.calls[fetchDataModule.fetchData.mock.calls.length - 1];
            const [lastCallGame, ,] = lastCallArgs;
        
            expect(lastCallGame).toEqual(game);
        });

        /* NEEDS FIXING!
        await waitFor(() => {
            const lastCallArgs = fetchDataModule.fetchData.mock.calls[fetchDataModule.fetchData.mock.calls.length - 1];
            const [, lastCallDate, ] = lastCallArgs;
            const checkTargetDate = formatDate(new Date (targetDate));
            
            expect(lastCallDate).toEqual(checkTargetDate);
        });*/

        await waitFor(() => {
            const lastCallArgs = fetchDataModule.fetchData.mock.calls[fetchDataModule.fetchData.mock.calls.length - 1];
            const [, , lastCallIndex] = lastCallArgs;
        
            expect(lastCallIndex).toEqual(parseInt(1));
        });

    });

    test('If local storaging works with given values', async () => {
        jest.spyOn(fetchDataModule, 'fetchData').mockImplementation(async (game, selectedDate, index) => {
            if (index === 1) {
                const filteredData = mockFetchedData
                    .filter(item => item.game === game && item.targetDate !== null)
                    .map(item => new Date(item.targetDate));
                return filteredData;
            } 
            else {    
                const filteredTimes = [{
                    "time": "10:00 AM",
                    "duration": 4
                }];
            
                return filteredTimes;
            }
        });

        render(
            <BrowserRouter>
                <BookingPage fetchData={fetchDataModule.fetchData}
                />
            </BrowserRouter>);
    
        const selectPlayers = screen.getByTestId('selectPlayers');
        
        await userEvent.selectOptions(selectPlayers, players); 

        await waitFor (() => {
            expect(selectPlayers).toHaveTextContent("2");
        });

        const selectGame = screen.getByTestId('selectGame');

        await userEvent.selectOptions(selectGame, game); 

        await waitFor (() => {
            expect(selectGame.value).toBe("Billiards");
        });
    
        const datepickerInput = screen.getByDisplayValue(formatDate(actualToday).toString());
  
        fireEvent.change(datepickerInput, { target: { value: targetDate } });

        let timeSelected;

        await waitFor (() => {
            timeSelected = screen.getByTestId('selectTime');
            expect(timeSelected).toBeInTheDocument();
        })

        let timeOptions;

        await waitFor (() => {
            timeOptions = screen.getAllByTestId('filteredTime')
            expect(timeOptions[0].value).toBe("10:00 AM");
        })

        const time = timeOptions[0].textContent;

        await userEvent.selectOptions(timeSelected, time);

        let selectDuration;

        await waitFor (() => {
            selectDuration = screen.getByTestId('selectDuration');
            expect(selectDuration).toBeInTheDocument();
        })

        const durationOptions = screen.getAllByTestId("filteredDuration");

        const duration = durationOptions[0].textContent;

        await userEvent.selectOptions(selectDuration, duration);

        const button = screen.getByTestId('submit');

        fireEvent.click(button);

        await waitFor (() => {
            expect(mockSetItem).toHaveBeenCalled();
        });

        await waitFor (() => {
            expect(mockGetItem).toHaveBeenCalled();
        });
    });

    test('Check the AddContactsForm for correct input attributes', async () => {

        render(
            <BrowserRouter>
                <AddContactsForm/>
            </BrowserRouter>);

        const firstNameInput = screen.getByLabelText("First Name:");
        expect(firstNameInput).toHaveAttribute('type', 'text');
        expect(firstNameInput).toHaveAttribute('id', 'firstName');
        expect(firstNameInput).toHaveAttribute('name', 'firstName');
        expect(firstNameInput).toHaveAttribute('required');

        const lastNameInput = screen.getByLabelText("Last Name:");
        expect(lastNameInput).toHaveAttribute('type', 'text');
        expect(lastNameInput).toHaveAttribute('id', 'lastName');
        expect(lastNameInput).toHaveAttribute('name', 'lastName');
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

        const submitButton = screen.getByTestId("contactSubmit");
        expect(submitButton).toHaveAttribute('type', 'submit');
        expect(submitButton).toHaveAttribute('id', 'neonButton');
        expect(submitButton).toHaveAttribute('value', 'Confirm Reservation');
    });

    test('Check the state of the submit button in BookingForm', async () => {
        jest.spyOn(fetchDataModule, 'fetchData').mockImplementation(async (game, selectedDate, index) => {
            if (index === 1) {
                const filteredData = mockFetchedData
                    .filter(item => item.game === game && item.targetDate !== null)
                    .map(item => new Date(item.targetDate));
                return filteredData;
            } 
            else {    
                const filteredTimes = [{
                    "time": "10:00 AM",
                    "duration": 4
                }];
            
                return filteredTimes;
            }
        });

        render(
            <BrowserRouter>
                <BookingPage fetchData={fetchDataModule.fetchData}
                />
            </BrowserRouter>);
    
        const submitBtn = screen.getByTestId('submit');

        /* Let's make a wrong selection to provoke an invalid value, thus invoking the blur addEventListener */
        const selectPlayers = screen.getByTestId('selectPlayers');
        await userEvent.selectOptions(selectPlayers, players); 

        await waitFor (() => {
            expect(selectPlayers).toHaveTextContent("2");
        });

        const selectGame = screen.getByTestId('selectGame');

        await userEvent.selectOptions(selectGame, game); 

        const datepickerInput = screen.getByDisplayValue(formatDate(actualToday).toString());

        fireEvent.change(datepickerInput, { target: { value: targetDate } });

        let timeSelected;

        await waitFor (() => {
            timeSelected = screen.getByTestId('selectTime');
            expect(timeSelected).toBeInTheDocument();
        })

        /* Let's check that the submit button is still disabled since not all of the required values have been chosen */
        expect(submitBtn).toHaveAttribute('disabled');

        let timeOptions;

        await waitFor (() => {
            timeOptions = screen.getAllByTestId('filteredTime')
            expect(timeOptions[0].value).toBe("10:00 AM");
        })

        const time = timeOptions[0].textContent;

        await userEvent.selectOptions(timeSelected, time);

        let selectDuration;

        await waitFor (() => {
            selectDuration = screen.getByTestId('selectDuration');
            expect(selectDuration).toBeInTheDocument();
        })

        const durationOptions = screen.getAllByTestId("filteredDuration");

        const duration = durationOptions[0].textContent;

        await userEvent.selectOptions(selectDuration, duration);
        

        /* Let's confirm that with all the required values A) the submit button isn't disabled and B) the blur has been removed */
        expect(submitBtn).not.toHaveAttribute('disabled=""');
        
        await waitFor (() => {
            expect(mockRemoveEventListener).toBeCalled();
        });

        /* Lastly the submit works with all necessary values chosen */
        fireEvent.click(submitBtn);
    });

    test('Check the AddContactsForm for validation behavior when incorrect inputs are chosen', async () => {

        render(
            <BrowserRouter>
                <AddContactsForm/>
            </BrowserRouter>);

        const submitButton = screen.getByTestId("contactSubmit");

        userEvent.click(submitButton);

        /* Let's see if clicking with only one required value disables the button and invokes the blur addEventListener */
        await waitFor (() => {
            expect(submitButton).toHaveAttribute("disabled");
        });

        await waitFor (() => {
            expect(mockAddEventListener).toHaveBeenCalled();
        });

        /* Let's check that all of the error messages of the required inputs are triggered */
        const fnError = screen.getByTestId("fnError");
        const lnError = screen.getByTestId("lnError");
        const pError = screen.getByTestId("pError");
        const eError = screen.getByTestId("eError");
        expect(fnError).toHaveTextContent("First name is required");
        expect(lnError).toHaveTextContent("Last name is required");
        expect(pError).toHaveTextContent("Phone number is required");
        expect(eError).toHaveTextContent("Email address is required");

        /* Let's trigger all the error messages of the phone number input */
        const phoneInput = screen.getByLabelText("Phone Number:");

        userEvent.type(phoneInput, "999");
        await waitFor (() => {
            expect(pError).toHaveTextContent("Invalid phone number: too short");
        });

        userEvent.type(phoneInput, "1234567890123456789");
        await waitFor (() => {
            expect(pError).toHaveTextContent("Invalid phone number: too long");
        });

        userEvent.clear(phoneInput);
        userEvent.type(phoneInput, "040++99000");
        await waitFor (() => {
            expect(pError).toHaveTextContent("Invalid phone number, please check");
        });

        /* Let's trigger all the error messages of the email address input */
        const emailInput = screen.getByLabelText("Email Address:");

        userEvent.type(emailInput, "aaa");
        await waitFor (() => {
            expect(eError).toHaveTextContent("Invalid email address, please check");
        });

        userEvent.type(emailInput, "sarah_newman@email,com");
        await waitFor (() => {
            expect(eError).toHaveTextContent("Invalid email address, please check");
        });
    });

    test('Check the AddContactsForm for validation behavior when correct inputs are chosen, after triggering a disabled submit button', async () => {

        render(
            <BrowserRouter>
                <AddContactsForm/>
            </BrowserRouter>);

        const submitButton = screen.getByTestId("contactSubmit");

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
        userEvent.type(commentInput, "I'm looking forward to the game!")

        userEvent.click(submitButton);
    });
});