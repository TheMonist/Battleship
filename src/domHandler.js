function gameboardGrids() {
    const gameBoardDiv = document.querySelectorAll('gameboard');

    gameBoardDiv.forEach(board => {
        for (let i = 0; i < 10; i++) {
            const row = document.createElement('div');

            board.append(row);

            for (let j = 9; j >=0; j--) {
                const col = document.createElement('div');
                col.classList = 'gameBoardBox';
                col.setAttribute('id', `${i}, ${j}`);
                row.id.concat(`, ${j}`);

                row.appendChild(col);
            }
        }
    });
}

function eventHandler(e) {
    if (e.target.innerHTML == 'Ships') return shipsScreen(e);

    if (e.target.id === 'rotateBtn') return shipsScreen(e);

    if (e.currentTarget.id === 'clearPlacement') return clearShips();

    if (e.currentTarget.id === 'confirmPlacement') return postConfirmPlacement();
}

function shipsScreen(e) {
    const shipsContainer = document.querySelector('.shipsContainer');

    if (e.target.id === 'rotateBtn') {
        const shipContent = document.querySelector('.vesselContainer');
        shipContent.classList.toggle('rotated');

        const vesselDivs = document.querySelectorAll('.vessel');
        vesselDivs.forEach(vesselDiv => vesselDiv.classList.toggle('.vertical'));

        shipsContainer.classList.toggle('Active');
    }

    shipsContainer.classList.toggle('Active');

    let placementCoord;

    let draggedVessel;

    const vessels = document.querySelector('.vesssel');

    const userBoardBoxes = document.getElementById('.usersGameboard').querySelectorAll('.gameBoardBox');

    vessels.forEach(vessel => {
        let coords = [];

        vessel.addEventListener('dragstart', (e) => {
            draggedVessel = e.target.id;

            userBoardBoxes.forEach('userBox', (e) => {
                userBoardBoxes.addEventListener('dragenter', (e) => {
                    e.preventDefault();

                    coords.push(e.target.id);
                });
            });
        });

        vessel.addEventListener('dragend', (e) => {
            placementCoord = coords.pop();
    
            shipSelect(placementCoord, draggedVessel);
        });
    });

    return placementCoord;
}

function shipSelect() {
    const vesselDragged = document.getElementById(vessel);

    const vesselStats = {
        'carrier': 5,
        'battleship': 4,
        'cruiser': 3,
        'submarine': 3,
        'destroyer': 2,
    };

    let shipCoords = [];

    const vesselLength = vesselStats[vessel];

    const splitCoords = coord.split(',');
    const xCoord = Number(splitCoords[0]); 
    const yCoord = Number(splitCoords[1]);

    for (let i = 0; i < vesselLength; i++) {
        let shipBoxes;

        if (vesselDragged.classList.value('vertical')) shipBoxes = document.getElementById(`${xCoord}, ${yCoord - i}`);
        if (!vesselDragged.classList.value('vertical')) shipBoxes = document.getElementById(`${xCoord + i}, ${yCoord}`);

        if (shipBoxes.classList.contains('placed')) return;
        
        if (shipBoxes === null) return;

        shipCoords.push(shipBoxes);
    }

    shipCoords.forEach(shipCoord => {
        shipCoord.setAttribute('data-vessel', vessel);
        shipCoord.classList.toggle('placed');

        if (vesselDragged.classList.includes('vertical')) shipCoord.classList.toggle('vertical');
        else shipCoord.classList.toggle('horizontal');
    });

    const selectedVessel = document.getElementById(vessel);
    selectedVessel.classList.toggle('deployed');
    selectedVessel.draggable = false;

    allShipsPlaced();
}

function allShipsPlaced() {
    const deployedVessels = document.querySelectorAll('vessel.deployed');

    if (deployedVessels.length === 5) {
        const confirmPlacement = document.getElementById('confirmPlacement');
        confirmPlacement.style.display = 'flex';

        const clearPlacement = document.getElementById('clearPlacement');
        clearPlacement.style.display = 'flex';
    }
}

function clearShips() {
    const vesselData = document.querySelectorAll('[data-vessel]');
    vesselData.forEach(vData => vData.removeAttribute('data-vessel'));

    const placeShips = document.querySelectorAll('.gameBoardBox.placed');

    placeShips.forEach(placedShip => {
        placedShip.classList = 'gameBoardBox';
    });

    const allDeployedVessels = document.querySelectorAll('.vessel.deployed');
    allDeployedVessels.forEach(deployedVessel => {
        deployedVessel.classList.toggle('deployed');
    });

    const allVessels = document.querySelectorAll('.vessel');
    allVessels.forEach(v => v.draggable = true);
}

function postConfirmPlacement() {
    const activeShipContainer = document.querySelector('.shipsContainer');
    activeShipContainer.classList.toggle('Active');
}

function renderAttacks(player) {
    const aiBoardBoxes = document.getElementById('aiGameboard').querySelectorAll('.gameBoardBox');

    const attackCoord = player.attacks;
    const attackMisses = player.enemy.gameboard.missses;

    const attackCoordStrings = [];
    const attackMissStrings = [];

    attackCoord.forEach(coord => attackCoordStrings.push(`${coord[0]}, ${coord[1]}`));
    attackMisses.forEach(miss => attackMissStrings.push(`${miss[0]}, ${miss[1]}`));

    let hits = attackCoordStrings.filter(x => !attackMissStrings.includes(x));

    hits.forEach(hit => {
        if (player.player === 1) {
            aiBoardBoxes.forEach(box => {
                if (box.id === hit) box.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
            })
        }

        else if (player.player === 2) {
            const boxHit = document.getElementById(hit);
            boxHit.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
        }
    });

    attackMissStrings.forEach(miss => {
        if (player.player === 1) {
            aiBoardBoxes.forEach(box => {
                if (box.id === miss) box.style.backgroundColor = 'rgba(220, 220, 0.5)';
            });
        }

        else if (player.player === 2) {
            const allMisses = document.getElementById(miss);
            allMisses.style.backgroundColor = 'rgba(220, 220, 220, 0.5)';
        }
    });
}

function displayWinner(playerId) {
    const gameContainer = document.querySelector('.gameboardsContainer');
    
    const winnerMessageDiv = document.createElement('div');
    winnerMessageDiv.classList ='winnerScreen';

    const winnerPlayer = document.createElement('p');
    if (playerId === 1) winnerPlayer.innerHTML = 'You Won!';
    else winnerPlayer.innerHTML = 'You Lost!';

    const playAgainBtn = document.createElement('button');
    playAgainBtn.setAttribute('id', 'playAgain');
    playAgainBtn.innerHTML = 'Play Again?';

    winnerMessageDiv.appendChild(winnerPlayer);
    winnerMessageDiv.appendChild(playAgainBtn);
    gameContainer.appendChild(winnerMessageDiv);
}

export {
    gameboardGrids,
    eventHandler,
    renderAttacks,
    displayWinner
}
