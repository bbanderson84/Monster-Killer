
// variables that wont change globally
const attackVal = 10;
const monsterAttackVal = 14;
const strongAttack = 18;
const healVal = 12;
const modeAttack = 'ATTACK'; // modeattack = 0
const modeStrongAttack = 'STRONG ATTACK'; //modeStrongAttack = 0
const logEventPlayerAttack = 'PLAYER ATTACK';
const logEventPlayerStrongAttack = 'PLAYER STRONG ATTACK';
const logEventMonsterAttack = 'MONSTER ATTACK';
const logEventPlayerHeal = 'PLAYER HEAL';
const logEventGameOver = 'GAME OVER';

let lastLoggedEntry;

function getMaxLifeValues() {
  const enteredVal = prompt('Max life for user and monster', '100');
  const parsedVal = parseInt(enteredVal);

if (isNaN(parsedVal) || parsedVal <= 0) {
    throw {message: 'Invalid user input'};
  }
  return parsedVal;
}

let chosenMaxLife;

try {
   chosenMaxLife = getMaxLifeValues();
} catch(error) {
  console.log(error);
  chosenMaxLife = 100;
  alert('You have entered something wrong! default value of 100 was used');

}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

// calls determined start health for player from vendor.js
adjustHealthBars(chosenMaxLife);

function writeLog(ev, val, currentMonsterHealth, currentPlayerHealth) {
  let logEntry = {
      event: ev,
      value: val,
      finalMonsterHealth: currentMonsterHealth,
      finalPlayerHealth: currentPlayerHealth
  };
  switch (ev) {
    case logEventPlayerAttack:
      logEntry.target = 'MONSTER';
      break;
    case logEventPlayerStrongAttack:
    logEntry.target = 'MONSTER';
      break;
    case logEventMonsterAttack:
      logEntry.target = 'PLAYER';
      break;
    case logEventPlayerHeal:
      logEntry.target = 'PLAYER';
      break;
    case logEventGameOver:
      logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: currentMonsterHealth,
        finalPlayerHealth: currentPlayerHealth
      };
      break;
      default:
        logEntry= {};
  
  }
  
    battleLog.push(logEntry);
}

// function that determines if the game is over, to reset it // resetGame called from vendor.js
function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

// function to determine when the game ends, and if player won/ lost /draw, calls from vendor.js
function endRound() {
  const initialPlayerLife = currentPlayerHealth;
  const playerDmg = dealPlayerDamage(monsterAttackVal);
  currentPlayerHealth -= playerDmg;
  writeLog(logEventMonsterAttack, playerDmg, currentMonsterHealth, currentPlayerHealth);

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerLife;
    alert("You would be dead, but bonus life saved you!");
    setPlayerHealth(initialPlayerLife);
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('YOU WON!');
    writeLog(logEventGameOver, 'PLAYER WON', currentMonsterHealth, currentPlayerHealth);
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0 ) {
    alert('YOU LOST');
    writeLog(logEventGameOver, 'MONSTER WON', currentMonsterHealth, currentPlayerHealth);
    reset();
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0 ) {
    alert('DRAW');
    writeLog(logEventGameOver, 'DRAW', currentMonsterHealth, currentPlayerHealth);
    reset();
  }

}


// function determining which attack mode is being performed by the player
function attackMonster(mode) {
  //using ternary expression
  const maxDmg = mode === modeAttack ? attackVal: strongAttack;
  const logEvent = mode === modeAttack ? logEventPlayerAttack: logEventPlayerStrongAttack;
  // if (mode === modeAttack) {
  //   maxDmg = attackVal;
  //   logEvent = logEventPlayerAttack;
  // } else if (mode === modeStrongAttack){
  //   maxDmg = strongAttack;
  //   logEvent = logEventPlayerStrongAttack;
  // }
  const dmg = dealMonsterDamage(attackVal);
  currentMonsterHealth -= dmg;
  writeLog(logEvent, dmg, currentMonsterHealth, currentPlayerHealth);
  endRound();
 
}

// handler function calling normal attack
function attackMonsterHandler () {
  attackMonster(modeAttack);
}

// handler function calling strong attack
function strongAttackHandler() {
  attackMonster(modeStrongAttack);

}

// handler function that heals player using function from vendor.js
function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - healVal) {
    alert("You can't heal to more than max initial health ");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = healVal;
  }
  increasePlayerHealth(healVal);
  currentPlayerHealth += healVal;
  writeLog(logEventPlayerHeal, healValue, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

// function that logs actions 
function printLogHandler() {
  for (let i = 0; i < 3; i++) {
    console.log('----------');
  }
  let j = 0;
  //label statement
  outerWhile: do {
     console.log('Outer', j);
     //label statement 
     innerFor: for ( let k = 0; k < 5; k++) {
       if (k === 3) {
         break outerWhile;
       }
       console.log('Inner', k);
     }
    j++;
  } while (j < 3);
   
  

  // for (let i = 0; i< battleLog.length; i++) {
  //   console.logt(battleLog[i]);
  // }
  let i = 0;
  for (const logEntry of battleLog) {
    if ((!lastLoggedEntry && lastLoggedEntry !== 0) || lastLoggedEntry < i) {
      console.log(`#${i}`);
      for (const key in logEntry) {
        console.log(`${key} => ${logEntry[key]}`);
    }
    lastLoggedEntry = i;
    break;
    }
    i++;
  }
  // console.log(battleLog);
}

// event listeners 
attackBtn.addEventListener('click', attackMonsterHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
