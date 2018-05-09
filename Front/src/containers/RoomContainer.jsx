import React, { Component } from 'react';

import Room from '../components/Room';

import FormValidator from '../utils/FormValidator';

import ApiService from '../utils/ApiService';

import io from 'socket.io-client';



class RoomContainer extends Component {

    constructor() {
        super();

        this.socket = io.connect('http://localhost:3000');

        this.state = {
            room: null
        }
    }

    componentDidMount() {
        this.socket.on('enterClient', (room) => {
            this.setState({ room });
        });

        this.socket.on('leaveClient', (room) => {
            this.setState({ room });
        });

        this.socket.emit('enterServer');
    }

    render() {
        return <Room    onClickLeave = { this.leave }
                        room = { this.state.room }
                            { ...this.props } />;
    }

    leave = async () => {
        ApiService.leaveRoom().then(() => {
            this.props.history.push('/user');
            this.socket.emit('leaveServer');
        } );
    }
}

export default RoomContainer;