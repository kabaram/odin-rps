function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3);
    if (choice === 0) {
        return "Rock";
    }
    else if (choice === 1) {
        return "Paper";
    }
    else {
        return "Scissors";
    }
}

function itemValue(item){
    if (item === "Rock"){
        return 0;
    }
    else if (item === "Paper"){
        return 1;
    }
    else {
        return 2;
    }
}

function playOneRound(playerSelection, computerSelection = getComputerChoice()) {
    playerSelection = playerSelection.charAt(0).toUpperCase() + playerSelection.substring(1).toLowerCase();
    let playerValue = itemValue(playerSelection);
    let computerValue = itemValue(computerSelection);
    
    if (playerValue === computerValue){
        return "It's a tie! Both players chose " + playerSelection + ".";
    }

    else if ((playerValue + 1) % 3 == computerValue){
        return "You lose! " + computerSelection + " beats " + playerSelection + ".";
    }
    else{
        return "You win! " + playerSelection + " beats " + computerSelection + ".";
    }
}

function game(){
    let playerScore = 0;
    let computerScore = 0;
    for (let i = 1; i <= 5; i++){
        let playerChoice = prompt("Round #" + i + ": Choose: Rock  Paper  Scissors");
        let result = playOneRound(playerChoice);
        if (result.includes("lose")){
            computerScore++;
        }
        else if (result.includes("win")){
            playerScore++;
        }
        console.log(result);
        console.log("Player: " + playerScore + ", Computer: " + computerScore);
    }
    if (playerScore > computerScore){
        console.log("You win!");
    }
    else if (computerScore > playerScore){
        console.log("Computer wins!");
    }
    else{
        console.log("It's a tie!");
    }
}

