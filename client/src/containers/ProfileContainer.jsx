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
    
    render() {
        return <Profile { ...this.props } 
                        enter       = { this.enter } 
                        rooms        = { this.state.rooms }  
                        create       = { this.create } 
                        handleChange = { this.handleChange }/>
    }

    handleChange = (e) => {
        const name = e.target.value;
        this.roomName = name;
    }

    create = (e) => {
        e.preventDefault();

        this.socket.emit('createRoom', this.roomName, (name) => {
            this.props.history.push(`/room/${ name }`);
        });
    }

    enter = (e) => {
        // ApiServices.enterRoom().then((response) => {
        //     if (response.status === 'success')
        //         this.props.history.push('/room');
        // })

        const id = e.target.dataset.id;

        this.socket.emit('enterRoom', id, (status) => {
            if (status) {
                this.props.history.push(`/room/${ id }`);
                this.socket.disconnect();
            } else 
                console.log('соси хуй, что то пошшло не так');
        });
    }

    initSocket = () => {
     
        this.socket = io.connect('http://localhost:3000');

        this.socket.on('getDataClient', (rooms) => {
            console.log(rooms);
            this.setState({ rooms });
        });

        this.socket.on('updateClient', (rooms) => {
            this.setState({ rooms });
        });

        this.socket.emit('getDataServer');
        
    }
}

function mapStateToProps(state) {
    return ({
        isExistSession: state.user.isExistSession,
        username: state.user.name
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