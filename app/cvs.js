class CVS {

    constructor() {
        
        this.canvas = document.getElementById("myCanvas");
        this.ctx    = this.canvas.getContext('2d');

        this.input  = new Input(document);
        this.bricks = new Bricks();
        this.ball   = new Ball();
        this.paddle = new Paddle(this.canvas);
        this.score  = new Score();
        this.lives  = new Lives();
        this.modal  = new Modal(document);

        this.modal.displayResults();

        this.x  = this.canvas.width / 2;
        this.y  = this.canvas.height - 30;
        this.dx = 2;
        this.dy = -2;

        this.gameStop = true;

        this.modal.save.addEventListener('click', () => { this.modal.saveResult(this.score.score) });
        
        window.addEventListener('load', () => { this.update(); });

        document.addEventListener("keypress", (e) => {

            if (e.keyCode == 32 && this.gameStop === true) {
              this.gameStop = false;
            } else if (e.keyCode == 32 && this.gameStop === false) {
              this.gameStop = true;
            }

            this.update();

        });

    }

    update() {

        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.height);

        this.bricks.draw(this.ctx);
        this.ball.draw(this.ctx, this.x, this.y);
        this.paddle.draw(this.ctx, this.canvas.height);
        this.score.draw(this.ctx);
        this.lives.draw(this.ctx, this.canvas.width);
        this.collisionDetection();

        this.x += this.dx;
        this.y += this.dy;

        //Makes sure the ball bounces off canvas walls
        if (this.x + this.dx > this.canvas.width - this.ball.ballRadius || this.x + this.dx < this.ball.ballRadius) {
            this.dx = -this.dx;
        }

        //Makes sure the ball bounces off the ceiling and takes a life if it hits the floor
        if (this.y + this.dy < this.ball.ballRadius) {

            this.dy = -this.dy;

        } else if(this.y + this.dy > this.canvas.height - this.ball.ballRadius) {

            if(this.x > this.paddle.paddleX && this.x < this.paddle.paddleX + this.paddle.paddleWidth) {

                this.dy = -this.dy;

            } else {

                this.lives.lives--;

                if(this.lives.lives === 0) {
                    alert("Game Over");
                    document.location.reload();
                } else {
                    this.x              = this.canvas.width/2;
                    this.y              = this.canvas.height - 30;
                    this.dx             = 2;
                    this.dy             = -2;
                    this.paddle.paddleX = (this.canvas.width - this.paddle.paddleWidth)/2;
                }

            }

        }

        //Moves Paddle Based on arrow keys
        if (this.input.rightPressed && this.paddle.paddleX < this.canvas.width - this.paddle.paddleWidth) {
            this.paddle.paddleX += 7;
        } else if(this.input.leftPressed && this.paddle.paddleX > 0) {
            this.paddle.paddleX -= 7;
        }

        //Animates the game
        if(this.gameStop == false) {
            requestAnimationFrame(() => { this.update(); });
        }

    }

    collisionDetection() {

        for( var c = 0; c < this.bricks.brickColumnCount; c++) {

            for(var r = 0; r < this.bricks.brickRowCount; r++) {

                var b = this.bricks.bricks[c][r];

                if(b.status == 1) {

                    if(this.x > b.x && this.x < b.x + this.bricks.brickWidth && this.y > b.y && this.y < b.y + this.bricks.brickHeight) {

                        this.dy  = -this.dy;
                        b.status = 0;

                        this.score.score++;

                        if (this.score.score == this.bricks.brickRowCount * this.bricks.brickColumnCount) {

                            this.gameStop = true;
                            this.modal.displayCongratsModal();

                        }

                    }

                }

            }

        }

    }
    
}

(function(){
    let requestAnimationFrame = window.requestAnimationFrame || 
                                window.mozRequestAnimationFrame || 
                                window.webkitRequestAnimationFrame || 
                                window.msRequestAnimationFrame;
  
    window.requestAnimationFrame = requestAnimationFrame;
  
    let cvs = new CVS();
  })()