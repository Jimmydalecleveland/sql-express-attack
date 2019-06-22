const state = {};

// TODO: look up why we can't store this fetch in a variable
fetch('http://localhost:3000/players')
  .then(res => res.json())
  .then(playerJson => {
    playerName.textContent = playerJson[0].name;
    playerStr.textContent = playerJson[0].str;
    state.playerData = playerJson[0];
    attackRollBtn.disabled = false;
  });

const playerName = document.querySelector('#playerName');
const attackRollBtn = document.querySelector('#attackRollBtn');
const playerStr = document.querySelector('#playerStr');
const rollResult = document.querySelector('#rollResult');

attackRollBtn.disabled = true;

// we need our dice to roll a number between 1-20;
function diceRoll() {
  return Math.floor(Math.random() * 20) + 1;
}

// Displaying the dice roll to the DOM
function attackRoll() {
  const strBonus = Math.floor((state.playerData.str - 10) / 2);
  rollResult.textContent = diceRoll() + strBonus;
}

attackRollBtn.addEventListener('click', attackRoll);
