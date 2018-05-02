import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeMessage } from '../actions/inputActions';
import { getMessage } from '../reducers/selectors/message';

import Login from '../components/Login';

class LoginContainer extends Component {
    render(){
        return <Login { ...this.props } />;
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginHandler: (email, password) => {
            dispatch(login(email, password));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);