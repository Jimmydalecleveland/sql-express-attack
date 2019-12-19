import state from './state';
import loadWeapons from './weapon';
// TODO: look up why we can't store this fetch in a variable
fetch('https://backend.rpgattackroll.com/races')
  .then((res) => res.json())
  .then((raceJson) => {
    state.chosenRace = raceJson[0].id
    state.races = raceJson.reduce((stateRaces, currentRace) => {
      const { id, ...rest } = currentRace
      stateRaces[id] = rest
      return stateRaces
    }, {})

    Object.keys(state.races).forEach((id) => {
      const raceButton = document.createElement('button')
      // raceButton.textContent = state.races[id].name;
      const imageSlug = slugify(state.races[id].name)
      raceButton.dataset.raceId = id
      raceButton.classList.add('race-button', imageSlug)
      raceButton.innerHTML = `<img src="./images/${imageSlug}.svg" />`
      raceButton.addEventListener('click', handleRaceClick)
      raceSelections.appendChild(raceButton)
    })

    playerName.textContent = state.races[state.chosenRace].name
    racialStr.textContent = state.races[state.chosenRace].strBonus
    racialDex.textContent = state.races[state.chosenRace].dexBonus
    bonusStrength.textContent = 0

    attackRollBtn.disabled = false
  })

// Store DOM elements
const playerName = document.querySelector('#playerName');
const attackRollBtn = document.querySelector('#attackRollBtn');
const racialStr = document.querySelector('#racialStr');
const racialDex = document.querySelector('#racialDex');
const rollResult = document.querySelector('.roll-result');
const raceSelections = document.querySelector('#raceSelections');
const inputStrength = document.querySelector('.input-strength');
const bonusStrength = document.querySelector('#bonusStr');
const totalResult = document.querySelector('.total-result');
let weaponResult = document.querySelector('.weapon-result');
const weaponSelect = document.querySelector('#weapon-select')


function slugify(str) {
  return str.toLowerCase().replace(' ', '-')
}

function handleRaceClick(event) {
  if (event.target.parentElement.classList.contains('race-button')) {
    state.chosenRace = event.target.parentElement.dataset.raceId
  } else {
    state.chosenRace = event.target.dataset.raceId
  }
}

attackRollBtn.disabled = true

// we need our dice to roll a number between 1-20;
function diceRoll() {
  return Math.floor(Math.random() * 20) + 1
}

// Displaying the dice roll to the DOM
function attackRoll() {
  if (state.races === 'undefined') return
  const strengthBonus = Math.floor(
    (state.playerData.str + state.races[state.chosenRace].strBonus - 10) / 2
  )

  const diceRollResult = diceRoll()
  rollResult.innerHTML = `Roll: <span>${diceRollResult}</span>`
  totalResult.innerHTML = `Total Roll: <span>${diceRollResult +
    strengthBonus}</span>`
}

raceSelections.addEventListener('click', function(e) {
  if (
    e.target.classList.contains('race-button-group') ||
    e.target.classList.contains('race-button')
  ) {
    return
  } else {
    playerName.textContent = e.target.parentElement.classList[1]
    racialStr.textContent = state.races[state.chosenRace].strBonus
    racialDex.textContent = state.races[state.chosenRace].dexBonus
  }
})

function calculateBonuses() {
  state.playerData.str = parseInt(inputStrength.value)
  const strengthBonus = Math.floor(
    (state.playerData.str + state.races[state.chosenRace].strBonus - 10) / 2
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
  if(!state.weaponRollResult && !state.weaponResult2) return
  if(state.rolls === 1) {
    randomDiceRoll(state.dieNumber)
    weaponResult.innerHTML = `WeaponRoll: <span>${state.weaponRollResult}</span>`
  } else if (state.rolls === 2 ){
    randomDiceRoll(state.dieNumber)
    randomdiceRoll2(state.dieNumber)
    weaponResult.innerHTML = `WeaponRoll: <span>${state.weaponRollResult}</span> WeaponRoll2: <span>${state.weaponResult2}</span>`
  }
}

attackRollBtn.addEventListener('click', attackRoll)
attackRollBtn.addEventListener('click', weaponR)
inputStrength.addEventListener('input', calculateBonuses)
weaponSelect.addEventListener('change', handleOptionSelect);

export default function randomDiceRoll(number) {
  state.weaponRollResult = Math.floor(Math.random() * number) + 1
  return state.weaponRollResult
}

function randomdiceRoll2(number) {
  state.weaponResult2 = Math.floor(Math.random() * number) + 1
  return state.weaponResult2
}
// Option Select State Function

function handleOptionSelect() {
 const sidedDie = this.value.split('');

  if(sidedDie[sidedDie.length - 1] === '2' || sidedDie[sidedDie.length -1] === '0') {
    state.rolls = parseInt(sidedDie[sidedDie.length - 4])
    state.dieNumber = sidedDie[sidedDie.length - 2] + sidedDie[sidedDie.length - 1]
    state.dieNumber = parseInt(state.dieNumber)  
  } else {
    state.dieNumber = parseInt(sidedDie[sidedDie.length - 1]); 
    state.rolls = parseInt(sidedDie[sidedDie.length - 3]);
  };

 if(state.rolls === 1) {
  randomDiceRoll(state.dieNumber); 
 }

 if(state.rolls === 2) {
   randomDiceRoll(state.dieNumber);
   randomdiceRoll2(state.dieNumber)
 }
}

loadWeapons()
