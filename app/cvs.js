import {Input} from './input.js';

import {BlueBrick} from './gameObjs/bricks/blueBrick.js'
import {GreenBrick} from './gameObjs/bricks/greenBrick.js'
import {RedBrick} from './gameObjs/bricks/redBrick.js'
import {Bricks} from './gameObjs/bricks.js';
import {Ball} from './gameObjs/ball.js';
import {Paddle} from './gameObjs/paddle.js';
import {Score} from './gameObjs/score.js';
import {Lives} from './gameObjs/lives.js';
import {Modal} from './gameObjs/modal.js';

/**
 * Canvas Game engine
 */
class CVS {

    /**
     * CVS Object Constructor
     */
    constructor() {

        // Instantiates canvas
        this.canvas = document.getElementById("myCanvas");
        this.ctx    = this.canvas.getContext('2d');

        // Instantiates game objects
        this.input  = new Input(document, this);
        this.bricks = new Bricks();
        this.ball   = new Ball();
        this.paddle = new Paddle(this.canvas);
        this.score  = new Score();
        this.lives  = new Lives();
        this.modal  = new Modal(document);

        // Calls results
        this.modal.displayResults();

        // Sets games values
        this.x        = this.canvas.width / 2;
        this.y        = this.canvas.height - 30;
        this.dx       = 2;
        this.dy       = -2;

        // Looks out for loading event listener to update the canvas
        window.addEventListener('load', () => { this.update(); });

        if (this.input.checkPaused() === false)
            this.update();

    }

    /**
     * Update method to update the canvas
     */
    update() {

        // Clears existing canvas
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.height);

        // Draws Objects to the canvas
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
            this.trajectoryChange("1");
        }

        //Makes sure the ball bounces off the ceiling and takes a life if it hits the floor
        if (this.y + this.dy < this.ball.ballRadius) {

                this.trajectoryChange("2");

        } else if(this.y + this.dy > this.canvas.height - this.ball.ballRadius) {

            if(this.x > this.paddle.paddleX && this.x < this.paddle.paddleX + this.paddle.paddleWidth) {

                this.trajectoryChange("2");

            } else {

                this.lives.lives--;

                if(this.lives.lives === 0) {
                    this.modal.displayGameOverModal(this.score.score);
                    this.input.gameStop = true;
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
        if(this.input.checkPaused() === false) {
            requestAnimationFrame(() => { this.update(); });
        }

    }

    /**
     * Calculates random numbers
     * @param {int} min 
     * @param {int} max 
     * @param {int} precision 
     */
    genRandNumber(min, max, precision) {
        return (Math.floor(Math.random() * (max - min) ) + min) / precision;
    }

    /**
     * Calculates the calls path
     * @param {int} type - 1 is x-axis 2 is y-axis
     */
    trajectoryChange(type) {

        let speed = 3;

        let xSign = Math.sign(this.dx);
        let ySign = Math.sign(this.dy);
        let angle = Math.atan2(this.dx, this.dy) * this.genRandNumber(95, 105, 100);

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

        // Walls
        if (type == 1) {

            if (xSign === Math.sign(this.dx)) {
                this.dx *= -1;
            }

            if (ySign != Math.sign(this.dy)) {
                this.dy *= -1;
            }

        // Ceilings and Paddle
        } else if (type == 2) {

            if (xSign != Math.sign(this.dx)) {
                this.dx *= -1;
            }

            if (ySign === Math.sign(this.dy)) {
                this.dy *= -1;
            }

        }

        this.dx *= speed;
        this.dy *= speed;

    }

    /**
     * Detects collision between the ball and the bricks
     */
    collisionDetection() {

        // Loop through brick columns
        for ( let c = 0; c < this.bricks.brickColumnCount; c++) {

            // Loop through brick rows
            for (let r = 0; r < this.bricks.brickRowCount; r++) {

                if (this.bricks.bricks[c][r].status === 1) {

                    if (this.x > this.bricks.bricks[c][r].x && this.x < this.bricks.bricks[c][r].x + this.bricks.brickWidth + this.ball.ballRadius && this.y > this.bricks.bricks[c][r].y && this.y < this.bricks.bricks[c][r].y + this.bricks.brickHeight + this.ball.ballRadius) {

                        this.trajectoryChange("2");

                        this.bricks.bricks[c][r].hp--;
                        this.score.score++;

                        // If the brick has no HP remove it and add the score
                        if (this.bricks.bricks[c][r].hp === 0) {
                            this.bricks.bricks[c][r].status = 0;

                            this.score.score += this.bricks.bricks[c][r].score;

                            // If there is no more bricks then stop the game.
                            if (this.bricks.brickCounts() === 0) {

                                this.score.score += this.lives.lives * 5;

                                this.input.gameStop = true;
                                this.modal.displayCongratsModal(this.score.score);

                            }
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
  })();