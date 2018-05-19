import React, { Component } from 'react';

import { connect } from 'react-redux';

import Profile from '../components/Profile';

import { logout } from '../actions/userActions';

import ApiServices from '../utils/ApiService';

import io from 'socket.io-client';

class ProfileContainer extends Component {

    constructor() {
        super();

        this.roomName = '';

        this.state = {
            rooms: null
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
        return <Profile { ...this.props } 
                        enter       = { this.enter } 
                        rooms        = { this.state.rooms }  
                        create       = { this.create } 
                        handleChange = { this.handleChange }/>
    }

    initSocket = () => {
        if (!this.props.socket)
        return;

        this.props.socket.on('getDataClient', (rooms) => {
            this.setState({ rooms });
        });

        this.props.socket.on('updateClient', (rooms) => {
            this.setState({ rooms });
        });

        this.props.socket.emit('getDataServer');
        
    }

    removeListeners() {
        if (!this.props.socket)
            return;

        this.props.socket.removeAllListeners('getDataClient');
        this.props.socket.removeAllListeners('updateClient');
    }

    handleChange = (e) => {
        const name = e.target.value;
        this.roomName = name;
    }

    create = (e) => {
        e.preventDefault();

        this.props.socket.emit('createRoom', this.roomName, (name) => {
            this.props.history.push(`/room/${ name }`);
        });
    }

    enter = (e) => {
        const id = e.target.dataset.id;

        this.props.socket.emit('enterRoom', id, (status) => {
            if (status) {
                this.props.history.push(`/room/${ id }`);
            } else 
                console.log('соси хуй, что то пошшло не так');
        });
    }
}

function mapStateToProps(state) {
    return ({
        isExistSession: state.user.isExistSession,
        username: state.user.name, 
        socket: state.user.socket
    });
}

function mapDispatchToProps(dispatch) {
    return({
        exit: function() {
            dispatch(logout());
        }
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);