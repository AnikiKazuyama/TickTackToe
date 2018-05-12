import React, { Fragment, Component }from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Auth from '../components/Auth';
import ApiService from '../utils/ApiService';

class AuthContainer  extends Component {

    componentDidMount() {
        if (this.props.isExistSession)
            this.props.history.push('/user');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isExistSession)
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
        isExistSession: state.user.isExistSession
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
