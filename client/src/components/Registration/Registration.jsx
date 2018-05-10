import React from "react";
import { Link } from "react-router-dom";

const Registration = (props) => {

    const errorString = " error";
    const okString = " ok";
    const loadingString = " loading";

    const { handleChange, onSubmit, validation, isFirstExecution, isLoading } = props;

    let isButtonDisabled = validation.email.isInvalid || 
                           validation.password.isInvalid || 
                           validation.password_confirmation.isInvalid || 
                           validation.username.isInvalid ||
                           validation.checkbox.isInvalid;

    return (
        <form onSubmit={ onSubmit }>
            <div className={ "field" + (isFirstExecution.username ? "" : validation.username.isInvalid ? errorString : okString) } >
                <input name="username" id="reg-username" type="text" placeholder="Username" onChange={ handleChange } required />
                <label htmlFor="reg-username"></label>
            </div>
            <div className={ "field" + (isFirstExecution.email ? "" : validation.email.isInvalid ? errorString : okString) } >
                <input name="email" id="reg-email" type="email" placeholder="E-mail" onChange={ handleChange } required />
                <label htmlFor="reg-email"></label>
            </div>
            <div className={ "field" + (isFirstExecution.password ? "" : validation.password.isInvalid ? errorString : okString) } >
                <input name="password" id="reg-password" type="password" placeholder="Password" onChange={ handleChange } required />
                <label htmlFor="reg-password"></label>
            </div>
            <div className={ "field" + (isFirstExecution.password_confirmation ? "" : validation.password_confirmation.isInvalid ? errorString : okString) } >
                <input name="password_confirmation" id="reg-confirm-password" type="password" placeholder="Confirm password" onChange={ handleChange } required />
                <label htmlFor="reg-confirm-password"></label>
            </div>
            <div className="additional">
                <input name="checkbox" className="default-checkbox" id="reg-confirm" type="checkbox" onChange={ handleChange } />
                <label htmlFor="reg-confirm" required>I agree to the terms of service</label>
            </div>
            <div className="buttons">
                <button className={"register default-button" + (isLoading ? loadingString : "") } disabled={ isButtonDisabled } >Register</button>
                <Link to="/auth" className="cancel default-button">Cancel</Link>
            </div>
        </form>
    );
}

export default Registration;