//Ship Factory Function
function Ship(length) {
    return {
        length: length,
        hits: 0,
        sunk: false,
        startCoord: null,
        endCoord: null,
        direction: 'horizontal',

        rotate() {
            if (this.direction === 'horizontal') return this.direction = 'vertical';
            return this.direction = 'horizontal'
        },

        hit() {
            this.hits++
        },

        isSunk() {
            if (this.hits >= this.length) {
                return this.sunk = true;
            }
            return this.sunk
        }
    }
}

module.exports = Ship;