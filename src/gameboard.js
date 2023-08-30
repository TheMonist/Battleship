import './ship.js';

function Gameboard(player) {
    return {
        player: player,
        ships: [],
        misses: [],

        placeShip(ship, [x, y]) {

            ship.startCoord = [x, y];

            if (ship.direction === 'horizontal') ship.endCoord = [(x + (ship.length - 1)), y];
            else ship.endCoord = [x, (y - (ship.length - 1))];

            this.ships.push(ship);
            return ship.endCoord;
        },

        receiveAttack([x, y]) {
            let hit = false;

            for (let i = 0; i < this.ships.length; i++) {
                if (this.ships[i].direction === 'horizontal') {
                    if(y === this.ships[i].startCoord[1] && x >= this.ships[i].startCoord[0] && x <= this.ships.endCoord[0]) {
                        this.ships[i].hit();
                        hit = true;
                        this.ships[i].isSunk();
                    }
                }

                if (this.ships[i].direction === 'vertical') {
                    if (x === this.ships[i].startCoord[0] && y <= this.ships[i].startCoord[1] && y >=this.ships[i].endCoord[1]){
                        this.ships[i].hit()
                        hit = true;
                        this.ships[i].isSunk();
                    }
                }
            }

            if (hit === false) this.misses.push([x ,y]);

            return hit
        },

        allSunk() {
            return this.ships.every(ship => ship.sunk === true);
        }
    }
}

module.exports = Gameboard;