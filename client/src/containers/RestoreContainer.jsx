import React, { Component } from 'react';

import FormValidator from '../utils/FormValidator';

import Restore from '../components/Restore';



class RestoreContainer extends Component {

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
            }
        ]);

        this.state = {
            email: '', 
            validation: this.validator.valid()
        };

        this.submitted = false;
    }

    render() {

        let validation = this.validator.validate(this.state) ;   // then check validity every time we render

        let isButtonDisabled = validation.email.isInvalid;

        return <Restore isButtonDisabled = { isButtonDisabled } 
                        onSubmit         = { this.handleFormSubmit } 
                        handleChange     = { this.handleInputChange } 
                                           { ...this.props } />;
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
            
        } 

    }


}

export default RestoreContainer;