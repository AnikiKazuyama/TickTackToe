import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeMessage } from '../actions/inputActions';
import { getMessage } from '../reducers/selectors/message';

import Main from '../components/Main';

class MainContainer extends Component {
    render(){
        return <Main { ...this.props } />;
    }
}

const mapStateToProps = (state) => {
    return {
        message: getMessage(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMessage: (message) => {
            dispatch(changeMessage(message));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);