function createOptions(weaponName, weaponGroup) {
  const weaponOption = document.createElement('option');
  weaponOption.innerHTML = `<option>${weaponName}</option>`;
  weaponSelect.appendChild(weaponGroup).appendChild(weaponOption);
}

fetch('https://www.rpgattackroll.com/weapons')
  .then(res => res.json())
  .then(weapons => {
    // Create option groups for each weapon type
    const simpleMeleeWeaponsGroup = document.createElement('optgroup');
    simpleMeleeWeaponsGroup.label = 'Simple melee weapons';

    const simpleRangedWeaponsGroup = document.createElement('optgroup');
    simpleRangedWeaponsGroup.label = 'Simple ranged weapons';

    const martialMeleeWeaponsGroup = document.createElement('optgroup');
    martialMeleeWeaponsGroup.label = 'Martial melee weapons';

    const martialRangedWeaponsGroup = document.createElement('optgroup');
    martialRangedWeaponsGroup.label = 'Martial ranged weapons';

    weapons.forEach(weapon => {
      if (weapon.weaponGroup === 'Simple Melee Weapons') {
        createOptions(weapon.name, simpleMeleeWeaponsGroup);
      } else if (weapon.weaponGroup === 'Simple Ranged Weapons') {
        createOptions(weapon.name, simpleRangedWeaponsGroup);
      } else if (weapon.weaponGroup === 'Martial Melee Weapons') {
        createOptions(weapon.name, martialMeleeWeaponsGroup);
      } else if (weapon.weaponGroup === 'Martial Ranged Weapons') {
        createOptions(weapon.name, martialRangedWeaponsGroup);
      }
    });
  });

const weaponSelect = document.querySelector('#weapon-select');