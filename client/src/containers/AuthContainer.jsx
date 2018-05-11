import React, { Fragment, Component }from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import isAuth from '../HOC/IsAuth';

import Auth from '../components/Auth';
import ApiService from '../utils/ApiService';

class AuthContainer  extends Component {

    componentDidMount() {
        if (this.props.isLoggedIn)
            this.props.history.push('/user');
    }

    render() {   
        return(
            <Fragment>
                <label className="watermark">DEEPLEARNINGINMYASS PRODUCTION</label>
                <Auth { ...this.props }/> 
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.user.isLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
