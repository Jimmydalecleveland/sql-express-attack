import state from "./state"
import randomDiceRoll from './index';

export default function loadWeapons() {
  function createOptions(weaponName, weaponGroup, weaponDamage) {
    const weaponOption = document.createElement('option')
    weaponOption.innerHTML = `<option>${weaponName} ${weaponDamage}</option>`
    weaponSelect.appendChild(weaponGroup).appendChild(weaponOption)
  }
  
  fetch('https://backend.rpgattackroll.com/weapons')
    .then((res) => res.json())
    .then((weapons) => {
      state.weapon = weapons
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
      state.rolls = 1
      state.dieNumber = 4
      randomDiceRoll(state.rolls)
      return state.weapon
    })

    const weaponSelect = document.querySelector('#weapon-select')

}
