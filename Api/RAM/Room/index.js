class Room {
    constructor() {
        this.players = [];        
    }

    connect(user) {
        if(this.players.length >= 2) 
            return false;
        else 
            this.addPlayer(user);
        return true;

    }

    addPlayer(user) {
        this.players.push(user);
    }

}

module.exports = Room;
