import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaClock, FaCalendarAlt, FaChair, FaBirthdayCake } from 'react-icons/fa';
import TableSystem from "./TableSystem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VisualizeChosenTable from "./VisualizeChosenTable";
import { Button } from "@chakra-ui/react";


const CheckBooking = (props) => {

    const booking_img = require("../../images/book_and_pen.jpg");

    /* Props */
    const {
        reservationData,
        setStep,
        setEditRequested
    } = props;

    const handleEdit = () => {
        setStep(1);
        setEditRequested(true);
    }
    
    return (
        <article className="tableGrid" id="tableGridContainer">

                <h2 className="title_form">Reservation Details:</h2>
                <section className="table_form">
                    <article className="check_grid">
                        <div className="check_title">Number of Diners:</div>
                        <div>{reservationData.guests}</div>

                        {reservationData.chairs !== "" && <>
                        <div className="check_title">Number of Children’s Chairs:</div>
                        <div>{reservationData.chairs}</div>
                        </>}

                        <div className="check_title">Chosen Date:</div>
                        <div>{reservationData.date.toLocaleDateString()}</div>

                        <div className="check_title">Chosen Time:</div>
                        <div>{reservationData.time}</div>

                        {reservationData.occasion !== "" && <>
                        <div className="check_title">Chosen Occasion:</div>
                        <div>{reservationData.occasion}</div>
                        </>}

                        {reservationData.table !== "" && <>
                        <div className="check_title">Chosen Table:</div>
                        <div>{reservationData.table}</div>
                        </>}

                    </article>
                </section>
                {reservationData.table !== "" ? (
                    <section className="table_img">
                        <VisualizeChosenTable chosenTable={reservationData.table}/> 
                    </section> ) : (
                    <section className="table_img">
                        <div className="place_holder">
                            <img src={booking_img} className="book_img" alt="Book and pen."/>
                        </div>
                    </section>
                    )}
            <Button id="blackButton" className="table_next" onClick={handleEdit}>Edit Information</Button>
        </article>
    );
};

export default CheckBooking;