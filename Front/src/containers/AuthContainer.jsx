import React, { Component }from 'react';
import { connect } from 'react-redux';

import Auth from '../components/Auth';

class AuthContainer  extends Component {
    
    render() {
        return(
            <Auth { ...this.props }/> 
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
