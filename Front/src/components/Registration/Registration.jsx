import React from "react";
import { Link } from "react-router-dom";

const Registration = (props) => {

    const { handleChange, onSubmit, isButtonDisabled } = props;

    return (
        <form onSubmit={ onSubmit }>
            <div className="username">
                <input name="username" id="reg-username" type="text" placeholder="Username" onChange={ handleChange } required />
                <label htmlFor="reg-username"></label>
            </div>
            <div className="email">
                <input name="email" id="reg-email" type="email" placeholder="E-mail" onChange={ handleChange } required />
                <label htmlFor="reg-email"></label>
            </div>
            <div className="password">
                <input name="password" id="reg-password" type="password" placeholder="Password" onChange={ handleChange } required />
                <label htmlFor="reg-password"></label>
            </div>
            <div className="confirm-password">
                <input name="password_confirmation" id="reg-confirm-password" type="password" placeholder="Confirm password" onChange={ handleChange } required />
                <label htmlFor="reg-confirm-password"></label>
            </div>
            <div className="additional">
                <input name="checkbox" className="default-checkbox" id="reg-confirm" type="checkbox" onChange={ handleChange } />
                <label htmlFor="reg-confirm" required>I agree to the terms of service</label>
            </div>
            <div className="buttons">
                <button className="register default-button" disabled={ isButtonDisabled }>Register</button>
                <Link to="/auth" className="cancel default-button">Cancel</Link>
            </div>
        </form>
    );
}

export default Registration;