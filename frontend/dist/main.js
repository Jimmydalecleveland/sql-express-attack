/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _weapon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weapon */ "./src/weapon.js");


// TODO: look up why we can't store this fetch in a variable
fetch('https://backend.rpgattackroll.com/races')
  .then((res) => res.json())
  .then((raceJson) => {
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].chosenRace = raceJson[0].id
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].races = raceJson.reduce((stateRaces, currentRace) => {
      const { id, ...rest } = currentRace
      stateRaces[id] = rest
      return stateRaces
    }, {})

    Object.keys(_state__WEBPACK_IMPORTED_MODULE_0__["default"].races).forEach((id) => {
      const raceButton = document.createElement('button')
      // raceButton.textContent = state.races[id].name;
      const imageSlug = slugify(_state__WEBPACK_IMPORTED_MODULE_0__["default"].races[id].name)
      raceButton.dataset.raceId = id
      raceButton.classList.add('race-button', imageSlug)
      raceButton.innerHTML = `<img src="./images/${imageSlug}.svg" />`
      raceButton.addEventListener('click', handleRaceClick)
      raceSelections.appendChild(raceButton)
    })

    playerName.textContent = _state__WEBPACK_IMPORTED_MODULE_0__["default"].races[_state__WEBPACK_IMPORTED_MODULE_0__["default"].chosenRace].name
    racialStr.textContent = _state__WEBPACK_IMPORTED_MODULE_0__["default"].races[_state__WEBPACK_IMPORTED_MODULE_0__["default"].chosenRace].strBonus
    racialDex.textContent = _state__WEBPACK_IMPORTED_MODULE_0__["default"].races[_state__WEBPACK_IMPORTED_MODULE_0__["default"].chosenRace].dexBonus
    bonusStrength.textContent = 0

    attackRollBtn.disabled = false
  })

// Store DOM elements
const playerName = document.querySelector('#playerName');
const attackRollBtn = document.querySelector('#attackRollBtn');
const racialStr = document.querySelector('#racialStr');
const racialDex = document.querySelector('#racialDex');
const rollResult = document.querySelector('#rollResult');
const raceSelections = document.querySelector('#raceSelections');
const inputStrength = document.querySelector('.input-strength');
const bonusStrength = document.querySelector('#bonusStr');
const totalResult = document.querySelector('#totalResult');
let weaponResult = document.querySelector('#weaponResult');
const weaponSelect = document.querySelector('#weapon-select')



function slugify(str) {
  return str.toLowerCase().replace(' ', '-')
}

function handleRaceClick(event) {
  if (event.target.parentElement.classList.contains('race-button')) {
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].chosenRace = event.target.parentElement.dataset.raceId
  } else {
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].chosenRace = event.target.dataset.raceId
  }
}

attackRollBtn.disabled = true

// we need our dice to roll a number between 1-20;
function diceRoll() {
  return Math.floor(Math.random() * 20) + 1
}

// Displaying the dice roll to the DOM
function attackRoll() {
  if (_state__WEBPACK_IMPORTED_MODULE_0__["default"].races === 'undefined') return
  const strengthBonus = Math.floor(
    (_state__WEBPACK_IMPORTED_MODULE_0__["default"].playerData.str + _state__WEBPACK_IMPORTED_MODULE_0__["default"].races[_state__WEBPACK_IMPORTED_MODULE_0__["default"].chosenRace].strBonus - 10) / 2
  )

  const diceRollResult = diceRoll()
  rollResult.innerHTML = `<h3>Roll: ${diceRollResult}</h3> `
  totalResult.innerHTML = `<h3>Total Roll: ${diceRollResult +
    strengthBonus}</h3>`
}

raceSelections.addEventListener('click', function(e) {
  if (
    e.target.classList.contains('race-button-group') ||
    e.target.classList.contains('race-button')
  ) {
    return
  } else {
    playerName.textContent = e.target.parentElement.classList[1]
    racialStr.textContent = _state__WEBPACK_IMPORTED_MODULE_0__["default"].races[_state__WEBPACK_IMPORTED_MODULE_0__["default"].chosenRace].strBonus
    racialDex.textContent = _state__WEBPACK_IMPORTED_MODULE_0__["default"].races[_state__WEBPACK_IMPORTED_MODULE_0__["default"].chosenRace].dexBonus
  }
})

function calculateBonuses() {
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].playerData.str = parseInt(inputStrength.value)
  const strengthBonus = Math.floor(
    (_state__WEBPACK_IMPORTED_MODULE_0__["default"].playerData.str + _state__WEBPACK_IMPORTED_MODULE_0__["default"].races[_state__WEBPACK_IMPORTED_MODULE_0__["default"].chosenRace].strBonus - 10) / 2
  )
  if (strengthBonus <= 0) {
    bonusStrength.textContent = 0
    attackRollBtn.disabled = false
  } else if (Number.isInteger(strengthBonus) === false) {
    attackRollBtn.disabled = true
    bonusStrength.textContent = 0
  } else {
    bonusStrength.textContent = strengthBonus
    attackRollBtn.disabled = false
  }
}

