import React from "react";
import { Link } from "react-router-dom";

const Restore = (props) => {

    const { handleChange, onSubmit, isButtonDisabled } = props;

    return (
        <form onSubmit = { onSubmit } action="" method="post">
            <div className="username">
                <input name="email" id="restore-email" type="text" placeholder="E-mail" onChange = { handleChange } required />
                <label htmlFor="restore-email"></label>
            </div>
            <div className="buttons">
                <button type="submit" className="sign-in default-button" disabled = {isButtonDisabled}>Send</button>
                <Link to="/auth" className="cancel default-button">Cancel</Link>
            </div>
        </form>
    );
}

export default Restore;