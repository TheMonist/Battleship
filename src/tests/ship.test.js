const Ship = require('../ship');

let newShip = Ship(4);
newShip.hit();
newShip.hit();
newShip.hit();
newShip.hit();

test('Hit Ship', () => {
    expect(newShip.hits).toBe(4)
})

test('Sink Ship', () => {
    expect(newShip.isSunk()).toBe(true);
})