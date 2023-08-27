import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { formBlurChecker } from "./formBlurChecker";

const AddContactsForm = (props) => {

    /* Props */
    const {
        submitForm
    } = props;

    const [contactInputs, setContactInputs] = useState({});

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setContactInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = () => {
        localStorage.setItem("firstName", contactInputs.first_name);
        localStorage.setItem("lastName", contactInputs.last_name);
        localStorage.setItem("phone", contactInputs.phone_number);
        localStorage.setItem("email", contactInputs.email);
        localStorage.setItem("comment", contactInputs.comment);
        submitForm();
    }
    
    /* Validation */
    useEffect(() => {
        formBlurChecker();
    }, [contactInputs]);

    return (
        <article className="tableGrid" id="tableGridContainer">

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
                                    value={contactInputs.first_name || ""} 
                                    onChange={handleChange} 
                                    aria-label="Input for the first name"
                                    required>
                                </input>
                            </div>

                            <div className="contact_layout">
                                <label htmlFor="last_name">Last Name:</label>
                                <input 
                                    type="text" 
                                    id="last_name" 
                                    className="form_validation"
                                    name="last_name" 
                                    value={contactInputs.last_name || ""} 
                                    onChange={handleChange} 
                                    aria-label="Input for the last name"
                                    required>
                                </input>
                            </div>
                        </div>

                        <div className="contact_layout">
                            <label htmlFor="phone_number">Phone Number:</label>
                            <input 
                                type="tel" 
                                id="phone_number" 
                                className="form_validation"
                                name="phone_number" 
                                value={contactInputs.phone_number || ""} 
                                onChange={handleChange} 
                                aria-label="Input for the phone number"
                                required
                                minLength={4}
                                maxLength={16}>
                            </input>
                        </div>

                        <div className="contact_layout">
                            <label htmlFor="email">Email Address:</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="form_validation"
                                name="email" 
                                value={contactInputs.email || ""} 
                                onChange={handleChange} 
                                aria-label="Input for the email address"
                                required
                                minLength={4}>
                            </input>
                        </div>

                        <div className="contact_layout">
                            <label htmlFor="comment">Comment:</label>
                            <textarea
                                rows={4} 
                                type="text" 
                                id="comment" 
                                name="comment" 
                                value={contactInputs.comment || ""} 
                                onChange={handleChange} 
                                aria-label="Input for an optional comment. Should be filled if an occasion was chosen"
                                maxLength={250}>
                            </textarea>
                        </div>
                    </form>
                </section>
            <input 
                type="submit" 
                value={`Confirm Reservation`} 
                id="blackButton" 
                className="table_next" 
                onClick={handleSubmit}
            ></input>
            <Link to="/" id="greyButton" className="table_canc">Cancel Reservation</Link>
        </article>
    );
};

export default AddContactsForm;