import React from "react";
import { Link } from "react-router-dom";

const Registration = () => {
    return (
        <form>
            <div className="username">
                <input id="username" type="text" placeholder="Username" required />
                <label htmlFor="username"></label>
            </div>
            <div className="email">
                <input id="email" type="email" placeholder="E-mail" required />
                <label htmlFor="email"></label>
            </div>
            <div className="password">
                <input id="password" type="password" placeholder="Password" required />
                <label htmlFor="password"></label>
            </div>
            <div className="confirm-password">
                <input id="confirm-password" type="password" placeholder="Confirm password" required />
                <label htmlFor="confirm-password"></label>
            </div>
            <div className="additional">
                <input className="default-checkbox" id="confirm" type="checkbox" />
                <label htmlFor="confirm" required>I agree to the terms of service</label>
            </div>
            <div className="buttons">
                <a className="register default-button">Register</a>
                <Link to="/auth" className="cancel default-button">Cancel</Link>
            </div>
        </form>
    );
}

export default Registration;