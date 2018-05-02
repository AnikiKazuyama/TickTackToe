import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeMessage } from '../actions/inputActions';
import { getMessage } from '../reducers/selectors/message';

import Registration from '../components/Registration';

class RegistrationContainer extends Component {
    render(){
        return <Registration { ...this.props } />;
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        RegistrationHandler: (username, email, password) => {
            dispatch(registration(username, email, password));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);