import React, { Fragment, Component }from 'react';
import { connect } from 'react-redux';

import Auth from '../components/Auth';

class AuthContainer  extends Component {
    
    render() {
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
