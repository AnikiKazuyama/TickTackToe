import React, { Fragment, Component }from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from "react-router-dom";

import isAuth from '../HOC/IsAuth';

import Auth from '../components/Auth';
import ApiService from '../utils/ApiService';

class AuthContainer  extends Component {

    constructor() {
        super();

        this.state = {
            isLoggedIn: null
        }
    }

    componentDidMount() {
        ApiService.isAuth().then((response) => {
            this.setState({isLoggedIn: response.status === 'Success'});
        }).catch((e) => {
            if (e.response.data.status === 'Error')
                this.setState({isLoggedIn: false});
        });
    }

    render() {
        if (this.state.isLoggedIn)
            return <Redirect to="/user"/>
        else 
            if (this.state.isLoggedIn == null)
                return null;
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
