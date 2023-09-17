const Player = require('../player');

let player1 = Player(1);
let player2 = Player(2);

player2.createBoard(1);

player2.getGameboard.placeShip(4 [2, 3]);

test('Create board object', () => {
    expect(player1.createBoard() && typeof(player1.createBoard() === 'object')).toBe(true);
});

player1.createEnemy(player2);
test('Create enemy', () => {
    expect(typeof player1.enemy).toBe('object');
});

player1.switchTurn();
player1.attack([1, 1]);
test('Attack enemy', () => {
    expect(player2.gameboard.misses.length).toBe(true);
});