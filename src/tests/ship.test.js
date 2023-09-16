const Ship = require('../ship');

let newShip = Ship(4);
newShip.hit();
newShip.hit();
newShip.hit();
newShip.hit();

test('Hit ship', () => {
    expect(newShip.hits).toBe(4);
});

test('Sink ship', () => {
    expect(newShip.isSunk()).toBe(true);
});