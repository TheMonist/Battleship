import './ship.js';

/*
    1. Place ships at certain coordinates
    2. Create receiveAttack function -> that has a pair of coordinates and determines if a ship was hit
    3. Keep track of missed attacks
    4. Keep track if ship was sunk
*/

const Gameboard = () => {
    let gameboard = [];
    let ships = []
    let misses = [];
    //let sunkShip = [];
    
    /* Creates Gameboard
    for (let i = 0; i < 10; i++) {
        gameboard.push(['', '', '', '', '', '', '', '', '', '']);
    }

    const getGameboard = () => {
        return gameboard;
    }
    */
    
    const placeShip = (ship, [x,y]) => {
        ship.startCoord = [x, y];

        if (ship.direction === 'horizontal') ship.endCoord = [(x + (ship.length - 1)), y]; 
        else ship.endCoord = [x, (y - (ship.length - 1))];

        ships.push(ship);

        return ship.endCoord;
    }

    
    const checkShip = (x, y, length, position) => {
        if (position === 'vertical') {
            for (let i = 1; i < length - 1; i++) {
                if (x + i > 9) {
                    return false;
                }

                if (gameboard[x + i][y] !== '') {
                    return false
                }
            }
        }

        if (position === 'horizontal') {
            for (let i = 1; i < length - 1; i++) {
                if (y + i > 9) {
                    return false;
                }

                if (gameboard[x][y + i] !== '') {
                    return false;
                }
            }
        }
        return true;
    }

    const receiveAttack = ([x, y]) => {
        //function to take attacks
        let hit = false;

        for (let i = 0; i < ships.length; i++) {
            if (ships[i].direction === 'horizontal') {
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

    /*
    const attackTracker = () => {
        //function to track attack; maybe make another one for missed attacks
    }

    const sinkTracker = () => {
        //function to report which ships were sunk
       const shipOnBoard = gameboard[x][y];
       if (typeof shipOnBoard === 'object') {
        //functionality 
       }
       
    }
    */
    
    return {
        //getGameboard,
        checkShip,
        placeShip,
        receiveAttack,
        allSunk
        //attackTracker,
        //sinkTracker
    }
}

module.exports = Gameboard;