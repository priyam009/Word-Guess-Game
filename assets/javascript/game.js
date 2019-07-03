var wordArr = ["Melbourne", "Sydney", "Mumbai", "Bejing", "Frankfurt", "Tokyo", "Singapore", "London", "Paris", "Barcelona","Seoul","Istanbul", "Dubai", "Bangkok", "Macau", "Rome", "Phuket", "Miami", "Prague", "Milan", "Moscow", "Vienna", "Amsterdam", "Venice", "Johannesburg", "Orlando", "Berlin", "Budapest", "Warsaw", "Brussels", "Munich", "Toronto", "Honololu", "Hanoi", "Zurich", "Jakarta", "Manila", "Marrakech", "Vancouver", "Sharjah", "Athens", "Seattle", "Washington", "Chicago", "Philadelphia", "Atlanta", "Montreal", "Stockholm", "Copenhagen", "Wellington"];

// console.log(wordArr.length);


var hiddenWord;
var wins= 0;
var losses= 0;
var gussesLeft;
var wrongGuess;
var foundCount;


var wordGuessText = document.getElementById("wordguess-text");
var wrongGuessText = document.getElementById("wrongguess-text");
var gussesLeftText = document.getElementById("gussesleft-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");

function randomPick() {
  return wordArr[Math.floor(Math.random() * wordArr.length)].toUpperCase().split('');
}

function hiddenText(word) {
  for(w in word) { 
    hiddenWord.push('_');
  }
}

function textDisplay() {
  var displayAnswer = hiddenWord;
  return displayAnswer.join(" ");
}

function initializeGame() {
  hiddenWord = [];
  gussesLeft= 10;
  wrongGuess=[];
  foundCount = 0;

  word = randomPick();
  hiddenText(word);
  wordGuessText.textContent = textDisplay();

}



function compareGuess() {
  document.onkeyup = function(event) {
    var userGuess = event.key.toUpperCase();
    console.log("userGuess",userGuess);
        
    var count = 0;
  
    for(w in word) {
      if(userGuess == word[w]) {
        hiddenWord[w] = userGuess;
        count++;
      }
    }
        
    if(count > 0) {
      wordGuessText.textContent = textDisplay();
      foundCount += count;
      console.log("foundCount", foundCount)
    }
    else {
      gussesLeft--;
      wrongGuess.push(userGuess);
      console.log("gussesLeft",gussesLeft);
      console.log("wrongGuess",wrongGuess);
    }
    roundDecider();
  };
}

function roundDecider() {
  if(foundCount == word.length) {
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


    // var word = randomPick();
    // console.log("word",word);
    // console.log("wordlength", word.length);
    // hiddenText(word);
    compareGuess();

    initializeGame();
