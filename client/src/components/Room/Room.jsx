import React, { Component } from 'react';

import ApiServices from '../../utils/ApiService';

class Room extends Component {
    
    render() {
        const room = this.props.room;

        return room != null
        ?
        <div>
            <h1>Игроки:</h1>
            {room.players.map(player => <div key={player.id} >{ player.name }</div> )}
            <button onClick={ this.props.onClickLeave }>Выйти из комнаты</button>
        </div>
        :
        <div>Грузимся блять</div>
    }
}

export default Room;