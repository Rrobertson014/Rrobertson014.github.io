		/* global $ */
		'use strict'
		$(document).ready(function(){

			//////////////////////////////////////////////////////////////////
			/////////////////// Set Up ///////////////////////////////
			//////////////////////////////////////////////////////////////////
            var BOARD_WIDTH = $('#board').width();	// Number: the maximum X-Coordinate of the screen
            var positionX = 0;
			var speedX = 10;
            var points = 0;
            
            setInterval(update, 50);
            $('#box').on('click', handleBoxClick);

            //////////////////////////////////////////////////////////////////
			/////////////////// Core Logic ///////////////////////////////
            //////////////////////////////////////////////////////////////////
            
            /* 
			This Function will be called 20 times/second. Each time it is called,
			it should move the Box to a new location. If the box drifts off the screen
			turn it around! 
			*/
            function update() {
                //change position & redraw box
				newPosition();
                //keep the box in the screen
				checkBorders();
			}

           
            /* 
			This Function will be called each time the box is clicked. Each time it is called,
			it should increase the points total, increase the speed, and move the box to
			the left side of the screen.
			*/
            function handleBoxClick() {
                //increase points
               addPoints();
				//increase speed
				addSpeed();
				//reset position
				resetPosition();
            }
            
            //////////////////////////////////////////////////////////////////
			/////////////////// Helper Functions ///////////////////////////////
			//////////////////////////////////////////////////////////////////
            
            function addPoints() {
                 points += 1;
				$('#box').text(points);
            }

            function addSpeed() {
                if (speedX >= 0) {
					speedX += 3;
				} 
				else if (speedX < 0) {
					speedX -= 3;
				}
            }

            function resetPosition() {
                positionX = 0;
            }

            function newPosition() {
                positionX += speedX;
				$('#box').css("left", positionX);
            }

            function checkBorders() {
                if (positionX > BOARD_WIDTH) {
					speedX = -speedX;
				}
				else if (positionX < 0) {
					speedX = -speedX;
				}
            }
			// Every 50 milliseconds, call the update Function (see below)
			

			// Every time the box is clicked, call the handleBoxClick Function (see below)

			


		}); // DO NOT DELETE THIS LINE OF CODE. ALL JAVASCRIPT ABOVE HERE