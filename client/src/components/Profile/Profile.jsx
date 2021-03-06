import React, { Component } from 'react';

import CSSModules from 'react-css-modules';

import styles from './style.scss';

import ApiServices from '../../utils/ApiService';

import { TransitionGroup, CSSTransition } from "react-transition-group";

class Profile extends Component {
    
    render() {
        return(
            <section className="wrapper-profile">
                <div className="profile">
                    <button title="Exit" className="circle-button exit profile-button" onClick={ this.props.exit } />
                    <button title="Settings" className="circle-button settings profile-button" />
                    <header>
                        <div className="avatar"></div>
                        <div className="info">
                            <h3>{this.props.username}</h3>
                            <span>ONLINE</span>
                        </div>
                        <nav className="navigation">
                            <span className="active">Rooms</span>
                            <span>Messages</span>
                            <span>History</span>
                        </nav>
                    </header>
                    <main className="rooms">
                        <form className="room-create" onSubmit = { this.props.create }>
                            <input type="text" onChange = { this.props.handleChange } placeholder="CREATE YOUR ROOM"/>
                        </form>
                        { this.props.rooms ? this.renderRooms() : null }
                    </main>
                </div>
            </section>
        );
    }

    renderRooms() {
        const rooms = this.props.rooms;
        let roomsContainer = [];

        for(const key in rooms) {
            roomsContainer.push((
                <div key = { key } style={{borderColor: '#077480'}} className="room-item default-mod">
                    <div className="container">
                        <span className="room-name">{ rooms[key].name }</span>
                        <button data-id = { key } className="enter-button" onClick={ this.props.enter } />
                    </div>
                </div>
            ));
        }

        return roomsContainer;
    }
}

export default CSSModules(Profile, styles);