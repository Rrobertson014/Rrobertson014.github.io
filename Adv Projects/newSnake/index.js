/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 120;
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
    var speed = 20;
    var speedX = 0;
    var speedY = 0;
    var apple = Obj("#apple");
    var snakeHead = Obj("#snakeHead");
    var snakeBody = [
        snakeHead,
    ]
    var head = snakeBody[0];
    var tail = snakeBody[snakeBody.length - 1]
    var points = 0;
    var direction;
    var overlap;

    
    function Obj(id) {
        var element = {};
        element.id = $(id);
        element.x = Number($(id).css('left').replace(/[^-\d\.]/g, ''));
        element.y = Number($(id).css('top').replace(/[^-\d\.]/g, ''));
        element.width = Number($(id).css('width').replace(/[^-\d\.]/g, ''));
        element.height = Number($(id).css('height').replace(/[^-\d\.]/g, ''));
        return element;
    };

    function newObj(id) {
        var element = {};
        element.id = $(id);
        element.x = Number($(id).css('left').replace(/[^-\d\.]/g, ''));
        element.y = Number($(id).css('top').replace(/[^-\d\.]/g, ''));
        element.width = Number($(id).css('width').replace(/[^-\d\.]/g, ''));
        element.height = Number($(id).css('height').replace(/[^-\d\.]/g, ''));
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
      moveSnake();
      moveHead();
      checkForOverLap();
      handleCollisions();
      updatePoints();
  }
  
  
  /* 
  Called in response to events.
  */
  
  function handleKeyDown(keydown) {
      snakeDirection();
      if (keydown.which === KEY.RIGHT && direction != KEY.LEFT) {
          speedY = 0;
          speedX = speed;
      }
      else if (keydown.which === KEY.LEFT && direction != KEY.RIGHT) {
          speedY = 0;
          speedX = -speed;
      }
      else if (keydown.which === KEY.UP && direction != KEY.DOWN) {
          speedX = 0;
          speedY = -speed;
      }
      else if (keydown.which === KEY.DOWN && direction != KEY.UP) {
          speedX = 0;
          speedY = speed;
      }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function moveSnake() {
     for (var i = snakeBody.length; i >= 0; i -= 1) {
        if (snakeBody.length >= 2 && i < snakeBody.length && i != 0) {
            moveBody(i);
        }
    }
  }
function moveHead() {
          snakeHead.x += speedX;
          snakeHead.y += speedY;
          $(snakeHead.id).css("left", snakeHead.x);
          $(snakeHead.id).css("top", snakeHead.y);
}
function moveBody(i){
          snakeBody[i].x = snakeBody[i - 1].x;
          snakeBody[i].y = snakeBody[i - 1].y;
          $(snakeBody[i].id).css("left", snakeBody[i].x);
          $(snakeBody[i].id).css("top", snakeBody[i].y);
}        

  function handleCollisions() {
    for (var i = 0; i < snakeBody.length; i++) {
      if (doCollide (snakeBody[i], apple)) {
          points += 1;
          moveApple();
          addTail();
      }
      else if (snakeBody[i].x < 0 || snakeBody[i].y < 0 || snakeBody[i].x > BOARD_SIZE - speed || snakeBody[i].y > BOARD_SIZE - speed) {
        endGame();
      }
      else if (overlap) {
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

function addTail() {
    var $snakeTail = $("<div>");
        $snakeTail.appendTo('#board')
                  .addClass('snakeBody')
                  .css('left', snakeBody[snakeBody.length - 1].x - snakeHead.speedX)
                  .css('top', snakeBody[snakeBody.length - 1].y - snakeHead.speedY)
                  .attr('id', 'snakeTail' + snakeBody.length);
        var snakeTail = Obj("#snakeTail" + snakeBody.length);
        snakeBody.push(snakeTail);
}

function updatePoints() {
    $('#score').text("Score: " + points);
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

function snakeDirection() {
    if (snakeBody.length > 1) {
        if (speedY === -speed) {
            direction = KEY.UP;
        }
        else if (speedY === speed) {
            direction = KEY.DOWN;
        }
        else if (speedX === -speed) {
            direction = KEY.LEFT;
        }
        else if (speedX === speed) {
            direction = KEY.RIGHT;
        }
    }
}

  function checkForOverLap() {
      for (var i = 1; i < snakeBody.length; i++) {
          if (doCollide(snakeHead, snakeBody[i])) {
              overlap = true;
          }
      }
  }

  function endGame() {
    // stop the interval timer
    if (confirm("Score: " + points + '\n' + "Do you want to try again?")) {
        location.reload();
        $(snakeHead.id).css('left', randomInteger( BOARD_SIZE/SQUARE_SIZE ) * SQUARE_SIZE);
        $(snakeHead.id).css('top', randomInteger( BOARD_SIZE/SQUARE_SIZE ) * SQUARE_SIZE);
    }
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }


  
}
