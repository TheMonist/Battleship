const Gameboard = require('../gameboard');
const ship = require('../ship');

let board1 = Gameboard(1);
board1.placeShip(4, [2, 3]);
board1.receiveAttack([2, 3]);
board1.receiveAttack([4, 3]);
board1.receiveAttack([5, 3]);

test('Check End Coordinates', () => {
    expect(board1.placeShip(2, [1, 1])).toBe([2, 1])
});

test('Attack Miss', () => {
    expect(board1.receiveAttack(5, 5)).toBe('Miss')
});

test('Attack Hit', () => {
    expect(board1.receiveAttack([3, 3])).toBe('Hit');
});

test('All Sunk', () => {
    expect(board1.allSunk()).toBe(false);
});