const Ship = require('../ship');

let testShip = Ship(4);
testShip.hit();
testShip.hit();
testShip.hit();
testShip.hit();

test('Test to see if hit function works', () => {
    expect(testShip.hit()).toEqual(4);
});

test('Test to see if sink function works', () => {
    expect(testShip.isSunk()).toBe(true);
});