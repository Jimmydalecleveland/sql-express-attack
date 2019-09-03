const state = {
  playerData: {
    str: 17
  }
};

// TODO: look up why we can't store this fetch in a variable
fetch('http://localhost:80/races')
  .then(res => res.json())
  .then(raceJson => {
    state.chosenRace = raceJson[0].id;
    state.races = raceJson.reduce((stateRaces, currentRace) => {
      const { id, ...rest } = currentRace;
      stateRaces[id] = rest;
      return stateRaces;
    }, {});

    Object.keys(state.races).forEach(id => {
      const raceButton = document.createElement('button');
      // raceButton.textContent = state.races[id].name;
      const imageSlug = slugify(state.races[id].name);
      raceButton.dataset.raceId = id;
      raceButton.classList.add('race-button', imageSlug);
      raceButton.innerHTML = `<img src="images/${imageSlug}.svg" />`;
      raceButton.addEventListener('click', handleRaceClick);
      raceSelections.appendChild(raceButton);
    });

    attackRollBtn.disabled = false;
  });

const playerName = document.querySelector('#playerName');
const attackRollBtn = document.querySelector('#attackRollBtn');
const playerStr = document.querySelector('#playerStr');
const rollResult = document.querySelector('#rollResult');
const raceSelections = document.querySelector('#raceSelections');

function slugify(str) {
  return str.toLowerCase().replace(' ', '-');
}

function handleRaceClick(event) {
  if (event.target.parentElement.classList.contains('race-button')) {
    state.chosenRace = event.target.parentElement.dataset.raceId;
  } else {
    state.chosenRace = event.target.dataset.raceId;
  }
}

attackRollBtn.disabled = true;

// we need our dice to roll a number between 1-20;
function diceRoll() {
  return Math.floor(Math.random() * 20) + 1;
}

// Displaying the dice roll to the DOM
function attackRoll() {
  if (state.races === 'undefined') return;
  const strBonus = Math.floor(
    (state.playerData.str + state.races[state.chosenRace].strBonus - 10) / 2
  );
  // rollResult.textContent = diceRoll() + strBonus;
  rollResult.textContent = diceRoll() + strBonus;
}

attackRollBtn.addEventListener('click', attackRoll);
