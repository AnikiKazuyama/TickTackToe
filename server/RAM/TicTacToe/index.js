class TicTacToe {
    constructor() {
        this.field = Array(9).fill(null);
        // this.field = [true, false, false, 
        //               null, null, null, 
        //               null, null, true]
        this.template = [
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [1,4,7],
            [2,5,8],
            [3,6,9],
            [1,5,9],
            [3,5,7]
        ];
    }

    XTurn(id){
        this.field[id] = false;
        return this.isWinner(false);
    }

    OTurn(id){
        this.field[id] = true;
        return this.isWinner(true);
    }

    getField() {
        return this.field;
    }

    isWinner(who) {
        const turns = this.getTurns(who);
        let isWinner = false;
        for (let i = 0; i < this.template.length; i++) {
            if (turns.indexOf(this.template[i][0]) != -1 &&
                turns.indexOf(this.template[i][1]) != -1 &&
                turns.indexOf(this.template[i][2]) != -1) {
                isWinner = true;
                break;
            }
        }
        return isWinner;
    }

    getTurns(who) {
        let turns = new Array();
        this.field.forEach((item, index) => {
            if (item == who)
                turns.push(index + 1);
        });
        return turns;
    }

}

module.exports = TicTacToe;