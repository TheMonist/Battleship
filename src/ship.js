//Ship Factory Function
const Ship = (length) => {
    let hits = 0;
    let sunk = false;

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
        hit,
        isSunk,
    }
}

module.exports = Ship;