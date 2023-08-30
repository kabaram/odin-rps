//maintains location and size data of subimages from sprite sheet
class Sprite {
    constructor(x, y, width, height, docClass, alt) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.docClass = docClass;
        this.alt = alt;
    }

    showAbility() {
        this.showImage(this.docClass, 3);
    }

    showPlayerResult() {
        this.showImage('.player-result', 4);
    }

    showComputerResult() {
        this.showImage('.computer-result', 4);
    }

    showImage(query, scale) {
        let myCanvas = document.querySelector(query);
        let sprite = this;
        myCanvas.width = this.width * scale;
        myCanvas.height = this.height * scale;
        let context = myCanvas.getContext('2d');
        let img = new Image();
        img.src = IMAGE_SOURCE;
        img.alt = this.alt;
        img.onload = function () {
            context.drawImage(img, sprite.x + 13, sprite.y - 14, sprite.width, sprite.height, 0, 0, myCanvas.width, myCanvas.height);
        }
    }


}

//maintains action and image data on each ability
class Ability {
    constructor(name, verb, choiceSprite, winSprite, loseSprite, arenaValue) {
        this.name = name;
        this.verb = verb;
        this.choiceSprite = choiceSprite;
        this.winSprite = winSprite;
        this.loseSprite = loseSprite;
        this.arenaValue = arenaValue;
    }
}


//Produces ability based on random number generation
function getComputerAbility() {
    let choice = Math.floor(Math.random() * 3);
    if (choice === 0) {
        return STONE_ABILITY;
    }
    else if (choice === 1) {
        return PARASOL_ABILITY;
    }
    else {
        return SWORD_ABILITY;
    }
}

//Maps value associated with selected button to the ability
function getHumanAbility(choice) {
    if (choice === 0) {
        return STONE_ABILITY;
    }
    else if (parseInt(choice) === 1) {
        return PARASOL_ABILITY;
    }
    else {
        return SWORD_ABILITY;
    }
}

//Uses player's button selection to simulate round
function playOneRound(humanChoice, computerAbility = getComputerAbility()) {

    let humanAbility = getHumanAbility(humanChoice);

    //Re-adjust layout of the result container to accommodate icons
    let resultIcons = document.querySelectorAll('.result-icon-cell');
    resultIcons.forEach((icon) => {
        icon.style.display = "flex";
    })
    let textField = document.querySelector('.result-text-cell');
    textField.style.width = "30%";



    //Update score panels
    let playerScoreField = document.querySelector('.player-score');
    playerScoreField.innerHTML = "Player: " + playerScore;
    let computerScoreField = document.querySelector('.computer-score');
    computerScoreField.innerHTML = "Computer: " + computerScore;
    let winner = document.querySelector('.winner-display');
    winner.innerHTML = '';

    let audio;

    //Calculate round winner
    if (humanAbility.arenaValue === computerAbility.arenaValue) {
        humanAbility.winSprite.showPlayerResult();
        computerAbility.winSprite.showComputerResult();
        textField.innerHTML = "Draw! Both players chose " + humanAbility.name + ".";
        audio = document.querySelector('#draw-sound');
    }

    else if ((humanAbility.arenaValue + 1) % 3 == computerAbility.arenaValue) {
        humanAbility.loseSprite.showPlayerResult();
        computerAbility.winSprite.showComputerResult();
        textField.innerHTML = "Fail! Your " + humanAbility.name + " is " + computerAbility.verb + "ed by the computer's " + computerAbility.name + ".";
        computerScore++;
        computerScoreField.innerHTML = "Computer: " + computerScore;
        audio = document.querySelector('#lose-sound');
    }
    else {
        humanAbility.winSprite.showPlayerResult();
        computerAbility.loseSprite.showComputerResult();
        textField.innerHTML = "Victory! Your " + humanAbility.name + " " + humanAbility.verb + (humanAbility.name !== 'Parasol' ? 'e' : '') + "s the computer's " + computerAbility.name + ".";
        playerScore++;
        playerScoreField.innerHTML = "Player: " + playerScore;
        audio = document.querySelector('#win-sound');
    }

    audio.play();

    // Declare game victor and reset scores
    if (playerScore == 5) {
        winner.innerHTML = "You win!";
        winner.style.color = "lightpink";
        playerScore = computerScore = 0;
    }
    else if (computerScore == 5) {
        winner.innerHTML = "Computer wins!";
        winner.style.color = 'crimson';
        playerScore = computerScore = 0;
    }
}

