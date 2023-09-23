//https://github.com/alecnissen/Battleship/tree/main
//https://github.com/RShillgit/Battleship/tree/main
// Use some info as a guide
import './styles.scss';
import Ship from './ship';
import Player from './player';
import {gameboardGrids, eventHandler, renderAttacks, displayWinner} from './domHandler';

function game() {
    const shipsButton = document.getElementById('shipsBtn');
    shipsButton.addEventListener('click', (e) => eventHandler);

    const rotateShip = document.getElementById('rotateBtn');
    rotateShip.addEventListener('click', (e) => {
        eventHandler(e)
    });

    gameboardGrids();

    const user = Player(1)
    user.createBoard();
    user.switchTurn();

    const ai = Player(2);
    user.createEnemy(ai);
    ai.createEnemy(user);
    
    const clearPlacement = document.getElementById('clearPlacement');
    clearPlacement.addEventListener('click', (e) => {
        eventHandler(e);
        placeShips(user);

        const aiBoard = document.getElementById('aiGameboard');
        aiBoard.addEventListener('click', (e) => {
            eventHandler(e);
            renderAttacks(user, e);
        });
    })

    placeAiShips(ai);
}
game();

function placeShips(user) {
    const buttonShips = document.getElementById('shipsBtn');
    buttonShips.setAttribute('disabled', true);
    buttonShips.style.display ='none';

    const placedCarrier = document.querySelector('[data-vessel = "carrier"]');
    const placedBattleship = document.querySelector('[data-vessel = "battleship"]');
    const placedCruiser = document.querySelector('[data-vessel = "cruiser"]');
    const placedSubmarine = document.querySelector('[data-vessel = "submarine"]');
    const placedDestroyer = document.querySelector('[data-vessel = "destroyer"]');

    const convertedCarrierCoord = placedCarrier.id.split(',');
    const carrierStartCoord = [Number(convertedCarrierCoord[0], Number(convertedCarrierCoord[1]))];
    
    const convertedBattleshipCoord = placedBattleship.id.split(',');
    const battleshipStartCoord = [Number(convertedBattleshipCoord[0], Number(convertedBattleshipCoord[1]))];
    
    const convertedCruiserCoord = placedCruiser.id.split(',');
    const cruiserStartCoord = [Number(convertedCruiserCoord[0], Number(convertedCruiserCoord[1]))];
    
    const convertedSubmarineCoord = placedSubmarine.id.split(',');
    const submarineStartCoord = [Number(convertedSubmarineCoord[0], Number(convertedSubmarineCoord[1]))];
    
    const convertedDestroyerCoord = placedDestroyer.id.split(',');
    const destroyerStartCoord = [Number(convertedDestroyerCoord[0], Number(convertedDestroyerCoord[1]))];

    const userCarrier = Ship(5);
    const userBattleship = Ship(4);
    const userCruiser = Ship(3);
    const userSubmarine = Ship(3);
    const userDestroyer = Ship(2);

    if (placedCarrier.classList.value.includes('vertical')) userCarrier.rotate();
    if (placedBattleship.classList.value.includes('vertical')) userBattleship.rotate();
    if (placedCruiser.classList.value.includes('vertical')) userCruiser.rotate();
    if (placedSubmarine.classList.value.includes('vertical')) userSubmarine.rotate();
    if (placedDestroyer.classList.value.includes('vertical')) userDestroyer.rotate();

    user.gameboard.placeShip(userCarrier, carrierStartCoord);
    user.gameboard.placeShip(userBattleship, battleshipStartCoord);
    user.gameboard.placeShip(userCruiser, cruiserStartCoord);
    user.gameboard.placeShip(userSubmarine, submarineStartCoord);
    user.gameboard.placeShip(userDestroyer, destroyerStartCoord);
}

function randomShipCoord(vessel) {
    const name = vessel;

    const possibleDirections = ['horizontal', 'vertical'];
    const randomNumbers = [0, 1];

    const randomDirectionChoice = randomNumbers[Math.floor(Math.random()*randomNumbers.length)];

    const direction = possibleDirections[randomDirectionChoice];

    let xCoord;
    let yCoord;
    let randomX;
    let randomY;
    let randomCoordinate;

    if (direction === 'horizontal') {
        if (vessel === 'carrier') xCoord = [0, 1, 2, 3, 4];
        else if (vessel === 'battleship') xCoord = [0, 1, 2, 3, 4, 5];
        else if (vessel === 'cruiser') xCoord = [0, 1, 2, 3, 4, 5, 6];
        else if (vessel === 'submarine') xCoord = [0, 1, 2, 3, 4, 5, 6];
        else if (vessel === 'destroyer') xCoord = [0, 1, 2, 3, 4, 5, 6, 7];

        yCoord = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        randomX = xCoord[Math.floor(Math.random()*xCoord.length)];
        randomY = yCoord[Math.floor(Math.random()*yCoord.length)];

        randomCoordinate = [randomX, randomY];
        return {randomCoordinate, direction, name};
    }

    else {
        if (vessel == 'carrier') yCoord = [9, 8, 7, 6, 5];
        else if (vessel === 'battleship') yCoord = [9, 8, 7, 6, 5, 4];
        else if (vessel === 'cruiser') yCoord = [9, 8, 7, 6, 5, 4, 3];
        else if (vessel === 'submarine') yCoord = [9, 8, 7, 6, 5, 4, 3];
        else if (vessel === 'destroyer') yCoord = [9, 8, 7, 6, 5, 4, 3, 2];

        xCoord = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        
        randomX = xCoord[Math.floor(Math.random()*xCoord.length)];
        randomY = yCoord[Math.floor(Math.random()*yCoord.length)];

        randomCoordinate = [randomX, randomY];
        return {randomCoordinate, direction, name};
    }
}

