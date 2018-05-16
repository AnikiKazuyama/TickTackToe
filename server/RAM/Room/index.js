class Room {
    constructor(name) {
        this.name = name;
        this.players = [];        
    }

    getName() {
        return this.name;
    }

    getPlayersCount() {
        return this.players.length;
    }

    enter(user) {
        if (this.isExist(user)) {
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
        if (this.isExist(user)) {
            this.players.splice(this.getUserIndex(user), 1);
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
                return true;
        }
        return false;
    }

    getUserIndex(user) {
        for (let i = 0; i < this.players.length; i++) {
            if (+this.players[i].id == +user.id)
                return i;
        }
        return -1;
    }

}

module.exports = Room;