function weaponR() {
  if(!_state__WEBPACK_IMPORTED_MODULE_0__["default"].result && !_state__WEBPACK_IMPORTED_MODULE_0__["default"].result1) return
  if(!_state__WEBPACK_IMPORTED_MODULE_0__["default"].result1) {
    randomDiceRoll(_state__WEBPACK_IMPORTED_MODULE_0__["default"].howManyToRoll)
    weaponResult.innerHTML = `<h3>WeaponRoll: ${_state__WEBPACK_IMPORTED_MODULE_0__["default"].result}</h3>`
  } else {
    randomDiceRoll(_state__WEBPACK_IMPORTED_MODULE_0__["default"].howManyToRoll)
    randomdiceRoll2(_state__WEBPACK_IMPORTED_MODULE_0__["default"].howManyToRoll)
    weaponResult.innerHTML = `<h3>WeaponRoll1: ${_state__WEBPACK_IMPORTED_MODULE_0__["default"].result} WeaponRoll2: ${_state__WEBPACK_IMPORTED_MODULE_0__["default"].result1} `
  }
}

attackRollBtn.addEventListener('click', attackRoll)
attackRollBtn.addEventListener('click', weaponR)
inputStrength.addEventListener('input', calculateBonuses)
weaponSelect.addEventListener('change', handleOptionSelect);

function randomDiceRoll(number) {
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].result = Math.floor(Math.random() * number) + 1
  return _state__WEBPACK_IMPORTED_MODULE_0__["default"].result
}

function randomdiceRoll2(number) {
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].result1 = Math.floor(Math.random() * number) + 1
  console.log(_state__WEBPACK_IMPORTED_MODULE_0__["default"].result)
  return _state__WEBPACK_IMPORTED_MODULE_0__["default"].result1
}
function handleOptionSelect() {
 const sidedDie = this.value.split('');
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].howManytoRoll = parseInt(sidedDie[sidedDie.length - 1]); 
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].howManyRolls = parseInt(sidedDie[sidedDie.length - 3]);
  console.log(_state__WEBPACK_IMPORTED_MODULE_0__["default"].howManyToRoll)
 
 if(_state__WEBPACK_IMPORTED_MODULE_0__["default"].howManyRolls === 1) {
  console.log(_state__WEBPACK_IMPORTED_MODULE_0__["default"].howManyToRoll)
  randomDiceRoll(_state__WEBPACK_IMPORTED_MODULE_0__["default"].howManyToRoll); 
 }
 
 if(_state__WEBPACK_IMPORTED_MODULE_0__["default"].howManyRolls === 2) {
   randomDiceRoll(_state__WEBPACK_IMPORTED_MODULE_0__["default"].howManyToRoll);
   randomdiceRoll2(_state__WEBPACK_IMPORTED_MODULE_0__["default"].howManyToRoll)
 }
}


Object(_weapon__WEBPACK_IMPORTED_MODULE_1__["default"])()

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const state = {
  playerData: {
    str: 17,
  },
}  

/* harmony default export */ __webpack_exports__["default"] = (state);

/***/ }),

/***/ "./src/weapon.js":
/*!***********************!*\
  !*** ./src/weapon.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadWeapons; });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");


function loadWeapons() {
  function createOptions(weaponName, weaponGroup, weaponDamage) {
    const weaponOption = document.createElement('option')
    weaponOption.innerHTML = `<option>${weaponName} ${weaponDamage}</option>`
    weaponSelect.appendChild(weaponGroup).appendChild(weaponOption)
  }
  
  fetch('https://backend.rpgattackroll.com/weapons')
    .then((res) => res.json())
    .then((weapons) => {
      _state__WEBPACK_IMPORTED_MODULE_0__["default"].weapon = weapons
      // Create option groups for each weapon type
      const simpleMeleeWeaponsGroup = document.createElement('optgroup')
      simpleMeleeWeaponsGroup.label = 'Simple melee weapons'

      const simpleRangedWeaponsGroup = document.createElement('optgroup')
      simpleRangedWeaponsGroup.label = 'Simple ranged weapons'

      const martialMeleeWeaponsGroup = document.createElement('optgroup')
      martialMeleeWeaponsGroup.label = 'Martial melee weapons'

      const martialRangedWeaponsGroup = document.createElement('optgroup')
      martialRangedWeaponsGroup.label = 'Martial ranged weapons'
      weapons.forEach((weapon) => {
        if (weapon.weaponGroup === 'Simple Melee Weapons') {
          createOptions(weapon.name, simpleMeleeWeaponsGroup, weapon.damage)
        } else if (weapon.weaponGroup === 'Simple Ranged Weapons') {
          createOptions(weapon.name, simpleRangedWeaponsGroup, weapon.damage)
        } else if (weapon.weaponGroup === 'Martial Melee Weapons') {
          createOptions(weapon.name, martialMeleeWeaponsGroup, weapon.damage)
        } else if (weapon.weaponGroup === 'Martial Ranged Weapons') {
          createOptions(weapon.name, martialRangedWeaponsGroup, weapon.damage)
        }
      })
      return _state__WEBPACK_IMPORTED_MODULE_0__["default"].weapon
    })

    const weaponSelect = document.querySelector('#weapon-select')

}



/***/ })

/******/ });
//# sourceMappingURL=main.js.map