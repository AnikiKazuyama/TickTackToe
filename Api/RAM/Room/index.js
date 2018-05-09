class Room {
    constructor() {
        this.players = [];        
    }

    connect(user) {
        if (this.players.length < 2) {
            if (this.players.length == 1 && this.players[0].name == user.name)
                return false;

                this.addPlayer(user);
        } else 
            return false;

        return true;

    }

    addPlayer(user) {
        this.players.push(user);
    }

}

module.exports = Room;
