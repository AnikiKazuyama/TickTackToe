import React, { Fragment, Component }from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from "react-router-dom";

import io from 'socket.io-client';

import isAuth from '../HOC/IsAuth';

import Auth from '../components/Auth';
import ApiService from '../utils/ApiService';

class AuthContainer  extends Component {

    constructor() {
        super();
        this.socket = io.connect('http://localhost:3000');
        this.state = {
            isLoggedIn: null
        }
    }

    componentDidMount() {
        this.socket.on('isAuthClient', (isAuth) => {
            console.log(isAuth);
            this.setState({isLoggedIn: isAuth});
        });
        this.socket.emit('isAuthServer');
        // ApiService.isAuth().then((response) => {
        //     this.setState({isLoggedIn: response.status === 'Success'});
        // }).catch((e) => {
        //     if (e.response.data.status === 'Error')
        //         this.setState({isLoggedIn: false});
        // });
    }

    render() {
        
            if (this.state.isLoggedIn)
                return <Redirect to="/user"/>

                return(
                    <Fragment>
                        <label className="watermark">DEEPLEARNINGINMYASS PRODUCTION</label>
                        <Auth { ...this.props } socket = { this.socket } /> 
                    </Fragment>
                );
    }
}

const mapStateToprops = (state) => {
    return {
    
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToprops, mapDispatchToProps)(AuthContainer);
