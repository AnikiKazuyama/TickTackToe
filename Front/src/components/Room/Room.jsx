import React, { Component } from 'react';

import io from 'socket.io-client';

import ApiServices from '../../utils/ApiService';

class Room extends Component {

    constructor() {
        super();

        this.socket = io.connect('http://localhost:3000');

        this.state = {
            room: null
        }
    }

    componentDidMount() {
        this.socket.on('enterClient', (room) => {
            console.log(room);
            this.setState({ room });
        });

        this.socket.on('leaveClient', (room) => {
            this.setState({ room });
        });

        this.socket.emit('enterServer');
        // ApiServices.getRoomState().then((response) => {
        //     this.setState({
        //         room: response.room
        //     });
        // }).catch((e) => {
        //     if (e.response.data.status === 'Error')
        //         this.props.history.push('/');
        // });
    }
    
    render() {

        return this.state.room != null
        ?
        <div>
            <h1>Игроки:</h1>
            <div>{this.state.room.players.map(player => <div>{player.name}</div>)}</div>
            <button onClick={ this.click }>Выйти</button>
        </div>
        :
        <div>Грузимся блять</div>
    }

    click = async () => {
        ApiServices.logoutRequest().then((response) => {
            this.props.history.push('/auth');
        })
    }
}

export default Room;