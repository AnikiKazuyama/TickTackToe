import React, { Component } from 'react';

import ApiServices from '../../utils/ApiService';
import Field from '../../components/Field';

import CSSModules from 'react-css-modules';

import styles from './style.scss';

class Room extends Component {
    render() {
        const room = this.props.room;
        return room != null
        ?
        <section className="wrapper-room">
            <div className="room">
                <div username={ this.props.opponentId != -1 ? room.players[this.props.opponentId].name : "..." } className="avatar-opponent"></div>
                <Field game = { room.game } handleFieldClick = { this.props.handleFieldClick } />
                <div username={ this.props.selfId != -1 ? room.players[this.props.selfId].name : room.players[1] ? room.players[1].name : "..." } className="avatar"></div>
                <button onClick={ this.props.onClickLeave } title="Leave" className="circle-button exit room-button" />
            </div>
        </section>
        :
        <div>Грузимся блять</div>
    }
}

export default CSSModules(Room, styles);