export {Input}

/**
 * Input class
 */
class Input {

    /**
     * Input constructor
     * @param docBody | DOM
     * @param ctx | CVS object
     */
    constructor(docBody, ctx) {

        // Keyboard key codes
        this.UP_ARROW = 38; 
        this.RT_ARROW = 39; 
        this.LT_ARROW = 37; 
        this.DN_ARROW = 40; 
        this.SPACE    = 32;

        this.rightPressed = false;
        this.leftPressed  = false;
        this.gameStop     = true;
        
        this.keys = [];

        // Adds event listeners for left and right arrows being pressed
        docBody.addEventListener("keydown", (e) => {

            if(e.keyCode == this.RT_ARROW) {
              this.rightPressed = true;
            } else if (e.keyCode == this.LT_ARROW) {
              this.leftPressed = true;
            }

        });

        // Adds event listeners for left and right arrows not being pressed
        docBody.addEventListener("keyup", (e) => {

             if(e.keyCode == this.RT_ARROW) {
                this.rightPressed = false;
              } else if(e.keyCode == this.LT_ARROW) {
                this.leftPressed = false;
              }

        });

        // Listens for the space bar to start the game
        docBody.addEventListener("keypress", (e) => {

            if (e.keyCode == 32 && this.gameStop === true) {
                this.gameStop = false;
            } else if (e.keyCode == 32 && this.gameStop === false) {
                this.gameStop = true;
            }

            ctx.update();
        });

    }

    /**
     * Checks the key
     * @param key
     * @return {*}
     */
    check(key) {
      return this.keys[key];
    }

    /**
     * Gets the horizontal
     * @return {number}
     */
    getHorizontal() {
      let r = this.check(this.RT_ARROW);
      let l = this.check(this.LT_ARROW);
      return r && l ? 0 : r ? 1 : l ?  -1 : 0;
    }

    /**
     * Pauses the game
     * @return {boolean}
     */
    checkPaused() {
      return this.gameStop;
    }
  }