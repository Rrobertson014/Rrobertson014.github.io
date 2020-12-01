/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

 var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;

  // Game Item Objs

  var gameActive = false;
  var KEY = {
      "LEFT": 37,
      "RIGHT": 39,
      "UP": 38,
      "DOWN": 40,
      "W": 87,
      "A": 65,
      "S": 83,
      "D": 68,
      "SPACE": 32,
  };
  var ball = Obj("#ball");
  var leftPaddle = Obj("#leftPaddle");
  var rightPaddle = Obj("#rightPaddle");
  var borderTop = Obj("#borderTop");
  var borderBottom = Obj("#borderBottom");
  var speedX = -2;
  var speedY = 0;
  var speedYright = 0;
  var speedYleft = 0;
  var points1 = 0;
  var points2 = 0;

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
}

            /* bouncing at an angle */
// var relativeIntersectY = (paddle1Y+(PADDLEHEIGHT/2)) - intersectY;
// var normalizedRelativeIntersectionY = (relativeIntersectY/(PADDLEHEIGHT/2));
// var bounceAngle = normalizedRelativeIntersectionY * MAXBOUNCEANGLE;
// ballVx = BALLSPEED*Math.cos(bounceAngle);
// ballVy = BALLSPEED*-Math.sin(bounceAngle);

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
      moveBall();
      moverightPaddle();
      moveleftPaddle();
      onCollision();
      displayScore();

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(keydown) {
      startGame(keydown);

      if (gameActive === true) {
        arrowKeys(keydown);
        wasdKeys(keydown);
          
      }

  }

  function handleKeyUp(keydown) {
      if (keydown.which === KEY.UP || keydown.which === KEY.DOWN) {
          speedYright = 0;
      }  
      else if (keydown.which === KEY.W || keydown.which === KEY.S) {
          speedYleft = 0;
      }
  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function startGame(keydown) {
      if (keydown.which === KEY.SPACE) {
          gameActive = true;
          $(".lobby").removeClass("lobby"); // This may not be efficient because I am taking away the class and leaving...
      }

  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }



  function arrowKeys(keydown) {

      if ( !doCollide(rightPaddle, borderBottom) && keydown.which === KEY.UP) {
        speedYright = -5;    
        console.log("up arrow");
      }
      else if ( !doCollide(rightPaddle, borderBottom) && keydown.which === KEY.DOWN) {
        speedYright = 5;    
        console.log("down arrow");
      }
      console.log(speedYright);
  }

  function wasdKeys(keydown) {
      if (keydown.which === KEY.W) {
        speedYleft = -5;  
        console.log("w");
      }
      else if (keydown.which === KEY.S) {
        speedYleft = 5;  
        console.log("s");
      }
      console.log(speedYleft);
  }
  
  function moveBall() {
    if (gameActive === true) {
      ball.x += speedX;
      ball.y += speedY;
      $(ball.id).css('left', ball.x);
      $(ball.id).css('top', ball.y);
    }
  }

  function moverightPaddle() {
        rightPaddle.y += speedYright;
        $(rightPaddle.id).css('top', rightPaddle.y);
  }

  function moveleftPaddle() {
      leftPaddle.y += speedYleft;
      $(leftPaddle.id).css('top', leftPaddle.y);
  } 


  function doCollide(obj1, obj2) {
    // TODO: calculate and store the remaining
    // sides of the obj1
    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.rightX = obj1.x + obj1.width;
    obj1.bottomY = obj1.y + obj1.height;
   
    // TODO: Do the same for obj2
    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.rightX = obj2.x + obj2.width;
    obj2.bottomY = obj2.y + obj2.height;
  
    // TODO: Return true if they are overlapping, false otherwise
  
// red right > blue left
// red left < blue right
// red top < blue bottom
// red bottom > blue top
  
	if (obj1.rightX >= obj2.leftX && obj1.leftX <= obj2.rightX && obj1.topY <= obj2.bottomY && obj1.bottomY >= obj2.topY ) {
      return true;
    } else { return false; }
		
  }

  function onCollision() {
     if (doCollide(ball, leftPaddle)) {
        points1 += 1;
        speedX = -speedX;
        speedY = Math.random() * ((4 - 1) + 3 || (-4 + 1) - 3);
    if (doCollide(ball, rightPaddle)) {
        points2 += 1;
        speedX = -speedX;
        speedY = Math.random() * ((4 - 1) + 3 || (-4 + 1) - 3);
    }
        if (speedX < 0) {
            speedX -= 0.25;
        } else { speedX += 0.25; }
     }

     if (doCollide(ball, borderTop) || doCollide(ball, borderBottom)) {
        speedY = -speedY;
     }

  }

  function displayScore() {
      
  }







}
  
