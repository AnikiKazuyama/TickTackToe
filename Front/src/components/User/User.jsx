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
            if (e.response.data.status === 'Error')
                this.props.history.push('/');
        });
    }
    
    render() {

        return this.state.user 
        ?
        <div>
            <h1>{this.state.user.email}</h1>
            <button onClick={ this.exit }>Выйти</button>
            <button onClick={ this.enter }>Войти в комнату</button>
        </div>
        :
        <div>Грузимся блять</div>
    }

    exit = async () => {
        ApiServices.logoutRequest().then((response) => {
            this.props.history.push('/auth');
        })
    }

    enter = async () => {
        ApiServices.enterRoom().then((response) => {
            if (response.status === 'Success')
                this.props.history.push('/room');
        })
    }
}

export default User;