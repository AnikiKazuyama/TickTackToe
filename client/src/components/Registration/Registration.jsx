import React from "react";
import { Link } from "react-router-dom";

import ReactTooltip from 'react-tooltip';

const Registration = (props) => {

    const { 
        handleChange, 
        onSubmit, 
        validation, 
        isFirstExecution, 
        isLoading, 
        serverErrors
     } = props;

    const errorString = " error";
    const okString = " ok";
    const loadingString = " loading";
    const serverErrorMessages = {
        name: "This name is occupied",
        email: "This email is occupied"
    };

    const clientErrorMessages = getToolTipMessages();

    let isButtonDisabled = validation.email.isInvalid || 
                           validation.password.isInvalid || 
                           validation.password_confirmation.isInvalid || 
                           validation.username.isInvalid ||
                           validation.checkbox.isInvalid;
    console.log(props.location,props.match );
    return (
        <form onSubmit={ onSubmit }>
            <div className={ "field" + (isFirstExecution.username ? "" : validation.username.isInvalid || serverErrors.name ? errorString : okString) } >
                <input name="username" id="reg-username" type="text" placeholder="Username" onChange={ handleChange } required />
                <label htmlFor="reg-username" data-tip='' data-for='name-error'></label>
                <ReactTooltip id='name-error' place="top" type="error" effect="solid">
                    { clientErrorMessages.name }
                </ReactTooltip>
            </div>
            <div className={ "field" + (isFirstExecution.email ? "" : validation.email.isInvalid || serverErrors.email ? errorString : okString) } >
                <input name="email" id="reg-email" type="email" placeholder="E-mail" onChange={ handleChange } required />
                <label htmlFor="reg-email" data-tip='' data-for='email-error'></label>
                <ReactTooltip id='email-error' place="top" type="error" effect="solid">
                    { clientErrorMessages.email }
                </ReactTooltip>
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

    function getToolTipMessages() {
        const email = serverErrors.email ? <span>{ serverErrorMessages.email }</span> : 
                          !isFirstExecution.email && validation.email.isInvalid ? <span>{ validation.email.message }</span> : null;
    
        const name = serverErrors.name ? <span>{ serverErrorMessages.name }</span> : 
                          !isFirstExecution.username && validation.username.isInvalid ? <span>{ validation.username.message }</span> : null;
    
        return ({
            email,
            name
        });
    }

}

export default Registration;