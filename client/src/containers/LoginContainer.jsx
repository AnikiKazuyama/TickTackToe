import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../components/Login';

import FormValidator from '../utils/FormValidator';

import ApiService from '../utils/ApiService';

import { login } from '../actions/userActions';

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
            validation: this.validator.valid(),
            isError: false,
            isLoading: false
        };

        this.submitted = false;
    }

    componentWillReceiveProps(props) {
        if (props.isLoggedIn)
            this.props.history.push('/')
        else
            this.setState({ 
                isError: !props.isLoggedIn,
                isLoading: props.isLoading
            });
    }

    render() {

        let validation = this.validator.validate(this.state) ;

        let isButtonDisabled = validation.email.isInvalid || validation.password.isInvalid;

        return <Login isLoading = { this.state.isLoading }
                      isError = { this.state.isError }
                      isButtonDisabled = { isButtonDisabled } 
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

    handleFormSubmit =  event => {
        event.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation, isLoading: true });
        this.submitted = true;

        if (validation.isValid)
            this.props.login(this.state.email, this.state.password);
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.user.loaders.signInLoading, 
        isLoggedIn: state.user.isLoggedIn
    }
}

function mapDispatchToPrors(dispatch) {
    return {
        login: (email, password) => {
            dispatch(login(email, password));
        }
    }
}



export default connect(mapStateToProps, mapDispatchToPrors)(LoginContainer);