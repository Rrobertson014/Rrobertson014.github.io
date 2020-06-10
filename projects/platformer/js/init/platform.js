(function (window) {
    'use strict';
    window.opspark = window.opspark || {};
    window.opspark.platform = window.opspark.platform || {};
    
    let platform = window.opspark.platform;
    
    /**
     * init: This function initializes the platforms for the level.
     * 
     * GOAL: Add as many platforms necessary to make your level challenging.
     * 
     * Use the createPlatform Function to create platforms for the level. 
     * 
     * createPlatform() takes these arguments:
     *      
     *      createPlatform(x, y, scaleX, scaleY);
     * 
     *      x: The x coordineate for the platform.
     *      y: The y coordineate for the platform.
     *      scaleX: OPTIONAL The scale factor on the x-axis, this value will 
     *              stretch the platform in width.
     *      scaleY: OPTIONAL The scale factor on the y-axis, this value will 
     *              stretch the platform in height.
     */ 
    function init(game) {
        let createPlatform = platform.create;

        ////////////////////////////////////////////////////////////////////////
        // ALL YOUR CODE GOES BELOW HERE ///////////////////////////////////////
        
        /*
         * ground : here, we create a floor. Given the width of of the platform 
         * asset, giving it a scaleX and scaleY of 2 will stretch it across the 
         * bottom of the game.
         */
        createPlatform(0, game.world.height - 32, 3, 2);    // DO NOT DELETE

        // example:
        
        /*wall*/
        createPlatform(860.5, 0, 0.1, 25)
        
        //right side//
        createPlatform(700, 550, 0.4);
        createPlatform(700, 450, 0.4);
        createPlatform(700, 350, 0.4);
        createPlatform(700, 250, 0.4);
        createPlatform(700, 150, 0.4);
        
         /*wall*/ createPlatform(700, 100, 0.05, 14);
       
        //center side//
        createPlatform(390, 250, 0.5);
        createPlatform(540, 400, 0.4);
        createPlatform(390, 550, 0.5);
        
         /*wall*/ createPlatform(370, 200, 0.1, 90);
        
         
        //left side//
        createPlatform(175, 550, 0.49);
        createPlatform(0,450,0.5);
        createPlatform(175, 350, 0.49);
        createPlatform(0, 274.5, 0.4);
        createPlatform(0, 243, 0.2, 1);
        createPlatform(0, 120, 0.4);
        
        // ALL YOUR CODE GOES ABOVE HERE ///////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
    }
    platform.init = init;
})(window);