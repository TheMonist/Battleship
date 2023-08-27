//import './ship.js';

const Gameboard = () => {
    let ships = [];
    let misses = [];
        
    const placeShip = ((ship, [x, y]) => {
        ship.startCoord = [x, y];

        if (ship.direction === 'horizontal') ship.endCoord = [(x + (ship.length - 1)), y]; 
        else ship.endCoord = [x, (y - (ship.length - 1))];

        this.ships.push(ship);

        return ship.endCoord;
    })();

    const receiveAttack = ([x, y]) => {
        //function to take attacks
        let hit = false;

        for (let i = 0; i < this.ships.length; i++) {
            if (this.ships[i].direction === 'horizontal') {
                if (y === ships[i].startCoord[1] && x >= ships[i].startCoord[0] && x <= ships[i].endCoord[0]) {
                    ships[i].hit();
                    hit = true; 

                    ships[i].isSunk();
                }
            }

            if (ships[i].direction == 'vertical') {
                if (x == ships[i].startCoord[1] && y >= ships[i].startCoord[1] && y <= ships[i].endCoord[0]) {
                    ships[i].hit();
                    hit = true;

                    ships[i].isSunk();
                }
            }

            if (hit === false) misses.push([x,y]);
        }

        return {
            misses,
            hit
        }
    }

    const allSunk = () => {
        return ships.every(ship => ship.sunk == true);
    }
    
    return {
        placeShip,
        receiveAttack,
        allSunk
    }
}

module.exports = Gameboard;