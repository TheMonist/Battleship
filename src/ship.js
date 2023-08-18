//Ship Factory Function
const Ship = (length) => {
    let hits = 0;
    let sunk = false;

    const hit = () => {
        return hits++;
    }

    //There is an error here with the boolean
    const isSunk = () => {
        if (hits === length) {
            sunk = true;
        }
        return sunk;
    }

    return {
        length,
        hit,
        isSunk,
        sunk,
    }
}

module.exports = Ship;