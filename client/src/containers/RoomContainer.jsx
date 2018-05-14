import React, { Component } from 'react';

import Room from '../components/Room';

import FormValidator from '../utils/FormValidator';

import ApiService from '../utils/ApiService';

import io from 'socket.io-client';

class RoomContainer extends Component {

    constructor(props) {
        super();
        this.roomID = props.match.params.id;
        this.state = {
            room: null
        }
    }

    componentDidMount() {
        this.socket = io.connect('http://localhost:3000');

        this.socket.on('updateRoomClient', (id, room) => {
            if (id == this.roomID)
                this.setState({ room });
        });

        this.socket.on('getRoomDataClient', (room) => {
            this.setState({ room });
        });

        this.socket.emit('getRoomDataServer', this.roomID);
    }

    render() {
        console.log(this.state.room);
        return <Room onClickLeave = { this.leave }
                     room = { this.state.room }
                            { ...this.props } />;
    }

    leave = () => {
        // ApiService.leaveRoom().then(() => {
        //     this.props.history.push('/profile');
        //     this.socket.disconnect();
        // } );
        this.socket.emit('leaveRoom', this.roomID, () => {
            this.props.history.push('/profile');
            this.socket.disconnect();
        });
    }
}

export default RoomContainer;