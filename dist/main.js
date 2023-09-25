/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domHandler.js":
/*!***************************!*\
  !*** ./src/domHandler.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displayWinner: () => (/* binding */ displayWinner),\n/* harmony export */   eventHandler: () => (/* binding */ eventHandler),\n/* harmony export */   gameboardGrids: () => (/* binding */ gameboardGrids),\n/* harmony export */   renderAttacks: () => (/* binding */ renderAttacks)\n/* harmony export */ });\nfunction gameboardGrids() {\n  const gameBoardDiv = document.querySelectorAll('gameboard');\n  gameBoardDiv.forEach(board => {\n    for (let i = 0; i < 10; i++) {\n      const row = document.createElement('div');\n      board.append(row);\n      for (let j = 9; j >= 0; j--) {\n        const col = document.createElement('div');\n        col.classList = 'gameBoardBox';\n        col.setAttribute('id', `${i}, ${j}`);\n        row.id.concat(`, ${j}`);\n        row.appendChild(col);\n      }\n    }\n  });\n}\nfunction eventHandler(e) {\n  if (e.target.innerHTML == 'Ships') return shipsScreen(e);\n  if (e.target.id === 'rotateBtn') return shipsScreen(e);\n  if (e.currentTarget.id === 'clearPlacement') return clearShips();\n  if (e.currentTarget.id === 'confirmPlacement') return postConfirmPlacement();\n}\nfunction shipsScreen(e) {\n  const shipsContainer = document.querySelector('.shipsContainer');\n  if (e.target.id === 'rotateBtn') {\n    const shipContent = document.querySelector('.vesselContainer');\n    shipContent.classList.toggle('rotated');\n    const vesselDivs = document.querySelectorAll('.vessel');\n    vesselDivs.forEach(vesselDiv => vesselDiv.classList.toggle('.vertical'));\n    shipsContainer.classList.toggle('Active');\n  }\n  shipsContainer.classList.toggle('Active');\n  let placementCoord;\n  let draggedVessel;\n  const vessels = document.querySelector('.vesssel');\n  const userBoardBoxes = document.getElementById('.usersGameboard').querySelectorAll('.gameBoardBox');\n  vessels.forEach(vessel => {\n    let coords = [];\n    vessel.addEventListener('dragstart', e => {\n      draggedVessel = e.target.id;\n      userBoardBoxes.forEach('userBox', e => {\n        userBoardBoxes.addEventListener('dragenter', e => {\n          e.preventDefault();\n          coords.push(e.target.id);\n        });\n      });\n    });\n    vessel.addEventListener('dragend', e => {\n      placementCoord = coords.pop();\n      shipSelect(placementCoord, draggedVessel);\n    });\n  });\n  return placementCoord;\n}\nfunction shipSelect() {\n  const vesselDragged = document.getElementById(vessel);\n  const vesselStats = {\n    'carrier': 5,\n    'battleship': 4,\n    'cruiser': 3,\n    'submarine': 3,\n    'destroyer': 2\n  };\n  let shipCoords = [];\n  const vesselLength = vesselStats[vessel];\n  const splitCoords = coord.split(',');\n  const xCoord = Number(splitCoords[0]);\n  const yCoord = Number(splitCoords[1]);\n  for (let i = 0; i < vesselLength; i++) {\n    let shipBoxes;\n    if (vesselDragged.classList.value('vertical')) shipBoxes = document.getElementById(`${xCoord}, ${yCoord - i}`);\n    if (!vesselDragged.classList.value('vertical')) shipBoxes = document.getElementById(`${xCoord + i}, ${yCoord}`);\n    if (shipBoxes.classList.contains('placed')) return;\n    if (shipBoxes === null) return;\n    shipCoords.push(shipBoxes);\n  }\n  shipCoords.forEach(shipCoord => {\n    shipCoord.setAttribute('data-vessel', vessel);\n    shipCoord.classList.toggle('placed');\n    if (vesselDragged.classList.includes('vertical')) shipCoord.classList.toggle('vertical');else shipCoord.classList.toggle('horizontal');\n  });\n  const selectedVessel = document.getElementById(vessel);\n  selectedVessel.classList.toggle('deployed');\n  selectedVessel.draggable = false;\n  allShipsPlaced();\n}\nfunction allShipsPlaced() {\n  const deployedVessels = document.querySelectorAll('vessel.deployed');\n  if (deployedVessels.length === 5) {\n    const confirmPlacement = document.getElementById('confirmPlacement');\n    confirmPlacement.style.display = 'flex';\n    const clearPlacement = document.getElementById('clearPlacement');\n    clearPlacement.style.display = 'flex';\n  }\n}\nfunction clearShips() {\n  const vesselData = document.querySelectorAll('[data-vessel]');\n  vesselData.forEach(vData => vData.removeAttribute('data-vessel'));\n  const placeShips = document.querySelectorAll('.gameBoardBox.placed');\n  placeShips.forEach(placedShip => {\n    placedShip.classList = 'gameBoardBox';\n  });\n  const allDeployedVessels = document.querySelectorAll('.vessel.deployed');\n  allDeployedVessels.forEach(deployedVessel => {\n    deployedVessel.classList.toggle('deployed');\n  });\n  const allVessels = document.querySelectorAll('.vessel');\n  allVessels.forEach(v => v.draggable = true);\n}\nfunction postConfirmPlacement() {\n  const activeShipContainer = document.querySelector('.shipsContainer');\n  activeShipContainer.classList.toggle('Active');\n}\nfunction renderAttacks(player) {\n  const aiBoardBoxes = document.getElementById('aiGameboard').querySelectorAll('.gameBoardBox');\n  const attackCoord = player.attacks;\n  const attackMisses = player.enemy.gameboard.missses;\n  const attackCoordStrings = [];\n  const attackMissStrings = [];\n  attackCoord.forEach(coord => attackCoordStrings.push(`${coord[0]}, ${coord[1]}`));\n  attackMisses.forEach(miss => attackMissStrings.push(`${miss[0]}, ${miss[1]}`));\n  let hits = attackCoordStrings.filter(x => !attackMissStrings.includes(x));\n  hits.forEach(hit => {\n    if (player.player === 1) {\n      aiBoardBoxes.forEach(box => {\n        if (box.id === hit) box.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';\n      });\n    } else if (player.player === 2) {\n      const boxHit = document.getElementById(hit);\n      boxHit.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';\n    }\n  });\n  attackMissStrings.forEach(miss => {\n    if (player.player === 1) {\n      aiBoardBoxes.forEach(box => {\n        if (box.id === miss) box.style.backgroundColor = 'rgba(220, 220, 0.5)';\n      });\n    } else if (player.player === 2) {\n      const allMisses = document.getElementById(miss);\n      allMisses.style.backgroundColor = 'rgba(220, 220, 220, 0.5)';\n    }\n  });\n}\nfunction displayWinner(playerId) {\n  const gameContainer = document.querySelector('.gameboardsContainer');\n  const winnerMessageDiv = document.createElement('div');\n  winnerMessageDiv.classList = 'winnerScreen';\n  const winnerPlayer = document.createElement('p');\n  if (playerId === 1) winnerPlayer.innerHTML = 'You Won!';else winnerPlayer.innerHTML = 'You Lost!';\n  const playAgainBtn = document.createElement('button');\n  playAgainBtn.setAttribute('id', 'playAgain');\n  playAgainBtn.innerHTML = 'Play Again?';\n  winnerMessageDiv.appendChild(winnerPlayer);\n  winnerMessageDiv.appendChild(playAgainBtn);\n  gameContainer.appendChild(winnerMessageDiv);\n}\n\n\n//# sourceURL=webpack://battleship/./src/domHandler.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module) => {

eval("function Gameboard(player) {\n  return {\n    player: player,\n    ships: [],\n    misses: [],\n    placeShip(ship, _ref) {\n      let [x, y] = _ref;\n      ship.startCoord = [x, y];\n      if (ship.direction === 'horizontal') ship.endCoord = [x + (ship.length - 1), y];else ship.endCoord = [x, y - (ship.length - 1)];\n      this.ships.push(ship);\n      return ship.endCoord;\n    },\n    receiveAttack(_ref2) {\n      let [x, y] = _ref2;\n      let hit = false;\n      for (let i = 0; i < this.ships.length; i++) {\n        if (this.ships[i].direction === 'horizontal') {\n          if (y === this.ships[i].startCoord[1] && x >= this.ships[i].startCoord[0] && x <= this.ships[i].endCoord[0]) {\n            this.ships[i].hit();\n            hit = true;\n            this.ships[i].isSunk();\n          }\n        }\n        if (this.ships[i].direction === 'vertical') {\n          if (x == this.ships[i].startCoord[0] && y <= this.ships[i].startCoord[1] && y >= this.ships[i].endCoord[1]) {\n            this.ships[i].hit();\n            hit = true;\n            this.ships[i].isSunk();\n          }\n        }\n      }\n      if (hit === false) this.misses.push([x, y]);\n      return hit;\n    },\n    allSunk() {\n      return this.ships.every(ship => ship.sunk === true);\n    }\n  };\n}\n;\nmodule.exports = Gameboard;\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ \"./src/styles.scss\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ship__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_player__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _domHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domHandler */ \"./src/domHandler.js\");\n//https://github.com/alecnissen/Battleship/tree/main\n//https://github.com/RShillgit/Battleship/tree/main\n// Use some info as a guide\n\n\n\n\nfunction game() {\n  const shipsButton = document.getElementById('shipsBtn');\n  shipsButton.addEventListener('click', e => _domHandler__WEBPACK_IMPORTED_MODULE_3__.eventHandler);\n  const rotateShip = document.getElementById('rotateBtn');\n  rotateShip.addEventListener('click', e => {\n    (0,_domHandler__WEBPACK_IMPORTED_MODULE_3__.eventHandler)(e);\n  });\n  (0,_domHandler__WEBPACK_IMPORTED_MODULE_3__.gameboardGrids)();\n  const user = _player__WEBPACK_IMPORTED_MODULE_2___default()(1);\n  user.createBoard();\n  user.switchTurn();\n  const ai = _player__WEBPACK_IMPORTED_MODULE_2___default()(2);\n  user.createEnemy(ai);\n  ai.createEnemy(user);\n  const clearPlacement = document.getElementById('clearPlacement');\n  clearPlacement.addEventListener('click', e => {\n    (0,_domHandler__WEBPACK_IMPORTED_MODULE_3__.eventHandler)(e);\n    placeShips(user);\n    const aiBoard = document.getElementById('aiGameboard');\n    aiBoard.addEventListener('click', e => {\n      (0,_domHandler__WEBPACK_IMPORTED_MODULE_3__.eventHandler)(e);\n      (0,_domHandler__WEBPACK_IMPORTED_MODULE_3__.renderAttacks)(user, e);\n    });\n  });\n  placeAiShips(ai);\n}\ngame();\nfunction placeShips(user) {\n  const buttonShips = document.getElementById('shipsBtn');\n  buttonShips.setAttribute('disabled', true);\n  buttonShips.style.display = 'none';\n  const placedCarrier = document.querySelector('[data-vessel = \"carrier\"]');\n  const placedBattleship = document.querySelector('[data-vessel = \"battleship\"]');\n  const placedCruiser = document.querySelector('[data-vessel = \"cruiser\"]');\n  const placedSubmarine = document.querySelector('[data-vessel = \"submarine\"]');\n  const placedDestroyer = document.querySelector('[data-vessel = \"destroyer\"]');\n  const convertedCarrierCoord = placedCarrier.id.split(',');\n  const carrierStartCoord = [Number(convertedCarrierCoord[0], Number(convertedCarrierCoord[1]))];\n  const convertedBattleshipCoord = placedBattleship.id.split(',');\n  const battleshipStartCoord = [Number(convertedBattleshipCoord[0], Number(convertedBattleshipCoord[1]))];\n  const convertedCruiserCoord = placedCruiser.id.split(',');\n  const cruiserStartCoord = [Number(convertedCruiserCoord[0], Number(convertedCruiserCoord[1]))];\n  const convertedSubmarineCoord = placedSubmarine.id.split(',');\n  const submarineStartCoord = [Number(convertedSubmarineCoord[0], Number(convertedSubmarineCoord[1]))];\n  const convertedDestroyerCoord = placedDestroyer.id.split(',');\n  const destroyerStartCoord = [Number(convertedDestroyerCoord[0], Number(convertedDestroyerCoord[1]))];\n  const userCarrier = _ship__WEBPACK_IMPORTED_MODULE_1___default()(5);\n  const userBattleship = _ship__WEBPACK_IMPORTED_MODULE_1___default()(4);\n  const userCruiser = _ship__WEBPACK_IMPORTED_MODULE_1___default()(3);\n  const userSubmarine = _ship__WEBPACK_IMPORTED_MODULE_1___default()(3);\n  const userDestroyer = _ship__WEBPACK_IMPORTED_MODULE_1___default()(2);\n  if (placedCarrier.classList.value.includes('vertical')) userCarrier.rotate();\n  if (placedBattleship.classList.value.includes('vertical')) userBattleship.rotate();\n  if (placedCruiser.classList.value.includes('vertical')) userCruiser.rotate();\n  if (placedSubmarine.classList.value.includes('vertical')) userSubmarine.rotate();\n  if (placedDestroyer.classList.value.includes('vertical')) userDestroyer.rotate();\n  user.gameboard.placeShip(userCarrier, carrierStartCoord);\n  user.gameboard.placeShip(userBattleship, battleshipStartCoord);\n  user.gameboard.placeShip(userCruiser, cruiserStartCoord);\n  user.gameboard.placeShip(userSubmarine, submarineStartCoord);\n  user.gameboard.placeShip(userDestroyer, destroyerStartCoord);\n}\nfunction randomShipCoord(vessel) {\n  const name = vessel;\n  const possibleDirections = ['horizontal', 'vertical'];\n  const randomNumbers = [0, 1];\n  const randomDirectionChoice = randomNumbers[Math.floor(Math.random() * randomNumbers.length)];\n  const direction = possibleDirections[randomDirectionChoice];\n  let xCoord;\n  let yCoord;\n  let randomX;\n  let randomY;\n  let randomCoordinate;\n  if (direction === 'horizontal') {\n    if (vessel === 'carrier') xCoord = [0, 1, 2, 3, 4];else if (vessel === 'battleship') xCoord = [0, 1, 2, 3, 4, 5];else if (vessel === 'cruiser') xCoord = [0, 1, 2, 3, 4, 5, 6];else if (vessel === 'submarine') xCoord = [0, 1, 2, 3, 4, 5, 6];else if (vessel === 'destroyer') xCoord = [0, 1, 2, 3, 4, 5, 6, 7];\n    yCoord = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];\n    randomX = xCoord[Math.floor(Math.random() * xCoord.length)];\n    randomY = yCoord[Math.floor(Math.random() * yCoord.length)];\n    randomCoordinate = [randomX, randomY];\n    return {\n      randomCoordinate,\n      direction,\n      name\n    };\n  } else {\n    if (vessel == 'carrier') yCoord = [9, 8, 7, 6, 5];else if (vessel === 'battleship') yCoord = [9, 8, 7, 6, 5, 4];else if (vessel === 'cruiser') yCoord = [9, 8, 7, 6, 5, 4, 3];else if (vessel === 'submarine') yCoord = [9, 8, 7, 6, 5, 4, 3];else if (vessel === 'destroyer') yCoord = [9, 8, 7, 6, 5, 4, 3, 2];\n    xCoord = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];\n    randomX = xCoord[Math.floor(Math.random() * xCoord.length)];\n    randomY = yCoord[Math.floor(Math.random() * yCoord.length)];\n    randomCoordinate = [randomX, randomY];\n    return {\n      randomCoordinate,\n      direction,\n      name\n    };\n  }\n}\nfunction placeAiShips(ai) {\n  let occupiedCoords = [];\n  const vesselLengths = {\n    'carrier': 5,\n    'battleship': 4,\n    'cruiser': 4,\n    'submarine': 3,\n    'destroyer': 2\n  };\n  const carrier = randomShipCoord('carrier');\n  const battleship = randomShipCoord('battleship');\n  const cruiser = randomShipCoord('cruiser');\n  const submarine = randomShipCoord('submarine');\n  const destroyer = randomShipCoord('destroyer');\n  let randomVesels = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];\n  randomVesels.forEach(vessel => {\n    for (let i = 0; i < vesselLengths[vessel.name]; i++) {\n      let newCoord;\n      if (vessel.direction === 'horizontal') {\n        newCoord = `${vessel.randomCoordinate[0] + i}, ${vessel.randomCoordinate[1]}`;\n      } else if (vessel.direction === 'vertical') {\n        newCoord = `${vessel.randomCoordinate[0]}, ${vessel.randomCoordinate[1] - i}`;\n      }\n      occupiedCoords.push(newCoord);\n    }\n  });\n  if (occupiedCoords.length != new Set(occupiedCoords).size) {\n    const aiBoardBoxes = document.getElementById('aiGameBoard').querySelectorAll('.gameBoardBox');\n    aiBoardBoxes.forEach(box => box.style.backgroundColor = 'white');\n    return placeAiShips;\n  }\n  const aiCarrier = _ship__WEBPACK_IMPORTED_MODULE_1___default()(5);\n  aiCarrier.direction = carrier.direction;\n  ai.gameboard.placeShip(aiCarrier, carrier.randomCoordinate);\n  const aiBattleship = _ship__WEBPACK_IMPORTED_MODULE_1___default()(4);\n  aiBattleship.direction = battleship.direction;\n  ai.gameboard.placeShip(aiBattleship, battleship.randomCoordinate);\n  const aiCruiser = _ship__WEBPACK_IMPORTED_MODULE_1___default()(3);\n  aiCruiser.direction = cruiser.direction;\n  ai.gameboard.placeShip(aiCruiser, cruiser.randomCoordinate);\n  const aiSubmarine = _ship__WEBPACK_IMPORTED_MODULE_1___default()(3);\n  aiSubmarine.direction = submarine.direction;\n  ai.gameboard.placeShip(aiSubmarine, submarine.randomCoordinate);\n  const aiDestroyer = _ship__WEBPACK_IMPORTED_MODULE_1___default()(2);\n  aiDestroyer.direction = destroyer.direction;\n  ai.gameboard.placeShip(aiDestroyer, destroyer.randomCoordinate);\n}\nfunction attack(user, e) {\n  if (user.gameboard.ships.length === 5 && user.gameboard.allSunk()) return (0,_domHandler__WEBPACK_IMPORTED_MODULE_3__.displayWinner)(2), replay();\n  if (user.enemy.gameboard.ships.length === 5 && user.enemy.gameboard.allSunk()) return (0,_domHandler__WEBPACK_IMPORTED_MODULE_3__.displayWinner)(1), replay;else if (user.turn === true) attackAi(user, e);else if (user.turn === false) aiAttackUser(user);\n}\nfunction attackAi(user, e) {\n  let userAttackArray = [];\n  const userAttacks = user.attacks;\n  userAttacks.forEach(att => userAttackArray.push(`${att[0]}, ${att[1]}`));\n  if (userAttackArray.includes(e.target.id)) return;\n  const splitId = e.target.id;\n  const xAttack = splitId[0];\n  const yAttack = splitId[1];\n  user.attack([xAttack, yAttack]);\n  (0,_domHandler__WEBPACK_IMPORTED_MODULE_3__.renderAttacks)(user);\n  attack(user, e);\n}\nfunction aiAttackUser(user) {\n  const ai = user.enemy;\n  const allAiAttacks = ai.attacks;\n  const allAiMisses = ai.misses;\n  const aiAttackCoords = [];\n  const aiMissCoord = [];\n  allAiAttacks.forEach(att => aiAttackCoords.push(`${att[0]}, ${att[1]}`));\n  allAiMisses.forEach(miss => aiMissCoord.push(`${miss[0]}, ${miss[1]}`));\n  let hits = aiAttackCoords.filter(x => !aiMissCoord.includes(x));\n  let randomBox;\n  let aiAttackArray = [];\n  const aiAttacks = ai.attacks;\n  aiAttacks.forEach(att => aiAttackArray.push(`${att[0]}, ${att[1]}`));\n  const userBoxes = document.getElementById('usersGameboard').querySelectorAll('gameBoardBox');\n  randomBox = userBoxes[Math.floor(Math.random() * userBoxes.length)];\n  while (aiAttackArray.includes(randomBox.id)) {\n    randomBox = userBoxes[Math.floor(Math.random() * userBoxes.length)];\n  }\n  const randomBoxSplit = randomBox.id.split(',');\n  const randomUserX = Number(randomBoxSplit[0]);\n  const randomUserY = Number(randomBoxSplit[1]);\n  ai.attack([randomUserX, randomUserY]);\n  (0,_domHandler__WEBPACK_IMPORTED_MODULE_3__.renderAttacks)(ai);\n}\nfunction intelligentAi(hits, hit) {\n  //function that maybe removed\n}\nfunction replay() {\n  const replayBtn = document.getElementById('playAgain');\n  replayBtn.addEventListener('click', () => {\n    window.location.reload();\n  });\n}\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Gameboard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nfunction Player(id) {\n  return {\n    turn: false,\n    player: id,\n    gameboard: null,\n    enemy: null,\n    attacks: [],\n    winner: null,\n    createBoard() {\n      return this.gameboard = Gameboard(this.player);\n    },\n    createEnemy(enemy) {\n      return this.enemy = enemy;\n    },\n    switchTurn() {\n      return this.turn = !this.turn;\n    },\n    attack(_ref) {\n      let [x, y] = _ref;\n      if (this.turn === true && this.attack.includes([x, y])) {\n        this.enemy.gameboard.receiveAttack([x, y]);\n        this.attack.push([x, y]);\n        this.switchTurn();\n        this.enemy.switchTurn();\n      }\n    }\n  };\n}\nmodule.exports = Player;\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

eval("function Ship(length) {\n  return {\n    length: length,\n    hits: 0,\n    sunk: false,\n    startCoord: null,\n    endCoord: null,\n    direction: 'horizontal',\n    rotate() {\n      if (this.direction === 'horizontal') return this.direction = 'vertical';\n      return this.direction = 'horizontal';\n    },\n    hit() {\n      return this.hits++;\n    },\n    isSunk() {\n      if (this.hits === this.length) {\n        return this.sunk = true;\n      }\n      return this.sunk;\n    }\n  };\n}\nmodule.exports = Ship;\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles.scss":
/*!******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles.scss ***!
  \******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `h1 {\n  color: red;\n}\nh1:hover {\n  color: blue;\n}\n\nbutton {\n  background-color: rgba(0, 0, 0, 0.8);\n  border: 2px solid #FFF;\n  color: #FFF;\n}\nbutton:hover {\n  background-color: rgba(0, 0, 0, 0.6);\n  cursor: pointer;\n}\nbutton:active {\n  border: 2px solid #000;\n  color: #000;\n}\n\n#shipsBtn, #rotateBtn {\n  border-radius: 0.5rem;\n}\n\n#clearPlacement, #confirmPlacement {\n  border-radius: 1rem;\n}\n\n.battleShip {\n  height: 100%;\n  width: 100%;\n}\n\n.header, .footer {\n  background-color: rgba(0, 0, 0, 0.5);\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.header {\n  height: 15vh;\n}\n.header .title {\n  font-size: x-large;\n}\n\n.gameboardsContainer {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n  align-items: baseline;\n  height: 75vh;\n  background-color: #f5f5f5;\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleship/./src/styles.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./styles.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles.scss\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleship/./src/styles.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;