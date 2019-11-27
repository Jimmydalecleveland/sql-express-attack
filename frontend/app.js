const state = {
  playerData: {
    str: 17
  },
}



// TODO: look up why we can't store this fetch in a variable
fetch('https://backend.rpgattackroll.com/races')
  .then(res => res.json())
  .then(raceJson => {
    state.chosenRace = raceJson[0].id
    state.races = raceJson.reduce((stateRaces, currentRace) => {
      const { id, ...rest } = currentRace
      stateRaces[id] = rest
      return stateRaces
    }, {})

    Object.keys(state.races).forEach(id => {
      const raceButton = document.createElement('button')
      // raceButton.textContent = state.races[id].name;
      const imageSlug = slugify(state.races[id].name)
      raceButton.dataset.raceId = id
      raceButton.classList.add('race-button', imageSlug)
      raceButton.innerHTML = `<img src="images/${imageSlug}.svg" />`
      raceButton.addEventListener('click', handleRaceClick)
      raceSelections.appendChild(raceButton)
    })
    
    playerName.textContent = state.races[state.chosenRace].name;
    racialDex.textContent = state.races[state.chosenRace].strBonus;
    racialstr.textContent = state.races[state.chosenRace].dexBonus;
    bonusStrength.textContent = 0;
    
    attackRollBtn.disabled = false
  })

const playerName = document.querySelector('#playerName');
const attackRollBtn = document.querySelector('#attackRollBtn');
const racialstr = document.querySelector('#racialStr');
const racialDex = document.querySelector('#racialDex');
const rollResult = document.querySelector('#rollResult');
const raceSelections = document.querySelector('#raceSelections');
const inputStrength = document.querySelector('.input-strength');
const bonusStrength = document.querySelector('#bonusStr');
const totalResult = document.querySelector('#totalResult');
let dice;


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
  return dice = Math.floor(Math.random() * 20) + 1
}

// Displaying the dice roll to the DOM
function attackRoll() {
  if (state.races === 'undefined') return
  let strengthBonus = Math.floor(
    (state.playerData.str + state.races[state.chosenRace].strBonus - 10) / 2)  
    if(strengthBonus < 0) {
      strengthBonus = 0;
    }
    diceRoll()
  rollResult.innerHTML = `<h3>Roll: ${dice}</h3> `;
  totalResult.innerHTML = `<h3>Total Roll: ${dice + strengthBonus}</h3>`
}

raceSelections.addEventListener('click', function(e) {
  if(e.target.classList.contains('race-button-group') || e.target.classList.contains('race-button')) {
    return  
  } else {
    playerName.textContent = e.target.parentElement.classList[1]
    racialDex.textContent = state.races[state.chosenRace].strBonus
    playerDex.textContent = state.races[state.chosenRace].dexBonus
    }
  })
  
  
  function calculateBonuses() {
    state.playerData.str = parseInt(inputStrength.value)
    const strengthBonus = Math.floor( 
      (state.playerData.str + state.races[state.chosenRace].strBonus - 10) / 2)
      if(strengthBonus <= 0) {
        bonusStrength.textContent = 0;
        attackRollBtn.disabled = false
      } else if (Number.isInteger(strengthBonus) === false){
        console.log('working')
        attackRollBtn.disabled = true;
        bonusStrength.textContent = 0;
      } else {
        bonusStrength.textContent = strengthBonus 
        attackRollBtn.disabled = false;
      }
    }
    
attackRollBtn.addEventListener('click', attackRoll)
inputStrength.addEventListener('input', calculateBonuses)
