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
      simpleMeleeWeapons.innerHTML = `<option>${element.name}</option>`
      weaponSelect.appendChild(simpleMeleeWeaponsGroup).appendChild(simpleMeleeWeapons)
    
    } else if (element.weaponGroup === 'simple ranged weapons') {
    
      const simpleRangedWeapons = document.createElement('option')
      simpleRangedWeapons.innerHTML = `<option>${element.name}</option>`
      weaponSelect.appendChild(simpleRangedWeaponsGroup).appendChild(simpleRangedWeapons)
    
    } else if (element.weaponGroup === 'martial melee weapons') {
    
      const martialMeleeWeapons = document.createElement('option');
      martialMeleeWeapons.innerHTML = `<option>${element.name}</option>` 
      weaponSelect.appendChild(martialMeleeWeaponsGroup).appendChild(martialMeleeWeapons)
    } else if (element.weaponGroup === 'martial ranged weapons'){
      
      const martialRangedWeapons = document.createElement('option');
      martialRangedWeapons.innerHTML = `<option>${element.name}</option>`
      weaponSelect.appendChild(martialRangedWeaponsGroup).appendChild(martialRangedWeapons)
    }
  });
})  

let weaponSelect = document.querySelector('#weapon-select')
