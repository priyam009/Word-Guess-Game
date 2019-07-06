//Array of City names
var wordArr = ["Melbourne", "Sydney", "Mumbai", "Bejing", "Frankfurt", "Tokyo", "Singapore", "London", "Paris", "Barcelona","Seoul","Istanbul", "Dubai", "Bangkok", "Macau", "Rome", "Phuket", "Miami", "Prague", "Milan", "Moscow", "Vienna", "Amsterdam", "Venice", "Johannesburg", "Orlando", "Berlin", "Budapest", "Warsaw", "Brussels", "Munich", "Toronto", "Honololu", "Hanoi", "Zurich", "Jakarta", "Manila", "Marrakech", "Vancouver", "Sharjah", "Athens", "Seattle", "Washington", "Chicago", "Philadelphia", "Atlanta", "Montreal", "Stockholm", "Copenhagen", "Wellington"];



//Variable declaration
var hiddenWord;
var gussesLeft;
var wrongGuess;
var wins= 0;
var losses= 0;

//Getting all values in HTML id and storing in variables
var wordGuessText = document.getElementById("wordguess-text");
var wrongGuessText = document.getElementById("wrongguess-text");
var gussesLeftText = document.getElementById("gussesleft-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var instructionText = document.getElementById("instruction-text");
var lostAudio = document.getElementById("lost-audio");
var winAudio = document.getElementById("win-audio");


//Initializes the game and is called when one game round ends
function initializeGame() {
  hiddenWord = [];            //Adding values to the variable declared above
  gussesLeft= 10;             //Adding values to the variable declared above
  wrongGuess=[];              //Adding values to the variable declared above

  wrongGuessText.textContent= wrongGuess.join(' ');   //Clearing wrongGuess text
  gussesLeftText.textContent= gussesLeft;             //Updating Gusses Left
                   
  clearEmoji();                                       //Function call to Clear Instruction Text or Emoji Content

  word = randomPick();
  console.log("word ", word);     
  hiddenText(word);
  wordGuessText.textContent = textDisplay();          //Updating Guessing Word Text
}

//Picking a random Word from the Array
function randomPick() {
  return wordArr[Math.floor(Math.random() * wordArr.length)].toUpperCase().split('');
}

//Converting the Word from Array into '_' and saving it in hiddenWord variable
function hiddenText(word) {
  for(var i=0; i<word.length; i++) { 
    hiddenWord.push('_');
  }
}

//Joins the hiddenWord variable with a space in between and displays it on the screen
function textDisplay() {
  var displayAnswer = hiddenWord;
  return displayAnswer.join(" ");
}

//Clearing Instruction Text or Emoji Content
function clearEmoji() {
  instructionText.classList.remove("fa-grin-stars");
  instructionText.classList.remove("fa-sad-cry");
  instructionText.classList.remove("fa-check");
  instructionText.classList.remove("fa-times");
  instructionText.textContent = "";
}

//Takes input letter from the User and compares it with original word to check its existance
function compareGuess() {
  document.onkeyup = function(event) {
    clearEmoji();                 //Function call to Clear Instruction Text or Emoji Content
    var scope = /[A-Z]/g;         //To check if only Uppercase Alplhabets are pressed

    if(gussesLeft > 0 && wrongGuess.length < 11 && hiddenWord.indexOf('_') != -1) {
      if(event.key.toUpperCase().match(scope) && hiddenWord.indexOf(event.key.toUpperCase()) == -1 && wrongGuess.indexOf(event.key.toUpperCase()) == -1) {
        instructionText.textContent= "";                   //Clearing instruction text content
        var userGuess = event.key.toUpperCase();          //Saving key pressed to userGuess variable if condition satisfied
      }
      else if(!event.key.toUpperCase().match(scope)) {
          instructionText.textContent= "Not a Letter...Try Again!!";        //if the key pressed is not Uppercase Alphabet
          return;
        }
      else {
        instructionText.textContent= "Letter already used...Try Again!!";   //if key pressed is a repeating letter
        return;
      }
    }
    else {
      instructionText.textContent= "Press Play Again!!";   
      return;
    }    
  
    for(var w=0; w<word.length; w++) {
      if(userGuess == word[w]) {
        hiddenWord[w] = userGuess;
      }
    }

    if(hiddenWord.indexOf(userGuess) != -1) {
      wordGuessText.textContent = textDisplay();            //Updating Guessing word to reflect new changes
      instructionText.classList.add("fa-check");
    }
    else {    
      gussesLeft--;
      wrongGuess.push(userGuess);
      wrongGuessText.textContent= wrongGuess.join(' ');     //Updating wrong guess
      gussesLeftText.textContent= gussesLeft;               //Updating guesses left
      instructionText.classList.add("fa-times");
    }
    
    roundDecider();                                         //decides Win or Loss
  };
}

//Decides Win or Loss
function roundDecider() {
  if(hiddenWord.indexOf('_') === -1) {
    wins++;
    winsText.textContent = wins;                            //Updating Win Value
    console.log("wins",wins);
    clearEmoji();                                           //Function call to Clear Instruction Text or Emoji Content
    instructionText.classList.add("fa-grin-stars");         //Shows winning Emoji
    winAudio.play();                                        //Plays Winning Audio
  }
  else if(gussesLeft === 0) {
    losses++;
    lossesText.textContent = losses;                        //Updating Loss Value
    console.log("losses",losses);
    lostAudio.play();                                       //Plays Winning Audio
    clearEmoji();                                           //Function call to Clear Instruction Text or Emoji Content
    instructionText.classList.add("fa-sad-cry");            //Shows winning Emoji
  }
}

//reinitiates the game again
function playAgain() {
  initializeGame();
}

winsText.textContent= wins;
lossesText.textContent= losses;
initializeGame();
compareGuess();
