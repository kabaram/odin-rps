class Sprite {
    constructor(x, y, width, height, docClass) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.docClass = docClass;
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
        img.onload = function () {
            context.drawImage(img, sprite.x + 13, sprite.y - 14, sprite.width, sprite.height, 0, 0, myCanvas.width, myCanvas.height);
        }
    }


}

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

//hex background color of sprite sheet
const SPRITE_SHEET_BACKGROUND = "749AD4";

const IMAGE_SOURCE = "./images/kirby-ss.png";

const SWORD_CHOICE_SPRITE = new Sprite(308, 1030, 18, 31, '.sword-choice-canvas');
SWORD_CHOICE_SPRITE.showAbility();
const SWORD_WIN_SPRITE = new Sprite(266, 1026, 20, 35);
const SWORD_LOSE_SPRITE = new Sprite(17, 1148, 16, 23);
const SWORD_ABILITY = new Ability('Sword', 'slash', SWORD_CHOICE_SPRITE, SWORD_WIN_SPRITE, SWORD_LOSE_SPRITE, 2);

const STONE_CHOICE_SPRITE = new Sprite(162, 796, 22, 16, '.stone-choice-canvas');
STONE_CHOICE_SPRITE.showAbility();
const STONE_WIN_SPRITE = new Sprite(134, 796, 22, 19);
const STONE_LOSE_SPRITE = new Sprite(85, 797, 16, 14);
const STONE_ABILITY = new Ability('Stone', 'crush', STONE_CHOICE_SPRITE, STONE_WIN_SPRITE, STONE_LOSE_SPRITE, 0);

const PARASOL_CHOICE_SPRITE = new Sprite(168, 1425, 20, 31, '.parasol-choice-canvas');
PARASOL_CHOICE_SPRITE.showAbility();
const PARASOL_WIN_SPRITE = new Sprite(197, 1442, 20, 30);
const PARASOL_LOSE_SPRITE = new Sprite(16, 1557, 17, 26);
const PARASOL_ABILITY = new Ability('Parasol', 'cover', PARASOL_CHOICE_SPRITE, PARASOL_WIN_SPRITE, PARASOL_LOSE_SPRITE, 1);

const stoneButton = document.querySelector('.stone');
const parasolButton = document.querySelector('.parasol');
const swordButton = document.querySelector('.sword');

stoneButton.addEventListener('click', function () { playOneRound(0) });
parasolButton.addEventListener('click', function () { playOneRound(1) });
swordButton.addEventListener('click', function () { playOneRound(2) });


let playerScore = 0;
let computerScore = 0;



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

function playOneRound(humanChoice, computerAbility = getComputerAbility()) {

    let resultIcons = document.querySelectorAll('.result-icon-cell');
    resultIcons.forEach((icon) => {
        icon.style.display = "flex";
    })
    let humanAbility = getHumanAbility(humanChoice);
    let textField = document.querySelector('.result-text-cell');
    textField.style.width = "30%";
    if (humanAbility.arenaValue === computerAbility.arenaValue) {
        humanAbility.winSprite.showPlayerResult();
        computerAbility.winSprite.showComputerResult();
        textField.innerHTML = "Draw! Both players chose " + humanAbility.name + ".";
    }

    else if ((humanAbility.arenaValue + 1) % 3 == computerAbility.arenaValue) {
        humanAbility.loseSprite.showPlayerResult();
        computerAbility.winSprite.showComputerResult();
        textField.innerHTML = "Fail! Your " + humanAbility.name + " is " + computerAbility.verb + "ed by the computer's " + computerAbility.name + ".";
        computerScore++;
        let scoreField = document.querySelector('.computer-score');
        scoreField.innerHTML = "Computer: " + computerScore;
    }
    else {
        humanAbility.winSprite.showPlayerResult();
        computerAbility.loseSprite.showComputerResult();
        textField.innerHTML = "Victory! Your " + humanAbility.name + " " + humanAbility.verb + (humanAbility.name !== 'Parasol' ? 'e' : '') + "s the computer's " + computerAbility.name + ".";
        playerScore++;
        let scoreField = document.querySelector('.player-score');
        scoreField.innerHTML = "Player: " + playerScore;
    }
}

let resultIcons = document.querySelectorAll('.result-icon-cell');
resultIcons.forEach((icon) => {
    icon.style.display = "none";
})
let resultText = document.querySelector('.result-text-cell');
resultText.style.width = "100%";

// function game() {
//     let playerScore = 0;
//     let computerScore = 0;
//     for (let i = 1; i <= 5; i++) {
//         let playerChoice = prompt("Round #" + i + ": Choose: (0 - Stone) (1 - Parasol) (3 - Sword)");
//         let result = playOneRound(playerChoice);
//         if (result.includes("Fail")) {
//             computerScore++;
//         }
//         else if (result.includes("Victory")) {
//             playerScore++;
//         }
//         console.log(result);
//         console.log("Player: " + playerScore + ", Computer: " + computerScore);
//     }
//     if (playerScore > computerScore) {
//         console.log("You win!");
//     }
//     else if (computerScore > playerScore) {
//         console.log("Computer wins!");
//     }
//     else {
//         console.log("It's a tie!");
//     }
//}


