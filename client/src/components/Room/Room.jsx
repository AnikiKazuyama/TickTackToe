import React, { Component } from 'react';

import ApiServices from '../../utils/ApiService';
import Field from '../../components/Field';

import CSSModules from 'react-css-modules';

import styles from './style.scss';

class Room extends Component {
    
    render() {

        const room = this.props.room;
        let selfId = -1;
        let opponentId = -1;
        if (room) {
            room.players.map((player, index) => {
                if (player.name === this.props.username)
                    selfId = index;
                else 
                    opponentId = index;
            });
        }
        return room != null
        ?
        <section className="wrapper-room">
            <div className="room">
                <div username={ opponentId != -1 ? room.players[opponentId].name : "..." } className="avatar-opponent"></div>
                <Field { ...this.props.game } />
                <div username={ selfId != -1 ? room.players[selfId].name : room.players[1] ? room.players[1].name : "..." } className="avatar"></div>
                <button onClick={ this.props.onClickLeave } title="Leave" className="circle-button exit room-button" />
            </div>
        </section>
        :
        <div>Грузимся блять</div>
    }
}

export default CSSModules(Room, styles);