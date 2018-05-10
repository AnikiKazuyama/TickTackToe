import React, { Fragment, Component }from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from "react-router-dom";

import isAuth from '../HOC/IsAuth';

import Auth from '../components/Auth';
import ApiService from '../utils/ApiService';

class AuthContainer  extends Component {

    render() {
        if (window.localStorage.getItem('isAuthenticated'))
            return <Redirect to="/user"/>
        else 
            return(
                <Fragment>
                    <label className="watermark">DEEPLEARNINGINMYASS PRODUCTION</label>
                    <Auth { ...this.props }/> 
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
