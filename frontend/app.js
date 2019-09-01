const state = {
  playerData: {
    str: 17
  }
};

fetch('http://localhost:80/weapons')
.then(res => res.json())
.then(weapon => {
  const simpleMeleeWeaponsGroup = document.createElement('optgroup');
  simpleMeleeWeaponsGroup.label = 'Simple melee weapons';
 
  const simpleRangedWeaponsGroup = document.createElement('optgroup');
  simpleRangedWeaponsGroup.label = 'Simple ranged weapons';

  const martialMeleeWeaponsGroup = document.createElement('optgroup');
  martialMeleeWeaponsGroup.label = 'Martial melee weapons'

  const martialRangedWeaponsGroup = document.createElement('optgroup');
  martialRangedWeaponsGroup.label = 'Martial ranged weapons'

  weapon.forEach(element => {
    const simpleMeleeWeapons = document.createElement('option')
    
    if(element.weaponGroup == 'simple melee weapons') {
      simpleMeleeWeapons.innerHTML = `<option class="option-group">${element.name}</option>`
      weaponSelect.appendChild(simpleMeleeWeaponsGroup).appendChild(simpleMeleeWeapons)
    
    } else if (element.weaponGroup === 'simple ranged weapons') {
    
      const simpleRangedWeapons = document.createElement('option')
      simpleRangedWeapons.innerHTML = `<option class="option-group">${element.name}</option>`
      weaponSelect.appendChild(simpleRangedWeaponsGroup).appendChild(simpleRangedWeapons)
    
    } else if (element.weaponGroup === 'martial melee weapons') {
    
      const martialMeleeWeapons = document.createElement('option');
      martialMeleeWeapons.innerHTML = `<option class="option-group">${element.name}</option>` 
      weaponSelect.appendChild(martialMeleeWeaponsGroup).appendChild(martialMeleeWeapons)
    } else if (element.weaponGroup === 'martial ranged weapons'){
      
      const martialRangedWeapons = document.createElement('option');
      martialRangedWeapons.innerHTML = `<option class="option-group">${element.name}</option>`
      weaponSelect.appendChild(martialRangedWeaponsGroup).appendChild(martialRangedWeapons)
    }
    state.weaponDamage = weapon
  })
})  


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
const d20Roll = document.querySelector('#rollResult');
const damageResult = document.querySelector('#damageRoll')
const raceSelections = document.querySelector('#raceSelections');
const weaponSelect = document.querySelector('#weapon-select')
let damageDieResult;

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
  const proficency = 2
  const strBonus = Math.floor(
    (state.playerData.str + state.races[state.chosenRace].strBonus - 10) / 2
  );
  return Math.floor(Math.random() * 20 + strBonus + proficency) + 1;
}

// Displaying the dice roll to the DOM
function attackRoll() {
  if (state.races === 'undefined') return;
  const strBonus = Math.floor(
    (state.playerData.str + state.races[state.chosenRace].strBonus - 10) / 2
  );
  // rollResult.textContent = diceRoll() + strBonus;
  d20Roll.textContent = 'D20 roll ' + diceRoll();
  damageResult.textContent = `Damage roll for ${weaponName} ` + damageDie()
}

function damageDie() {
  const strBonus = Math.floor(
    (state.playerData.str + state.races[state.chosenRace].strBonus - 10) / 2
  );
  const dieSplit  = damageDieResult.split('d')
  const damageRoll = Math.floor((Math.random() * dieSplit[1]) + strBonus) + 1
  if(dieSplit[0] === '2') {
    const damageRoll2 = Math.floor((Math.random() * dieSplit[1]) + strBonus) + 1
    return damageRoll + damageRoll2
  }
  return damageRoll
}

attackRollBtn.addEventListener('click', attackRoll);  

weaponSelect.addEventListener('change', function(e) {
  state.weaponDamage.forEach(weapon => {
    if(this.value === weapon.name) {
      damageDieResult = weapon.damage
      weaponName = weapon.name
      damageDie()
      return damageDieResult
    } else {
      return
    }
  })
})