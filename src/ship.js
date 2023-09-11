//Ship Factory Function
function Ship(positions) {
    return {
        positions,
        length: positions.length,
        hits: [],
        hit(positions) {
            if (!(this.hits.includes(positions)))
            this.hits.push(position);
        },
        isSunk() {
            return (this.hits.length === this.length);
        }
    }
}

export default Ship;