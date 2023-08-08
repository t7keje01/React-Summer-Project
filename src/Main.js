import {Routes, Route} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import BookingPage from './components/BookingPages/BookingPage';

const Main = () => {

    return (
      <Routes> 
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/reservations" element={<BookingPage />}></Route>
      </Routes>
    );
  };

export default Main;