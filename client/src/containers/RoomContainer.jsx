import React, { Component } from 'react';

import Room from '../components/Room';

import FormValidator from '../utils/FormValidator';

import ApiService from '../utils/ApiService';

import io from 'socket.io-client';



class RoomContainer extends Component {

    constructor() {
        super();
        this.state = {
            room: null
        }
    }

    componentDidMount() {
        this.socket = io.connect('http://localhost:3000');
        

        this.socket.on('updateClient', (room) => {
            this.setState({ room });
        });

        this.socket.on('getDataClient', (room) => {
            this.setState({ room });
        });

        this.socket.emit('getDataServer');
    }

    render() {
        return <Room onClickLeave = { this.leave }
                     room = { this.state.room }
                            { ...this.props } />;
    }

    leave = async () => {
        ApiService.leaveRoom().then(() => {
            this.props.history.push('/profile');
            this.socket.disconnect();
        } );
    }
}

export default RoomContainer;