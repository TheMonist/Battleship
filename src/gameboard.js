function Gameboard(player) {
    return {
        player: player,
        ships: [],
        misses: [],

        // Creates new ship with the length, starting coordinates, then calculates the ending coordinates
        placeShip(ship, [x, y]) {

            ship.startCoord = [x, y];

            if (ship.direction === 'horizontal') ship.endCoord = [(x + (ship.length - 1)), y]; 
            else ship.endCoord = [x, (y - (ship.length - 1))];

            this.ships.push(ship);

            return ship.endCoord;
        },
        
        // Checks if an attack has hit one of the ships
        receiveAttack([x, y]) {

            // Initialize hit to false, change to true if there is a hit
            let hit = false;

            for (let i = 0; i < this.ships.length; i++) {

                // If the ship is horizontal
                if(this.ships[i].direction === 'horizontal' ) {
                    // And y is the same as the ships y coordinate, and x is on or inbetween the ships x coordinates, then its a hit
                    if(y === this.ships[i].startCoord[1] && x >= this.ships[i].startCoord[0] && x <= this.ships[i].endCoord[0]) {
                        
                        // Register hit on ship
                        this.ships[i].hit();
                        hit = true;
                        
                        // Check if ship is sunk
                        this.ships[i].isSunk();
                    }
                }

                // If the ship is vertical
                if(this.ships[i].direction === 'vertical' ) {
                    // And x is the same as the ships x coordinate, and y is on or inbetween the ships y coordinates, then its a hit
                    if(x === this.ships[i].startCoord[0] && y <= this.ships[i].startCoord[1] && y >= this.ships[i].endCoord[1]) {

                        // Register hit on ship
                        this.ships[i].hit();
                        hit = true;

                        // Check if ship is sunk
                        this.ships[i].isSunk();
                    }
                }
            };

            // If hit is false, push coordinate to the misses array
            if (hit === false) this.misses.push([x, y]);

            return hit;
        },

        allSunk() {
            return this.ships.every(ship => ship.sunk === true); 
        }
        
    }
}

module.exports = Gameboard;