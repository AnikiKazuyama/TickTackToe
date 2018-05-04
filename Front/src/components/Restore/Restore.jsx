import React from "react";
import { Link } from "react-router-dom";

const Restore = (props) => {

    const { handleChange, onSubmit, isButtonDisabled } = props;

    return (
        <form onSubmit = { onSubmit } action="" method="post">
            <h3 className="title">To recover your password, please enter your email which you gave during registration</h3>
            <div className="email">
                <input name="email" id="restore-email" type="text" placeholder="E-mail" onChange = { handleChange } required />
                <label htmlFor="restore-email"></label>
            </div>
            <div className="buttons buttons-restore">
                <button type="submit" className="sign-in default-button" disabled = {isButtonDisabled}>Continue</button>
                <Link to="/auth" className="cancel default-button">Cancel</Link>
            </div>
        </form>
    );
}

export default Restore;