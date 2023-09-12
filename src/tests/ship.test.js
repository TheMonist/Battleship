import Ship from '../ship';

describe('Ship properties and functions', () => {
    let testShip;

    beforeEach(() => {
        testShip = Ship([10, 11, 12, 13]);
    })

    test('Ship Length', () => {
        expect(testShip.length).toBe(4);
    });
    
    test('Hit Array', () => {
        expect(testShip.hits).toEqual([]);
    });

    test('Register Hit', () => {
        testShip.hit(12);
        expect(testShip.hits).toStrictEqual([12]);
    });

    test('Ship is not sunk when it has un-hit positions', () => {
        testShip.hit(12);
        expect(testShip.isSunk()).toBe(false);
    }); 

    test('Ship counts as sunk when all positions are hit', () => {
        for (let i = 0; i < testShip.length; i++) {
            testShip.hit(testShip.positions[i]);
        }
        expect(testShip.isSunk()).toBe(true);
    });

    test('Hit to a same position do not count twice', () => {
        testShip.hit(12);
        testShip.hit(12);
        expect(testShip.hits.length).toBe(1);
    })
});