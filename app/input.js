class Input {
    constructor(docBody) {

        this.UP_ARROW = 38; 
        this.RT_ARROW = 39; 
        this.LT_ARROW = 37; 
        this.DN_ARROW = 40; 
        this.SPACE = 32;

        this.rightPressed = false;
        this.leftPressed  = false;
        this.gameStop     = true;
        
        this.keys = [];

        docBody.addEventListener("keydown", (e) => {

            if(e.keyCode == this.RT_ARROW) {
              this.rightPressed = true;
            } else if (e.keyCode == this.LT_ARROW) {
              this.leftPressed = true;
            }

        });

        docBody.addEventListener("keyup", (e) => {

             if(e.keyCode == this.RT_ARROW) {
                this.rightPressed = false;
              } else if(e.keyCode == this.LT_ARROW) {
                this.leftPressed = false;
              }

        });

        

    }
  
    check(key) {
      return this.keys[key];
    }
  
    getHorizontal() {
      let r = this.check(this.RT_ARROW);
      let l = this.check(this.LT_ARROW);
      return r && l ? 0 : r ? 1 : l ?  -1 : 0;
    }
  
    checkPaused() {
      return this.gameStop;
    }
  }