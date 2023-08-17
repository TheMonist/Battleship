const Ship = () => {
    let hit = 0;
    let isSunk = false;
    let length = 0;

    /* 
    const hit = () => {
        return hit++;
    }

    const shipTracker = () => {
        if (hit === length) {
            isSunk = true;
        }
        return isSunk;
    } 
    */

    return {
        hit,
        isSunk,
        length
    }
}

module.exports = Ship;