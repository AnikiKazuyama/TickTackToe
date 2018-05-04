import React, { Component } from 'react';

import FormValidator from '../utils/FormValidator';

import Registration from '../components/Registration';

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
                args: [{ min: 3, max: undefined }],
                validWhen: true, 
                message: 'Password need to be more then 3 characters.'
            },
            {
                field: 'password_confirmation',
                method: this.passwordMatch,
                validWhen: true, 
                message: 'Password need to be same.'
            }
        ]);

        this.state = {
            checkbox: '',
            username: '',
            email: '', 
            password: '', 
            password_confirmation: '', 
            validation: this.validator.valid()
        };

        this.submitted = false;
    }

    render() {
        let validation = this.validator.validate(this.state) ;   // then check validity every time we render

        let isButtonDisabled = validation.email.isInvalid || 
                               validation.password.isInvalid || 
                               validation.password_confirmation.isInvalid || 
                               validation.username.isInvalid ||
                               validation.checkbox.isInvalid;

        return <Registration 
                    isButtonDisabled = { isButtonDisabled } 
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
    }

    handleFormSubmit = async event => {
        event.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        if(validation.isValid){
            alert('Субмит');
            //Вызов апи
        } 

    }

    passwordMatch = (confirmation, state) => (state.password === confirmation);

    isChecked = (confirmation, state) => (state.checkbox);

    
}


export default RegistrationContainer;