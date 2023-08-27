//Ship Factory Function
const Ship = (length) => {
    let hits = 0;
    let sunk = false;
    let startCoord = null;
    let endCoord = null;
    let direction = 'horizontal';

    const rotate = () => {
        if (direction === 'horizontal') {
            return direction = 'horizontal'
        }
    }

    const hit = () => {
        return hits++;
    }

    const isSunk = () => {
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