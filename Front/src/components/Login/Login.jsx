import React from "react";
import { Link } from "react-router-dom";

const Login = (props) => {

    const errorString = " error";
    const loadingString = " loading";

    const { handleChange, onSubmit, isButtonDisabled, isError, isLoading } = props;

    return (
        <form onSubmit = { onSubmit } action="" method="post">
            <div className={ "field" + (isError ? errorString : "") }>
                <input name="email" id="login-email" type="text" placeholder="E-mail" onChange = { handleChange } required />
                <label htmlFor="login-email"></label>
            </div>
            <div className={ "field" + (isError ? errorString : "") }>
                <input name="password" id="login-password" type="password" placeholder="Password" onChange = { handleChange } required />
                <label htmlFor="login-password"></label>
            </div>
            <div className="buttons">
                <button type="submit" className={"sign-in default-button" + (isLoading ? loadingString : "") } disabled = {isButtonDisabled}>Sign in</button>
                <Link to="/auth/registration" className="register default-button">Register</Link>
            </div>
            <div className="additional">
                <input name="checkbox" className="default-checkbox" id="remember" type="checkbox" />
                <label htmlFor="remember">Remember me</label>
                <Link to="/auth/restore" className="additional_forgot-password">Forgot password?</Link>
            </div>
        </form>
    );
}

export default Login;