class Room {
    constructor() {
        this.players = [];        
    }

    enter(user) {
        if (this.isExist(user) != -1) {
            console.log('Уже существует, пропускаем')
            return true;
        }

        if (this.players.length < 2) 
                this.addPlayer(user);
        else 
            return false;

        return true;

    }

    leave(user) {
        if (this.isExist(user) != -1) {
            this.players.splice(this.isExist(user), 1);
            return true;
        }
        return false;
    }

    addPlayer(user) {
        this.players.push(user);
    }

    isExist(user) {
        for (let i = 0; i < this.players.length; i++) {
            if (+this.players[i].id == +user.id)
                return i;
        }
        return -1;
    }

}

module.exports = Room;
