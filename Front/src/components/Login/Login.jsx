import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <form action="" method="post">
            <div className="username">
                <input name="email" id="name" type="text" placeholder="E-mail" required />
                <label htmlFor="name"></label>
            </div>
            <div className="password">
                <input name="password" id="password" type="password" placeholder="Password" required />
                <label htmlFor="password"></label>
            </div>
            <div className="buttons">
                <button type="submit" className="sign-in default-button">Sign in</button>
                <Link to="/auth/registration" className="register default-button">Register</Link>
            </div>
            <div className="additional">
                <input className="default-checkbox" id="remember" type="checkbox" />
                <label htmlFor="remember">Remember me</label>
                <a className="additional_forgot-password">Forgot password?</a>
            </div>
        </form>
    );
}

export default Login;