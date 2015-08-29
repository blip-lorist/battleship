$(document).ready(function(){

  /* Stores the board info
    0 for empty
    1 for ship
    X when hit
    _ when miss
  */
  var board = [];

  // Stores the locations of the ships
  var ships = [];

  // Current number of ships
  var shipNum = 2;

  // Size of the board
  var boardSize = 10;

  // Bool indicating whether or not game is over
  var gameOver = false;

  // Number of ship hits
  var hits = 0;

  // Number of guesses
  var guesses = 0;

  initializeGame();

  function initializeGame(){
    generateRandomBoard();
    printBoard();
  }

  function generateRandomBoard(){
    // Add some random ships
    var shipsAdded = 0;
    while (shipsAdded < shipNum) {
      var randomVal = Math.floor(Math.random() * (boardSize - 1));
      if (ships.indexOf(randomVal) < 0) { // Not already one of the ships
        ships.push(randomVal);
        shipsAdded++;
      }
    }

    // Set the board values based on ships added
    for(var j = 0; j < boardSize; j++) {
      if (ships.indexOf(j) < 0) { // This location not a ship
        board[j] = 0;   // Empty
      } else {
        board[j] = 1;   // Ship!
      }
    }
  }

  function printBoard() {
    var boardOut = "";
    for(var i = 0; i < boardSize; i++) {
      boardOut += board[i];
    }
    $("#board").text(boardOut);
  }

  function endGame() {
    // TODO: End game
    // ADDED FUN: Disable submit button
    console.log("End game");
  }

  // CLICK HANDLERS
  $("#submit").click(userGuess);

  function userGuess(){
    // Reset HIT or MISS notifier
    $("#guess-result").empty()
    // Retrieve the guess from the input box
    var guess_box = $("#guess");
    var guess = guess_box.val();
    // Reset the guess input box
    guess_box.val("");

    // Guess needs to be converted to a num for exact ===,
    // otherwise players will get points for empty strings since "" == 0


    // Verify the guess is in a valid range
    // Guess can't be empty
    if (guess == ""){
      alert("Please enter a guess.");
    // Guess must be between 0 - 9
    } else if (guess < 0 || guess > 9){
      alert("Your guess needs to be between 0 and 9.");
    //Guess must be a number
    } else if (isNaN(guess)) {
      alert("You gotta provide a number!");
      // Check if the guess matches one of our ships locations
    } else if  (guess == ships[0] || guess == ships[1]) {
      board[guess] = "X";
      $("#guess-result").append("HIT");
      hits += 1;
      guesses += 1;
    } else {
      board[guess] = "_";
      $("#guess-result").append("MISS");
      guesses += 1;
    }
    // Continue gameplay

    // Redraw the board if it has changed
    $("#board, #guess-count").empty();
    $("#board").append(board);
    // Tell the user how many guesses they've made
    $("#guess-count").append("Guesses: " + guesses)

    // NOTE: How does the game end?
    // If LOSE
    if (guesses > 5) {
      alert("Sorry, you lose!");
      gameOver = true
    // if WIN
    } else if (board[ships[0]] == "X" && board[ships[1]] == "X") {
      alert("Congrats, you won!");
      gameOver = true
    }

    if (gameOver == true){
      $("#end-game").append("GAME OVER");

    }
  }
});
