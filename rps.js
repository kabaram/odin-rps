class Sprite {
    constructor(x, y, width, height, docClass) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.docClass = docClass;
    }

     showImage(sprite){
        let myCanvas = document.querySelector(this.docClass);
        myCanvas.width = this.width * 4;
        myCanvas.height = this.height * 4;
        let context = myCanvas.getContext('2d');
        let img = new Image();
        img.src = IMAGE_SOURCE;
        img.onload = function(){
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
SWORD_CHOICE_SPRITE.showImage(SWORD_CHOICE_SPRITE);
const SWORD_WIN_SPRITE = new Sprite(275, 1029, 39, 44);
const SWORD_LOSE_SPRITE = new Sprite(41, 1149, 16, 27);
const SWORD_ABILITY = new Ability('Sword', 'slash', SWORD_CHOICE_SPRITE, SWORD_WIN_SPRITE, SWORD_LOSE_SPRITE, 2);

const STONE_CHOICE_SPRITE = new Sprite(162, 796, 22, 16, '.stone-choice-canvas');
STONE_CHOICE_SPRITE.showImage(STONE_CHOICE_SPRITE);
const STONE_WIN_SPRITE = new Sprite(133, 796, 24, 24);
const STONE_LOSE_SPRITE = new Sprite(85, 769, 16, 16);
const STONE_ABILITY = new Ability('Stone', 'crush', STONE_CHOICE_SPRITE, STONE_WIN_SPRITE, STONE_LOSE_SPRITE, 0);

const PARASOL_CHOICE_SPRITE = new Sprite(168, 1425, 20, 31, '.parasol-choice-canvas');
PARASOL_CHOICE_SPRITE.showImage(PARASOL_CHOICE_SPRITE);
const PARASOL_WIN_SPRITE = new Sprite(197, 1440, 31, 32);
const PARASOL_LOSE_SPRITE = new Sprite(29, 1564, 21, 33);
const PARASOL_ABILITY = new Ability('Parasol', 'cover', PARASOL_CHOICE_SPRITE, PARASOL_WIN_SPRITE, PARASOL_LOSE_SPRITE, 1);

const stoneButton = document.querySelector('.stone');
const parasolButton = document.querySelector('.parasol');
const swordButton = document.querySelector('.sword');

stoneButton.addEventListener('click', function () { playOneRound(0) });
parasolButton.addEventListener('click', function () { playOneRound(1) });
swordButton.addEventListener('click', function () { playOneRound(2) });






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
    humanAbility = getHumanAbility(humanChoice);

    if (humanAbility.arenaValue === computerAbility.arenaValue) {
        console.log("Draw! Both players chose " + humanAbility.name + ".");
    }

    else if ((humanAbility.arenaValue + 1) % 3 == computerAbility.arenaValue) {
        console.log("Fail! Your " + humanAbility.name + " is " + computerAbility.verb  + "ed by the computer's " + computerAbility.name + ".");
    }
    else {
        console.log("Victory! Your " + humanAbility.name + " " + humanAbility.verb + (humanAbility.name !== 'Parasol' ? 'e' : '') +"s the computer's " + computerAbility.name + ".");
    }
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 1; i <= 5; i++) {
        let playerChoice = prompt("Round #" + i + ": Choose: (0 - Stone) (1 - Parasol) (3 - Sword)");
        let result = playOneRound(playerChoice);
        if (result.includes("Fail")) {
            computerScore++;
        }
        else if (result.includes("Victory")) {
            playerScore++;
        }
        console.log(result);
        console.log("Player: " + playerScore + ", Computer: " + computerScore);
    }
    if (playerScore > computerScore) {
        console.log("You win!");
    }
    else if (computerScore > playerScore) {
        console.log("Computer wins!");
    }
    else {
        console.log("It's a tie!");
    }
}


