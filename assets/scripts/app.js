
// 
const attackVal = 10;
const monsterAttackVal = 14;
const strongAttack = 18;
const healVal = 12;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

// function to determine when the game ends, and if player won/ lost /draw
function endRound() {
  const playerDmg = dealPlayerDamage(monsterAttackVal);
  currentPlayerHealth -= playerDmg;
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('YOU WON!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0 ) {
    alert('YOU LOST');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0 ) {
    alert('DRAW');
  }

}

// function determining which attack mode is being performed by the player
function attackMonster(mode) {
  let maxDmg;
  if (mode === 'ATTACK') {
    maxDmg = attackVal;
  } else if (mode === 'STRONG ATTACK'){
    maxDmg = strongAttack;
  }
  const dmg = dealMonsterDamage(attackVal);
  currentMonsterHealth -= dmg;
  endRound();
 
}

// handler function calling normal attack
function attackMonsterHandler () {
  attackMonster('ATTACK');
}

// handler function calling strong attack
function strongAttackHandler() {
  attackMonster('STRONG-ATTACK');

}

// handler function that heals player
function healPlayerHandler() {
  increasePlayerHealth(healVal);
  endRound();


}

// event listeners 
attackBtn.addEventListener('click', attackMonsterHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler)
healBtn.addEventListener('click', healPlayerHandler)

