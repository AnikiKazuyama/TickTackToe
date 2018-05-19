import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

import Room from '../components/Room';
import Field from '../components/Field';

import FormValidator from '../utils/FormValidator';

import ApiService from '../utils/ApiService';

class RoomContainer extends Component {

    constructor(props) {
        super();
        this.roomID = props.match.params.id;
        this.state = {
            room: null
        }
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
        return (
            <Fragment>
                <Room onClickLeave = { this.leave }
                     room = { this.state.room }
                            { ...this.props } />
                <Field { ...this.props } />
            </Fragment>
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
}

function mapStateToProps(state) {
    return {
        socket: state.user.socket, 
        isExistSession: state.user.isExistSession
    }
}

export default connect(mapStateToProps, null)(RoomContainer);