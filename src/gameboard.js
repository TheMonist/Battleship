import './ship.js';

/*
    1. Place ships at certain coordinates
    2. Create receiveAttack function -> that has a pair of coordinates and determines if a ship was hit
    3. Keep track of missed attacks
    4. Keep track if ship was sunk
*/

const Gameboard = () => {
    let gameboard = [];
    let misses = [];
    let sunkShip = [];
    
    for (let i = 0; i < 10; i++) {
        gameboard.push(['', '', '', '', '', '', '', '', '', '']);
    }

    const receiveAttack = (Ship, x, y) => {
        //function to take attacks
    }

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

    return {
        receiveAttack,
        attackTracker,
        sinkTracker
    }
}

module.exports = Gameboard;