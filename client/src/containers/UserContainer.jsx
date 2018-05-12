import React, { Component } from 'react';

import { connect } from 'react-redux';

import User from '../components/User';

import { logout } from '../actions/userActions';

import ApiServices from '../utils/ApiService';

class UserContainer extends Component {

    componentDidMount() {
        if(!this.props.isExistSession) 
            this.props.history.push('/auth');
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.isExistSession) 
             this.props.history.push('/auth');
    }
    
    render() {
        return <User { ...this.props } enter = { this.enter } />
    }

    enter = async () => {
        ApiServices.enterRoom().then((response) => {
            if (response.status === 'success')
                this.props.history.push('/room');
        })
    }
}

function mapStateToProps(state) {
    return ({
        isExistSession: state.user.isExistSession,
        username: state.user.name
    });
}

function mapDispatchToProps(dispatch) {
    return({
        exit: function() {
            dispatch(logout());
        }
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);