!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const o={playerData:{str:17}};fetch("https://backend.rpgattackroll.com/races").then(e=>e.json()).then(e=>{o.chosenRace=e[0].id,o.races=e.reduce((e,t)=>{const{id:n,...o}=t;return e[n]=o,e},{}),Object.keys(o.races).forEach(e=>{const t=document.createElement("button"),n=function(e){return e.toLowerCase().replace(" ","-")}(o.races[e].name);t.dataset.raceId=e,t.classList.add("race-button",n),t.innerHTML=`<img src="images/${n}.svg" />`,t.addEventListener("click",m),u.appendChild(t)}),a.textContent=o.races[o.chosenRace].name,c.textContent=o.races[o.chosenRace].strBonus,s.textContent=o.races[o.chosenRace].dexBonus,d.textContent=0,r.disabled=!1});const a=document.querySelector("#playerName"),r=document.querySelector("#attackRollBtn"),c=document.querySelector("#racialStr"),s=document.querySelector("#racialDex"),l=document.querySelector("#rollResult"),u=document.querySelector("#raceSelections"),i=document.querySelector(".input-strength"),d=document.querySelector("#bonusStr"),p=document.querySelector("#totalResult");function m(e){e.target.parentElement.classList.contains("race-button")?o.chosenRace=e.target.parentElement.dataset.raceId:o.chosenRace=e.target.dataset.raceId}r.disabled=!0,u.addEventListener("click",(function(e){e.target.classList.contains("race-button-group")||e.target.classList.contains("race-button")||(a.textContent=e.target.parentElement.classList[1],c.textContent=o.races[o.chosenRace].strBonus,s.textContent=o.races[o.chosenRace].dexBonus)})),r.addEventListener("click",(function(){if("undefined"===o.races)return;const e=Math.floor((o.playerData.str+o.races[o.chosenRace].strBonus-10)/2),t=Math.floor(20*Math.random())+1;l.innerHTML=`<h3>Roll: ${t}</h3> `,p.innerHTML=`<h3>Total Roll: ${t+e}</h3>`})),i.addEventListener("input",(function(){o.playerData.str=parseInt(i.value);const e=Math.floor((o.playerData.str+o.races[o.chosenRace].strBonus-10)/2);e<=0?(d.textContent=0,r.disabled=!1):!1===Number.isInteger(e)?(r.disabled=!0,d.textContent=0):(d.textContent=e,r.disabled=!1)})),function(){function e(e,n,o){const a=document.createElement("option");a.innerHTML=`<option>${e} ${o}</option>`,t.appendChild(n).appendChild(a)}fetch("https://backend.rpgattackroll.com/weapons").then(e=>e.json()).then(t=>{const n=document.createElement("optgroup");n.label="Simple melee weapons";const o=document.createElement("optgroup");o.label="Simple ranged weapons";const a=document.createElement("optgroup");a.label="Martial melee weapons";const r=document.createElement("optgroup");r.label="Martial ranged weapons",t.forEach(t=>{"Simple Melee Weapons"===t.weaponGroup?e(t.name,n,t.damage):"Simple Ranged Weapons"===t.weaponGroup?e(t.name,o,t.damage):"Martial Melee Weapons"===t.weaponGroup?e(t.name,a,t.damage):"Martial Ranged Weapons"===t.weaponGroup&&e(t.name,r,t.damage)})});const t=document.querySelector("#weapon-select")}()}]);