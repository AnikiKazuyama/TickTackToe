import React, { Component } from 'react';

import Login from '../components/Login';

import FormValidator from '../utils/FormValidator';

import ApiService from '../utils/ApiService';



class LoginContainer extends Component {

    constructor() {
        super();

        this.validator = new FormValidator([
            { 
                field: 'email', 
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Email is required.' 
            },
            { 
                field: 'email',
                method: 'isEmail', 
                validWhen: true, 
                message: 'That is not a valid email.'
            }, 
            { 
                field: 'password',
                method: 'isEmpty', 
                validWhen: false, 
                message: 'Password is required.'
            }, 
            {
                field: 'password',
                method: 'isLength',
                args: [{ min: 6, max: undefined }],
                validWhen: true, 
                message: 'Password need to be more then 6 characters.'
            }
        ]);

        this.state = {
            checkbox: '',
            email: '', 
            password: '', 
            validation: this.validator.valid()
        };

        this.submitted = false;
    }

    render() {

        let validation = this.validator.validate(this.state) ;   // then check validity every time we render

        let isButtonDisabled = validation.email.isInvalid || validation.password.isInvalid;

        return <Login isButtonDisabled = { isButtonDisabled } 
                      onSubmit = { this.handleFormSubmit } 
                      handleChange = { this.handleInputChange } 
                                     { ...this.props } 
                />;
    }

    handleInputChange = (event) => {
        if ('checkbox' === event.target.type)
            this.setState({ [event.target.name]: event.target.checked });
        else 
            this.setState({ [event.target.name]: event.target.value });
    }

    handleFormSubmit = async event => {

        event.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        if (validation.isValid) {
            const data = {
                email: this.state.email, 
                password: this.state.password
            };

            const response = await ApiService.loginRequest(data);

            if (response.status === 'Success')
                this.props.history.push('/user');
        } 

    }
}

export default LoginContainer;