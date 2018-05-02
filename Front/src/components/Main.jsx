import React, { Component, Fragment } from 'react';
import { Route } from "react-router-dom";

import AuthContainer from '../containers/AuthContainer';

class Main extends Component {
    
    constructor(props){
        super(props);

        this.defaultMessage = props.message;

    }

    render() {

        const { message } = this.props;

        const responseMessage = message.length ? message : this.defaultMessage;

        return(
            <AuthContainer />
        );
    }

    handleChange = (e) => {
        const { changeMessage } = this.props;
        const newMessage = e.target.value;

        changeMessage(newMessage);
    }

}

export default Main;