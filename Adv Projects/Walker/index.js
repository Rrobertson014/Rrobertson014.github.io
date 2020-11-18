/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;
  var KEY = {
      "LEFT": 37,
      "RIGHT": 39,
      "UP": 38,
      "DOWN": 40,
  };
  var positionX = 0;
  var positionY = 0;
  var speedX = 0;
  var speedY = 0;
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(keydown) {
      if (keydown.which === KEY.LEFT) {
        speedX = -5;  
        console.log("left arrow");
      }
      else if (keydown.which === KEY.RIGHT) {
        speedX = 5;  
        console.log("right arrow");
      }
      else if (keydown.which === KEY.UP) {
        speedY = -5;    
        console.log("up arrow");
      }
      else if (keydown.which === KEY.DOWN) {
        speedY = 5;    
        console.log("down arrow");
      }
      console.log(keydown.which);

  }

  function handleKeyUp(keydown) {
      if (keydown.which === KEY.LEFT || keydown.which === KEY.RIGHT) {
          speedX = 0;
      }  
      else if (keydown.which === KEY.UP || keydown.which === KEY.DOWN) {
          speedY = 0;
      }
  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
  function repositionGameItem() {
      positionX += speedX
      positionY += speedY

  }

  function redrawGameItem() {
      $("#gameItem").css('left', positionX);
      $("#gameItem").css('top', positionY);

  }
}
