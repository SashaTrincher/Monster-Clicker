const normalAttackElement = document.querySelector('.action-attack');
const ultAttackElement = document.querySelector('.action-ult-attack');
const miscElement = document.querySelector('.action-special');

const enemyHpElement = document.querySelector('.enemy-hp');
let constantEnemyHp = 100;
let enemyHp = 100;

enemyHpElement.innerHTML = `Hp: ${enemyHp}`;

let character = {
    level: 1,
    exp: 0,
}

const battleRating = character.level * 100;

console.log(battleRating);

function updateHpElement () {
    enemyHpElement.innerHTML = `Hp: ${enemyHp}`;
};

function calculateDamage (type) {
    switch (true) {
        case type === 'normal':
            return Math.floor(Math.random() * Math.floor(battleRating / 3))
        break;

        case type === 'ult':
            return Math.floor(Math.random() * Math.floor(battleRating / 3)) * 4
        break;
    
        default:
            break;
    }
}

function normalAttack (damage) {
    enemyHp -= damage;
    handleEnemyDeath()
    updateHpElement();
    console.log(`Damaged: ${damage}`);
}

function ultAttack (damage) {
    enemyHp -= damage;
    handleEnemyDeath()
    updateHpElement()
    console.log(`Damaged: ${damage}`);
}

function specialAbil () {
    alert('Under development')
};

function handleExp(amount) {
    character.exp += amount;

    let lvlUpAmount = character.level * 200;

    console.log(character.exp);
    console.log(lvlUpAmount);

    if (character.exp >= lvlUpAmount) {
        character.level += 1;
        alert(`You have leveled up! Your next level is : ${character.level}`)
    } else {
        return
    }
}

function handleEnemyDeath () {
    if (enemyHp <= 0) {
        enemyHp = constantEnemyHp * 2
        constantEnemyHp = enemyHp
        updateHpElement();
        handleExp(100);
    } else {
        return
    }
}

normalAttackElement.addEventListener('click', () => {
    normalAttack(calculateDamage('normal'));
});

ultAttackElement.addEventListener('click', () => {
    ultAttack(calculateDamage('ult'));
});

miscElement.addEventListener('click', () => {
    specialAbil();
});