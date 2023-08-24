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
        setStepWithAction,
        setEditRequested
    } = props;

    const handleEdit = () => {
        setStepWithAction(1);
        setEditRequested(true);
    }
    
    return (
        <article className="tableGrid" id="tableGridContainer">

                <h2 className="title_form">Reservation Details:</h2>
                <section className="table_form">
                    <article className="check_grid">
                        <div className="check_title">Number of Diners:</div>
                        <div>{localStorage.getItem("guests")}</div>

                        {localStorage.getItem("chairs") !== "" && <>
                        <div className="check_title">Number of Children’s Chairs:</div>
                        <div>{localStorage.getItem("chairs")}</div>
                        </>}

                        <div className="check_title">Chosen Date:</div>
                        <div>{localStorage.getItem("date")}</div>

                        <div className="check_title">Chosen Time:</div>
                        <div>{localStorage.getItem("time")}</div>

                        {localStorage.getItem("occasion") !== "" && <>
                        <div className="check_title">Chosen Occasion:</div>
                        <div>{localStorage.getItem("occasion")}</div>
                        </>}

                        {localStorage.getItem("table") !== "" && <>
                        <div className="check_title">Chosen Table:</div>
                        <div>{localStorage.getItem("table")}</div>
                        </>}

                    </article>
                </section>
                {localStorage.getItem("table") !== "" ? (
                    <section className="table_img">
                        <VisualizeChosenTable chosenTable={localStorage.getItem("table")}/> 
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