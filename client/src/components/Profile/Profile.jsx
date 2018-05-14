import React, { Component } from 'react';

import CSSModules from 'react-css-modules';

import styles from './style.scss';

import ApiServices from '../../utils/ApiService';

class Profile extends Component {
    
    render() {
        return(
            <section className="wrapper-profile">
                <div className="profile">
                    <button title="Exit" className="circle-button exit" onClick={ this.props.exit } />
                    <button title="Settings" className="circle-button settings" />
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
                        <div style={{borderColor: '#077480'}} className="room-item default-mod">
                            <div className="container">
                                <span className="room-name">My room 1</span>
                                <button className="enter-button" onClick={ this.props.enter } />
                            </div>
                        </div>
                        <div style={{borderColor: '#7fcf6f'}} className="room-item default-mod">
                            <div className="container">
                                <span className="room-name">My room 2</span>
                                <button className="enter-button" onClick={ this.props.enter } />
                            </div>
                        </div>
                        <div style={{borderColor: '#548978'}} className="room-item default-mod">
                            <div className="container">
                                <span className="room-name">My room 3</span>
                                <button className="enter-button" onClick={ this.props.enter } />
                            </div>
                        </div>
                        <div style={{borderColor: '#820957'}} className="room-item default-mod">
                            <div className="container">
                                <span className="room-name">My room 4</span>
                                <button className="enter-button" onClick={ this.props.enter } />
                            </div>
                        </div>
                    </main>
                </div>
            </section>
        );
    }
}

export default CSSModules(Profile, styles);