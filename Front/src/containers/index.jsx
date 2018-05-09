import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Root from '../components'


class RootContainer extends Component {

    render(){
        return(
            <Root { ...this.props }/>
        );
    }
}

export default RootContainer;