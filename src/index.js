//https://github.com/alecnissen/Battleship/tree/main
//https://github.com/RShillgit/Battleship/tree/main
// Use some info as a guide
import './styles.scss';
import Ship from './ship';
import Player from './player';
import {gameboardGrids, eventHandler, renderAttacks, displayWinner} from '.dom';

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