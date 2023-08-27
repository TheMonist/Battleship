//Ship Factory Function
function Ship(length) {
    let hits = 0;
    let sunk = false;
    let startCoord = null;
    let endCoord = null;
    let direction = 'horizontal';

    function rotate() {
        if (direction === 'horizontal') {
            return direction = 'horizontal'
        }
    }

    function hit() {
        return hits++;
    }

    function isSunk() {
        if (hits >= length) {
            return sunk = true;
        }
        return sunk;
    }

    return {
        length,
        startCoord,
        endCoord,
        rotate,
        hit,
        isSunk,
    }
}

module.exports = Ship;