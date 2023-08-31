import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { formBlurChecker } from "./formBlurChecker";
import * as yup from "yup";
import { useFormik } from "formik";

const AddContactsForm = (props) => {

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

                <h2 className="titleForm">Contact Details:</h2>
                <section className="contactsForm" aria-label="Contact information">
                    <form className="contactGrid">
                        <div className="contactNames">
                            <div className="contactLayout">
                            <label htmlFor="firstName">First Name:</label>
                                <input 
                                    type="text" 
                                    id="firstName" 
                                    className="formValidation"
                                    name="firstName" 
                                    value={formik.values.firstName}
                                    onChange={(e) => setInputValue("firstName", e.target.value)}
                                    aria-label="Add first name"
                                    required>
                                </input>
                                <span className="errorMessages" data-testid="fnError">{formik.errors.firstName}</span>
                            </div>

                            <div className="contactLayout">
                                <label htmlFor="lastName">Last Name:</label>
                                <input 
                                    type="text" 
                                    id="lastName" 
                                    className="formValidation"
                                    name="lastName" 
                                    value={formik.values.lastName}
                                    onChange={(e) => setInputValue("lastName", e.target.value)}
                                    aria-label="Add last name"
                                    required>
                                </input>
                                <span className="errorMessages" data-testid="lnError">{formik.errors.lastName}</span>
                            </div>
                        </div>

                        <div className="contactLayout">
                            <label htmlFor="phone">Phone Number:</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                className="formValidation"
                                name="phone" 
                                value={formik.values.phone}
                                onChange={(e) => setInputValue("phone", e.target.value)}
                                aria-label="Add phone number"
                                required
                                minLength={4}
                                maxLength={16}>
                            </input>
                            <span className="errorMessages" data-testid="pError">{formik.errors.phone}</span>
                        </div>

                        <div className="contactLayout">
                            <label htmlFor="email">Email Address:</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="formValidation"
                                name="email" 
                                value={formik.values.email}
                                onChange={(e) => setInputValue("email", e.target.value)}
                                aria-label="Add email address"
                                required
                                minLength={4}>
                            </input>
                            <span className="errorMessages" data-testid="eError">{formik.errors.email}</span>
                        </div>

                        <div className="contactLayout">
                            <label htmlFor="comment">Comment:</label>
                            <textarea
                                rows={4} 
                                type="text" 
                                id="comment" 
                                name="comment" 
                                value={formik.values.comment}
                                onChange={(e) => setInputValue("comment", e.target.value)}
                                aria-label="Add optional comment. If occasion chosen, please fill"
                                maxLength={250}>
                            </textarea>
                            <span className="errorMessages">{formik.errors.comment}</span>
                        </div>
                    </form>
                </section>
            <input 
                type="submit" 
                value={`Confirm Reservation`} 
                id="blackButton" 
                className="contactsNextBtn" 
                onClick={formik.handleSubmit}
                disabled={!formik.isValid}
                aria-disabled={!formik.isValid}
                data-testid="contactSubmit"
                aria-label="Finish reservation"
            ></input>
            <Link to="/" id="greyButton" className="contactsCancelBtn">Cancel Reservation</Link>
        </article>
    );
};

export default AddContactsForm;