const normalAttackElement = document.querySelector('.action-attack');
const ultAttackElement = document.querySelector('.action-ult-attack');
const miscElement = document.querySelector('.action-special');

const clicksElement = document.querySelector('.total-clicks');
const enemyHpElement = document.querySelector('.enemy-hp');
let constantEnemyHp = 100;
let enemyHp = 100;

let totalClicks = 0;
let ultClicks = 0;

let ultReadiness = false;

clicksElement.innerHTML = `Total clicks: ${totalClicks}`;

enemyHpElement.innerHTML = `Hp: ${enemyHp}`;

let character = {
    level: 1,
    exp: 0,
};

const battleRating = character.level * 100;

window.onload = () => {
    alert('Spam "Attack" to damage your enemies and level up!')
}

function updateElements () {
    enemyHpElement.innerHTML = `Hp: ${enemyHp}`;
    clicksElement.innerHTML = `Total clicks: ${totalClicks}`;
};

function calculateDamage (type) {
    switch (true) {
        case type === 'normal':
            return Math.floor(Math.random() * Math.floor(battleRating / 3))
        break;

        case type === 'ult':
            return battleRating * 2
        break;
    
        default:
            break;
    }
};

function handleActionElements () {
    if (normalAttackElement.classList.contains('active')) {
        normalAttackElement.classList.replace('active', 'inactive');
        ultAttackElement.classList.replace('inactive', 'active');
    } else {
        normalAttackElement.classList.replace('inactive', 'active');
        ultAttackElement.classList.replace('active', 'inactive');
    }
}

function handleUltClicks () {
    if (ultClicks >= 20) {
        ultReadiness = true;
        ultClicks = 0;

        handleActionElements();
    } else {
        return;
    };
};

function normalAttack (damage) {
    enemyHp -= damage;
    handleEnemyDeath()
    updateElements();
    console.log(`Damaged: ${damage}`);
};

function ultAttack (damage) {
    if (ultReadiness === true) {
        enemyHp -= damage;

        handleEnemyDeath();
        updateElements();

        console.log(`Ulted: ${damage}`);

        handleActionElements();
        ultReadiness === false;
    } else {
        alert('ULT is not ready!');
        return;
    };
};

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
};

function handleEnemyDeath () {
    if (enemyHp <= 0) {
        enemyHp = constantEnemyHp * 2
        constantEnemyHp = enemyHp
        updateElements();
        handleExp(100);
    } else {
        return;
    }
};

normalAttackElement.addEventListener('click', () => {
    totalClicks++;
    ultClicks++;
    handleUltClicks();
    normalAttack(calculateDamage('normal'));
});

ultAttackElement.addEventListener('click', () => {
    totalClicks++;
    ultClicks++;
    handleUltClicks();
    ultAttack(calculateDamage('ult'));
});

miscElement.addEventListener('click', () => {
    totalClicks++;
    specialAbil();
});