//Game initializations

let playerScore = 0;
let computerScore = 0;

//Hex background color of sprite sheet
const SPRITE_SHEET_BACKGROUND = "749AD4";

//Sprite sheet
const IMAGE_SOURCE = "./images/kirby-ss.png";

const STONE_CHOICE_SPRITE = new Sprite(162, 796, 22, 16, '.stone-choice-canvas', 'Kirby as a stone');
const STONE_WIN_SPRITE = new Sprite(134, 796, 22, 19, null, 'Kirby as stone in mid-air');
const STONE_LOSE_SPRITE = new Sprite(85, 797, 16, 14, null, 'Kirby in defeated posture on ground');
const STONE_ABILITY = new Ability('Stone', 'crush', STONE_CHOICE_SPRITE, STONE_WIN_SPRITE, STONE_LOSE_SPRITE, 0);

const PARASOL_CHOICE_SPRITE = new Sprite(168, 1425, 20, 31, '.parasol-choice-canvas', 'Kirby holding parasol');
const PARASOL_WIN_SPRITE = new Sprite(197, 1442, 20, 30, null, 'Kirby using parasol to float downward');
const PARASOL_LOSE_SPRITE = new Sprite(16, 1557, 17, 26, null, 'Kirby lying face-down broken parasol');
const PARASOL_ABILITY = new Ability('Parasol', 'cover', PARASOL_CHOICE_SPRITE, PARASOL_WIN_SPRITE, PARASOL_LOSE_SPRITE, 1);

const SWORD_CHOICE_SPRITE = new Sprite(308, 1030, 18, 31, '.sword-choice-canvas', 'Kirby holding sword');
const SWORD_WIN_SPRITE = new Sprite(266, 1026, 20, 35, null, 'Kirby holding sword in victorious position.');
const SWORD_LOSE_SPRITE = new Sprite(17, 1148, 16, 23, null, 'Kirby lying face-down holding sword.');
const SWORD_ABILITY = new Ability('Sword', 'slash', SWORD_CHOICE_SPRITE, SWORD_WIN_SPRITE, SWORD_LOSE_SPRITE, 2);


//Add gameplay function to buttons
const stoneButton = document.querySelector('.stone-choice');
const parasolButton = document.querySelector('.parasol-choice');
const swordButton = document.querySelector('.sword-choice');

stoneButton.addEventListener('click', function () { playOneRound(0) });
parasolButton.addEventListener('click', function () { playOneRound(1) });
swordButton.addEventListener('click', function () { playOneRound(2) });


stoneButton.addEventListener('mouseenter', function () { stoneButton.classList.add('hovering'); });
stoneButton.addEventListener('mouseleave', function(){stoneButton.classList.remove('hovering', 'clicking');});
stoneButton.addEventListener('mousedown', function () { stoneButton.classList.add('clicking'); });
stoneButton.addEventListener('mouseup', function(){stoneButton.classList.remove('clicking');});
parasolButton.addEventListener('mouseenter', function () { parasolButton.classList.add('hovering'); });
parasolButton.addEventListener('mouseleave', function(){parasolButton.classList.remove('hovering', 'clicking');});
parasolButton.addEventListener('mousedown', function () {parasolButton.classList.add('clicking'); });
parasolButton.addEventListener('mouseup', function(){parasolButton.classList.remove('clicking');});
swordButton.addEventListener('mouseenter', function () { swordButton.classList.add('hovering'); });
swordButton.addEventListener('mouseleave', function() {swordButton.classList.remove('hovering', 'clicking');});
swordButton.addEventListener('mousedown', function () { swordButton.classList.add('clicking'); });
swordButton.addEventListener('mouseup', function(){swordButton.classList.remove('clicking');});


//Display ability buttons
PARASOL_CHOICE_SPRITE.showAbility();
STONE_CHOICE_SPRITE.showAbility();
SWORD_CHOICE_SPRITE.showAbility();

//Hide player icons at start of game
let resultIcons = document.querySelectorAll('.result-icon-cell');
resultIcons.forEach((icon) => {
    icon.style.display = "none";
})
let resultText = document.querySelector('.result-text-cell');
resultText.style.width = "100%";



