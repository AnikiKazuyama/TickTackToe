import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom'
import Root from '../components'

import { getUser } from '../actions/userActions';

class RootContainer extends Component {

    constructor() {
        super();
        this.count = 0;
    }

    componentDidMount() {
        this.props.getUser();
    }

    render(){
        console.log('render')
        if (this.props.isLoading || this.props.isLoading == null)
            return null;
        else
            return(
                <Root { ...this.props }/>
            );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.user.loaders.getCurrentLoading, 
        isLoggedIn: state.user.isExistSession
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: () => {
            dispatch(getUser());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);