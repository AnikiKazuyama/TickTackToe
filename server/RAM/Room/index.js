const TicTacToe = require('../TicTacToe');

class Room {
    constructor(name) {
        this.name = name;
        this.players = [];
        this.game = new TicTacToe();
        this.isStarted = false;
        this.whoseTurn = null;
        this.winner = null;
    }

    getName() {
        return this.name;
    }

    getPlayersCount() {
        return this.players.length;
    }

    enter(user) {
        if (this.isExist(user)) {
            console.log('Уже существует, пропускаем');
            return true;
        }

        if (this.players.length < 2) {
            this.addPlayer(user);
            if (this.players.length == 2)
                this.startGame();
        }
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

    startGame() {
        console.log("Game is started");
        this.isStarted = true;
        this.whoseTurn = 0;
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

    turn(who, id) {
        console.log(who.name + " called turn");
        if (this.isExist(who) && this.isStarted && this.whoseTurn == this.getUserIndex(who)) {
            const result = this.getUserIndex(who) == 1 ? this.game.XTurn(id) : this.game.OTurn(id);
            if (result) {
                console.log(who.name + " - winner");
                this.winner = this.getUserIndex(who);
                this.isStarted = false;
                this.whoseTurn = null;
            } else
                this.whoseTurn = this.whoseTurn == 0 ? 1 : 0;
            return true;
        } else
            return false;
    }


}

module.exports = Room;
