
const buttons = document.querySelectorAll('button');
const score = document.querySelector('#score');
const round = document.querySelector('#round');
var isGameOver = false;
var turns =0;
buttons.forEach(function(button){
    if (button.value.length != 0){
        button.addEventListener('click', playGame);
    }   
});  


function Reload(){
    document.location.reload(true);
}


function AddReplayButton(){
isGameOver = true;
const result = document.getElementsByClassName('result')[0];
const content = document.createElement('div');
var button = addButton(content);
var resultStr = getResultOfGame();
button.innerHTML = '<p>' + resultStr + '</p>' + 'Click me to play again ';
button.addEventListener('click', Reload);
content.style.position = "relative";
content.style.top = "-75px";
content.style.border = "5px solid brown";
content.classList.add('content');
const container = result.parentNode;
result.parentNode.insertBefore(content, result.nextSibling);
}

function getResultOfGame(){
    var parsedScore = score.textContent.split(':');
    if (parsedScore[0] < parsedScore[1]){
        return 'You have lost!';
    }
    else if (parsedScore[0] > parsedScore[1]){
        return 'You have won!';
    }
    return 'Draw!'
}

function addButton(content){
    const button = document.createElement('button');
    content.appendChild(button);
    return button;
}

function incrementRound(){
    var round1 = round.textContent;
    var parsedString = round1.split(" ");
    var incrementedRound = Number(parsedString[1]) + 1;
    var newRound = parsedString[0] + ' ' + incrementedRound;
    return newRound;
}

function playGame(){
    if(turns < 5){
    game(this.value);
    turns++;
    }
    else{
        // replay game
        if (isGameOver == false){
            AddReplayButton();
        }
        

    }
}


function game(pTurn){
    var aiTurn = computerPlay();
    var playerTurn = pTurn;
    var isPlayerWins = ApplyRules(aiTurn,playerTurn);
    var currentScore = score.textContent;
    round.innerHTML = incrementRound();
    UpdateScore(isPlayerWins);
}

function UpdateScore(isPlayerWins){
    var parsedScore = score.textContent.split(':');
    if (isPlayerWins == undefined){
        console.log("draw");
    }
    else if (isPlayerWins)
    {
        console.log("You won");
       
        var playerScore = parsedScore[0];
        playerScore = Number(playerScore) +1;
        var AiScore = parsedScore[1];
        score.textContent = playerScore + ':' + AiScore;
    }
    else {
        console.log("You lost");
        var playerScore = parsedScore[0];
        var AiScore = parsedScore[1];
        AiScore = Number(AiScore) +1;
        score.textContent = playerScore + ':' + AiScore;
    }
}
function ApplyRules(aiTurn, playerTurn){
    if (playerTurn == aiTurn){
        return;
    }
    var playerWins = false;

    if (aiTurn == 'rock'  && playerTurn == 'paper'){
        playerWins = true;
    }
    else if (aiTurn == 'scissors'  && playerTurn == 'rock'){
        playerWins = true;
    }
    else if (aiTurn == 'paper'  && playerTurn == 'scissors'){
        playerWins = true;
    }
    return playerWins;
}
function playerPlay(){
   var playerChoice =  window.prompt("rock, paper or scissors?");
   playerChoice = playerChoice.toLocaleLowerCase();
   return playerChoice;
}

function computerPlay(){
    var computersTurn = random(3);
    var computersChoice = null;
    switch( computersTurn){
        case 0:
            computersChoice = 'rock';
            break;
        case 1:
            computersChoice = 'paper';
            break;
        case 2:
            computersChoice = 'scissors';
            break;
    }
    return computersChoice;
}

function random(choices){
    var choice = Math.floor(Math.random() * choices);
    return choice;
}