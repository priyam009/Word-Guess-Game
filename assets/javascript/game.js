//Array of City names
var wordArr = ["Melbourne", "Sydney", "Mumbai", "Bejing", "Frankfurt", "Tokyo", "Singapore", "London", "Paris", "Barcelona","Seoul","Istanbul", "Dubai", "Bangkok", "Macau", "Rome", "Phuket", "Miami", "Prague", "Milan", "Moscow", "Vienna", "Amsterdam", "Venice", "Johannesburg", "Orlando", "Berlin", "Budapest", "Warsaw", "Brussels", "Munich", "Toronto", "Honololu", "Hanoi", "Zurich", "Jakarta", "Manila", "Marrakech", "Vancouver", "Sharjah", "Athens", "Seattle", "Washington", "Chicago", "Philadelphia", "Atlanta", "Montreal", "Stockholm", "Copenhagen", "Wellington"];



//Variable declaration
var hiddenWord;
var gussesLeft;
var wrongGuess;
var wins= 0;
var losses= 0;


var wordGuessText = document.getElementById("wordguess-text");
var wrongGuessText = document.getElementById("wrongguess-text");
var gussesLeftText = document.getElementById("gussesleft-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");

//Picking a random Word from the Array
function randomPick() {
  return wordArr[Math.floor(Math.random() * wordArr.length)].toUpperCase().split('');
}

//Converting the Word from Array into '_' and saving it in hiddenWord variable
function hiddenText(word) {
  for(w in word) { 
    hiddenWord.push('_');
  }
}

//Joins the hiddenWord variable with a space in between and displays it on the screen
function textDisplay() {
  var displayAnswer = hiddenWord;
  return displayAnswer.join(" ");
}

//Initializes the game and is called when one game round ends
function initializeGame() {
  hiddenWord = [];            //Adding values to the variable declared above
  gussesLeft= 10;             //Adding values to the variable declared above
  wrongGuess=[];              //Adding values to the variable declared above

  word = randomPick();        
  hiddenText(word);
  wordGuessText.textContent = textDisplay();
}


//Takes input letter from the User and compares it with original word to check its existance
function compareGuess() {
  document.onkeyup = function(event) {
    var userGuess = event.key.toUpperCase();
    console.log("userGuess",userGuess);
        
  
    for(w in word) {
      if(userGuess == word[w]) {
        hiddenWord[w] = userGuess;
      }
    }
        
    if(hiddenWord.indexOf(userGuess) != -1) {
      wordGuessText.textContent = textDisplay();
    }
    else {
      gussesLeft--;
      wrongGuess.push(userGuess);
      console.log("gussesLeft",gussesLeft);
      console.log("wrongGuess",wrongGuess);
    }

    roundDecider();                      //decides Win or Loss
  };
}

//Decides Win or Loss and reinitiates the game again
function roundDecider() {
  if(hiddenWord.indexOf('_') === -1) {
    wins++;
    console.log("wins",wins);
    initializeGame();
  }

  else if(gussesLeft === 0) {
    losses++;
    console.log("losses",losses);
    initializeGame();
  }
}


compareGuess();
initializeGame();
