/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 80;
  var BOARD_SIZE = $("#board").width();   // the height and width are equal
  var SQUARE_SIZE = $("#apple").width();  // the size of the apple is the same size as all squares

// manually create the data object
  
  // Game Item Objects

    var KEY = {
      "LEFT": 37,
      "RIGHT": 39,
      "UP": 38,
      "DOWN": 40,
  };
    var speed = speed;
    var speedX = 0;
    var speedY = 0;
    var apple = Obj("#apple");
    var snakeHead = Obj("#snakeHead");
    var snakeBody = [
        snakeHead,
    ]
    
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
      handleCollisions();
  }
  
  
  /* 
  Called in response to events.
  */
  
  function handleKeyDown(keydown) {
      if (keydown.which === KEY.RIGHT) {
          speedY = 0;
          speedX = speed;
      }
      else if (keydown.which === KEY.LEFT) {
          speedY = 0;
          speedX = -speed;
      }
      else if (keydown.which === KEY.UP) {
          speedX = 0;
          speedY = -speed;
      }
      else if (keydown.which === KEY.DOWN) {
          speedX = 0;
          speedY = speed;
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
     for (var i = 0; i < snakeBody.length; i++) {  
      snakeHead.x += speedX;
      snakeHead.y += speedY;
      while ((snakeBody[i].x < 0 || snakeBody[i].y < 0 || snakeBody[i].x > BOARD_SIZE - speed || snakeBody[i].y > BOARD_SIZE - speed) === false) {
        $(snakeHead.id).css("left", snakeHead.x);
        $(snakeHead.id).css("top", snakeHead.y);
      }
    }
  }

  function handleCollisions() {
    for (var i = 0; i < snakeBody.length; i++) {
      if (doCollide (snakeBody[i], apple)) {
          moveApple();
      }
      else if (snakeBody[i].x < 0 || snakeBody[i].y < 0 || snakeBody[i].x > BOARD_SIZE - speed || snakeBody[i].y > BOARD_SIZE - speed) {
          endGame();
      }
    }
  }
  function moveApple() {
    //produce new apple positions
    apple.x = randomInteger( BOARD_SIZE/SQUARE_SIZE ) * SQUARE_SIZE;
    apple.y = randomInteger( BOARD_SIZE/SQUARE_SIZE ) * SQUARE_SIZE;


    //recursive
    for (var i = 0; i < snakeBody.length; i++) { 
        if (doCollide(snakeBody[i], apple)) {
            moveApple();
            break;
        }
        else {
            $("#apple").css('left', apple.x);
            $("#apple").css('top', apple.y);
        }
    }
}

function randomInteger(max) {
    var randomInt = Math.floor(Math.random() * max);
    return randomInt;
}

function doCollide(obj1, obj2) {
    if (obj1.x === obj2.x && obj1.y === obj2.y) {
        return true;
    }
    else {
        return false;
    }
}

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
