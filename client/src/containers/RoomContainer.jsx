import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

import Room from '../components/Room';

import FormValidator from '../utils/FormValidator';

import ApiService from '../utils/ApiService';

class RoomContainer extends Component {

    constructor(props) {
        super();
        this.roomID = props.match.params.id;
        this.state = {
            room: null
        }
        this.selfId = -1;
        this.opponentId = -1;
    }

    componentDidMount() {
        if(!this.props.isExistSession) 
            this.props.history.push('/auth');

        this.initSocket();
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.isExistSession) 
             this.props.history.push('/auth');
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    render() {
        if (this.state.room) {
            this.state.room.winner ? alert(this.state.room.players[this.state.room.winner].name + " Winner!") : null;
            this.state.room.players.map((player, index) => {
                if (player.name === this.props.username)
                    this.selfId = index;
                else 
                    this.opponentId = index;
            });
        }

        return (<Room selfId = { this.selfId }
                      opponentId = { this.opponentId }
                      handleFieldClick = { this.handleFieldClick }
                      onClickLeave = { this.leave }
                      room = { this.state.room }
                            { ...this.props } />
        );
    }

    initSocket = () => {
        if (!this.props.socket)
            return;

            this.props.socket.on('updateRoomClient', (room) => {
            this.setState({ room });
        });

        this.props.socket.on('getRoomDataClient', (room) => {
            this.setState({ room });
        });

        this.props.socket.emit('getRoomDataServer', this.roomID);
    }

    removeListeners() {
        if (!this.props.socket)
            return;
        
        this.props.socket.removeAllListeners('updateRoomClient');
        this.props.socket.removeAllListeners('getRoomDataClient');
    }

    leave = () => {
        this.props.socket.emit('leaveRoom', this.roomID, () => {
            this.props.history.push('/profile');
        });
    }

    handleFieldClick = (id) => {
        if (this.state.room.isStarted && this.state.room.whoseTurn == this.selfId)
            this.props.socket.emit('turn', id);
    }
}

function mapStateToProps(state) {
    return {
        socket: state.user.socket, 
        username: state.user.name,
        isExistSession: state.user.isExistSession
    }
}

export default connect(mapStateToProps, null)(RoomContainer);