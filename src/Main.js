import {Routes, Route, BrowserRouter} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import BookingPage from './components/BookingPages/BookingPage';

/* This is used as a router setup! If looking for booking related stuff, navigate to the BookingForm and BookingPafge under BookingPages -folder! */

const Main = () => {

    return (
        <Routes> 
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/about" element={<HomePage />}></Route>
          <Route path="/activity" element={<HomePage />}></Route>
          <Route path="/leaderboard" element={<HomePage />}></Route>
          <Route path="/tournament" element={<HomePage />}></Route>
          <Route path="/pricing" element={<HomePage />}></Route>
          <Route path="/reservation" element={<BookingPage />}></Route>
        </Routes>
    );
  };

export default Main;