function placeAiShips(ai) {
    let occupiedCoords = [];

    const vesselLengths = {
        'carrier': 5,
        'battleship': 4,
        'cruiser': 4,
        'submarine': 3,
        'destroyer': 2
    }

    const carrier = randomShipCoord('carrier');
    const battleship = randomShipCoord('battleship');
    const cruiser = randomShipCoord('cruiser');
    const submarine = randomShipCoord('submarine');
    const destroyer = randomShipCoord('destroyer');

    let randomVesels = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];

    randomVesels.forEach(vessel => {
        for (let i = 0; i < vesselLengths[vessel.name]; i++) {
            let newCoord;

            if (vessel.direction === 'horizontal') {
                newCoord = `${vessel.randomCoordinate[0] + i}, ${vessel.randomCoordinate[1]}`;
            }
            else if (vessel.direction === 'vertical') {
                newCoord = `${vessel.randomCoordinate[0]}, ${vessel.randomCoordinate[1] - i}`;
            }
            occupiedCoords.push(newCoord);
        }
    })

    if (occupiedCoords.length != new Set(occupiedCoords).size) {
        const aiBoardBoxes = document.getElementById('aiGameBoard').querySelectorAll('.gameBoardBox');
        aiBoardBoxes.forEach(box => box.style.backgroundColor = 'white');

        return placeAiShips
    }

    const aiCarrier = Ship(5);
    aiCarrier.direction = carrier.direction;
    ai.gameboard.placeShip(aiCarrier, carrier.randomCoordinate);

    const aiBattleship = Ship(4);
    aiBattleship.direction = battleship.direction;
    ai.gameboard.placeShip(aiBattleship, battleship.randomCoordinate);

    const aiCruiser = Ship(3);
    aiCruiser.direction = cruiser.direction;
    ai.gameboard.placeShip(aiCruiser, cruiser.randomCoordinate);

    const aiSubmarine = Ship(3);
    aiSubmarine.direction = submarine.direction;
    ai.gameboard.placeShip(aiSubmarine, submarine.randomCoordinate);

    const aiDestroyer = Ship(2);
    aiDestroyer.direction = destroyer.direction;
    ai.gameboard.placeShip(aiDestroyer, destroyer.randomCoordinate);
}

function attack(user, e) {
    if (user.gameboard.ships.length === 5 && user.gameboard.allSunk()) return displayWinner(2), replay();
    if (user.enemy.gameboard.ships.length === 5 && user.enemy.gameboard.allSunk()) return displayWinner(1), replay;
    else if (user.turn === true) attackAi(user, e);
    else if (user.turn === false) aiAttackUser(user);
}

function attackAi(user, e) {
    let userAttackArray = [];
    const userAttacks = user.attacks;
    userAttacks.forEach(att => userAttackArray.push(`${att[0]}, ${att[1]}`));

    if (userAttackArray.includes(e.target.id)) return;

    const splitId = e.target.id;
    const xAttack = splitId[0];
    const yAttack = splitId[1];

    user.attack([xAttack, yAttack]);

    renderAttacks(user);

    attack(user, e);
}

function aiAttackUser(user) {
    const ai = user.enemy;

    const allAiAttacks = ai.attacks;
    const allAiMisses = ai.misses;

    const aiAttackCoords = [];
    const aiMissCoord = [];

    allAiAttacks.forEach(att => aiAttackCoords.push(`${att[0]}, ${att[1]}`));
    allAiMisses.forEach(miss => aiMissCoord.push(`${miss[0]}, ${miss[1]}`));

    let hits = aiAttackCoords.filter(x => !aiMissCoord.includes(x));

    let randomBox;

    let aiAttackArray = [];
    const aiAttacks = ai.attacks;
    aiAttacks.forEach(att => aiAttackArray.push(`${att[0]}, ${att[1]}`));

    const userBoxes = document.getElementById('usersGameboard').querySelectorAll('gameBoardBox');

    randomBox = userBoxes[Math.floor(Math.random()*userBoxes.length)];

    while (aiAttackArray.includes(randomBox.id)) {
        randomBox = userBoxes[Math.floor(Math.random()*userBoxes.length)];
    }

    const randomBoxSplit = randomBox.id.split(',');
    const randomUserX = Number(randomBoxSplit[0]);
    const randomUserY = Number(randomBoxSplit[1]);

    ai.attack([randomUserX, randomUserY]);

    renderAttacks(ai);
}

function intelligentAi(hits,hit) {
    //function that maybe removed
}

function replay() {
    const replayBtn = document.getElementById('playAgain');
    replayBtn.addEventListener('click', () => {
        window.location.reload();
    });
}