import React, { Component } from 'react';

import FormValidator from '../utils/FormValidator';

import Registration from '../components/Registration';

import ApiService from '../utils/ApiService';

class RegistrationContainer extends Component {

    constructor() {
        super();

        this.validator = new FormValidator([
            { 
                field: 'checkbox',
                method: this.isChecked,
                validWhen: true,
                message: 'Checkbox is not checked.'
            },
            { 
                field: 'username',
                method: 'isLength',
                args: [{ min: 3, max: 30 }],
                validWhen: true, 
                message: 'That is not a valid username.'
            },
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
            },
            {
                field: 'password_confirmation',
                method: this.passwordMatch,
                validWhen: true, 
                message: 'Password need to be same.'
            },
            {
                field: 'password_confirmation',
                method: 'isLength',
                validWhen: true, 
                args: [{ min: 6, max: undefined }], 
                message: 'Password need to be.'
            }
        ]);

        this.state = {
            checkbox: '',
            username: '',
            email: '', 
            password: '', 
            password_confirmation: '',
            isLoading: false
        };

        this.isFirstExecution = {
            checkbox: true,
            username: true,
            email: true, 
            password: true, 
            password_confirmation: true
        }

        this.submitted = false;
    }

    render() {
        return <Registration 
                    isLoading        = { this.state.isLoading }
                    isFirstExecution = { this.isFirstExecution }
                    validation       = { this.validator.validate(this.state) } 
                    onSubmit         = { this.handleFormSubmit } 
                    handleChange     = { this.handleInputChange } 
                                       { ...this.props } 
                />;
    }

    handleInputChange = (event) => {
        if ('checkbox' === event.target.type)
            this.setState({ [event.target.name]: event.target.checked });
        else
            this.setState({ [event.target.name]: event.target.value });

        this.isFirstExecution[event.target.name] = false;
    }

    handleFormSubmit = async event => {
        event.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation, isLoading: true });
        this.submitted = true;

        if (validation.isValid) {
            const data = {
                name: this.state.username, 
                email: this.state.email, 
                password: this.state.password
            };

            const response = await ApiService.registrationRequest(data);

            if (response.status === 'Success') {
                ApiService.loginRequest(
                    {email: this.state.email, password: this.state.password}
                ).then((response) => {
                    this.setState({ isLoading: false });
                    if (response.status === 'Success')
                        this.props.history.push('/user');
                })
            }
        } 

    }

    passwordMatch = (confirmation, state) => (state.password === confirmation);

    isChecked = (confirmation, state) => (state.checkbox);

    
}


export default RegistrationContainer;