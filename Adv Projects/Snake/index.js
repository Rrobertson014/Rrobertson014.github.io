/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 60;
  
  // Game Item Objects

    var KEY = {
      "LEFT": 37,
      "RIGHT": 39,
      "UP": 38,
      "DOWN": 40,
  };

    var speedX = 0;
    var speedY = 0;
    var snakeHead = Obj("#snakeHead");
    
    function Obj(id) {
        var element = {};
        element.id = $(id);
        element.x = Number($(id).css('left').replace(/[^-\d\.]/g, ''));
        element.y = Number($(id).css('top').replace(/[^-\d\.]/g, ''));
        element.width = Number($(id).css('width').replace(/[^-\d\.]/g, ''));
        element.height = Number($(id).css('height').replace(/[^-\d\.]/g, ''));
        element.speedX = 0;
        element.speedY = 0;
        return element;
    };


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
//   $(document).on('keyup', handleKeyUp);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
      moveSnakeHead();
  }
  
  
  /* 
  Called in response to events.
  */
  
  function handleKeyDown(keydown) {
      if (keydown.which === KEY.RIGHT) {
          speedY = 0;
          speedX = 20;
      }
      else if (keydown.which === KEY.LEFT) {
          speedY = 0;
          speedX = -20;
      }
      else if (keydown.which === KEY.UP) {
          speedX = 0;
          speedY = -20;
      }
      else if (keydown.which === KEY.DOWN) {
          speedX = 0;
          speedY = 20;
      }
  }
//   function handleKeyUp(keyup) {
//       if (keyup.which === KEY.RIGHT || keyup.which === KEY.LEFT) {
//           speedX = 0;
//       }
//       else if (keyup.which === KEY.UP || keyup.which === KEY.DOWN) {
//           speedY = 0;
//       }
//   }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function moveSnakeHead() {
      snakeHead.x += speedX;
      snakeHead.y += speedY;
      $(snakeHead.id).css("left", snakeHead.x);
      $(snakeHead.id).css("top", snakeHead.y);
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
