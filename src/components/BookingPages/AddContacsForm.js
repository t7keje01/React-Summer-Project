import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { formBlurChecker } from "./formBlurChecker";
import * as yup from "yup";
import { useFormik } from "formik";

const AddContactsForm = (props) => {

    /* Props */
    const {
        submitForm
    } = props;

    const phoneReg = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const formSchema = yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        phone: yup.string().min(4, "Invalid phone number: too short").max(16, "Invalid phone number: too long")
            .required("Phone number is required").matches(phoneReg, "Invalid phone number, please check"),
        email: yup.string().email("Invalid email address, please check").min(4)
            .required("Email address is required").matches(emailReg, "Invalid email address, please check"),
        comment: yup.string().max(250, "Maximum length exceeded")
    })

    const handleSubmit = () => {
        localStorage.setItem("firstName", formik.values.firstName);
        localStorage.setItem("lastName", formik.values.lastName);
        localStorage.setItem("phone", formik.values.phone);
        localStorage.setItem("email", formik.values.email);
        localStorage.setItem("comment", formik.values.comment);
        submitForm();
    }

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            comment: "",
        },
        validationSchema: formSchema,
        onSubmit: handleSubmit,
    });

    const setInputValue = useCallback(
        (key, value) =>
            formik.setValues({
                ...formik.values,
                [key]: value,
            }),
        [formik]
    );
    
    /* Validation */
    useEffect(() => {
        formBlurChecker();
    }, [formik.values]);

    return (
        <article className="tableGrid" id="addContactsContainer">

                <h2 className="title_form">Contact Details:</h2>
                <section className="cont_form" aria-label="Contact information">
                    <form className="contact_grid">
                        <div className="cont_names">
                            <div className="contact_layout">
                            <label htmlFor="first_name">First Name:</label>
                                <input 
                                    type="text" 
                                    id="first_name" 
                                    className="form_validation"
                                    name="first_name" 
                                    value={formik.values.firstName}
                                    onChange={(e) => setInputValue("firstName", e.target.value)}
                                    aria-label="Input for the first name"
                                    required>
                                </input>
                                <span className="error_message" data-testid="fn_error">{formik.errors.firstName}</span>
                            </div>

                            <div className="contact_layout">
                                <label htmlFor="last_name">Last Name:</label>
                                <input 
                                    type="text" 
                                    id="last_name" 
                                    className="form_validation"
                                    name="last_name" 
                                    value={formik.values.lastName}
                                    onChange={(e) => setInputValue("lastName", e.target.value)}
                                    aria-label="Input for the last name"
                                    required>
                                </input>
                                <span className="error_message" data-testid="ln_error">{formik.errors.lastName}</span>
                            </div>
                        </div>

                        <div className="contact_layout">
                            <label htmlFor="phone">Phone Number:</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                className="form_validation"
                                name="phone" 
                                value={formik.values.phone}
                                onChange={(e) => setInputValue("phone", e.target.value)}
                                aria-label="Input for the phone number"
                                required
                                minLength={4}
                                maxLength={16}>
                            </input>
                            <span className="error_message" data-testid="p_error">{formik.errors.phone}</span>
                        </div>

                        <div className="contact_layout">
                            <label htmlFor="email">Email Address:</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="form_validation"
                                name="email" 
                                value={formik.values.email}
                                onChange={(e) => setInputValue("email", e.target.value)}
                                aria-label="Input for the email address"
                                required
                                minLength={4}>
                            </input>
                            <span className="error_message" data-testid="e_error">{formik.errors.email}</span>
                        </div>

                        <div className="contact_layout">
                            <label htmlFor="comment">Comment:</label>
                            <textarea
                                rows={4} 
                                type="text" 
                                id="comment" 
                                name="comment" 
                                value={formik.values.comment}
                                onChange={(e) => setInputValue("comment", e.target.value)}
                                aria-label="Input for an optional comment. Should be filled if an occasion was chosen"
                                maxLength={250}>
                            </textarea>
                            <span className="error_message">{formik.errors.comment}</span>
                        </div>
                    </form>
                </section>
            <input 
                type="submit" 
                value={`Confirm Reservation`} 
                id="blackButton" 
                className="cont_next" 
                onClick={formik.handleSubmit}
                disabled={!formik.isValid}
                data-testid="contact_submit"
            ></input>
            <Link to="/" id="greyButton" className="cont_canc">Cancel Reservation</Link>
        </article>
    );
};

export default AddContactsForm;