import {Routes, Route} from "react-router-dom";
import HomePage from "./components/HomePage";
import BookingPage from './components/BookingPage';

const Main = () => {

    return (
      <Routes> 
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/reservations" element={<BookingPage />}></Route>
      </Routes>
    );
  };

export default Main;