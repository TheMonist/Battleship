const Gameboard = requrie('./gameboard');

function Player(id) {
    return {
        turn: false,
        player: id,
        gameboard: null,
        enemy: null,
        attacks: [],
        winner: null,

        createBoard() {
            return this.gameboard = Gameboard(this.player);
        },

        createEnemy(enemy) {
            return this.enemy = enemy;
        },

        switchTurn() {
            return this.turn = !this.turn;
        },

        attack([x, y]) {
            if(this.turn === true && this.attack.includes([x, y])) {
                this.enemy.gameboard.receiveAttack([x, y]);

                this.attack.push([x, y]);

                this.switchTurn();
                this.enemy.switchTurn();
            }
        }
    } 
}

module.exports = Player;