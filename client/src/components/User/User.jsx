import React, { Component } from 'react';

import ApiServices from '../../utils/ApiService';

class User extends Component {

    constructor() {
        super();

        this.state = {
            user: null
        }
    }

    componentDidMount() {
        ApiServices.getCurrentUser().then((user) => {
            this.setState({
                user
            });
        }).catch((e) => {
            if (e.response.data.status === 'Error') {
                window.localStorage.removeItem('isAuthenticated');
                this.props.history.push('/');
            }
        });
    }
    render() {

        return this.state.user 
        ?
        <div>
            <p>{this.state.user.email}</p>
        </div>
        :
        <div>Грузимся блять</div>
    }
}

export default User;