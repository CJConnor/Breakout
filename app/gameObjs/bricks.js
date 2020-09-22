import {BlueBrick} from './bricks/blueBrick.js';
import {GreenBrick} from './bricks/greenBrick.js';
import {RedBrick} from './bricks/redBrick.js';
export {Bricks}

/**
 * Bricks class
 */
class Bricks {

    // Bricks properties
    brickRowCount    = 8;
    brickColumnCount = 10;
    brickWidth       = 40;
    brickHeight      = 10;
    brickPadding     = 5;
    brickOffsetTop   = 30;
    brickOffsetLeft  = 15;
    brickCount       = 0;
    bricks           = [];

    /**
     * Bricks constructor
     */
    constructor() {

        // Loops through brick columns
        for(let c = 0; c < this.brickColumnCount; c++) {

            // Creates brick column
            this.bricks[c] = [];

            // Loops through brick rows
            for(let r = 0; r < this.brickRowCount; r++) {

                // Decides brick colour - Top two red, middle, 3 green, bottom 3 blue
                if (r < 2)
                    this.bricks[c][r] = new RedBrick(0, 0, 1);
                else if (r >= 2 && r <= 4)
                    this.bricks[c][r] = new GreenBrick(0, 0, 1);
                else if (r > 4)
                    this.bricks[c][r] = new BlueBrick(0, 0, 1);
            }
        }
    }

    /**
     * Draws bricks to the canvas
     * @param ctx
     */
    draw(ctx) {

        // Loops through brick columns
        for (let c = 0; c < this.brickColumnCount; c++) {

            // Loops through brick rows
            for (let r = 0; r < this.brickRowCount; r++) {

                // If the brick exists
                if (this.bricks[c][r].status === 1) {

                    let brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
                    let brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;

                    // Sets x and y coordinate of the brick
                    this.bricks[c][r].x = brickX;
                    this.bricks[c][r].y = brickY;

                    // Sets brick colour
                    let colour = this.bricks[c][r].hp - 1;

                    // Draws brick to canvas
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                    ctx.fillStyle = this.bricks[c][r].colour[colour];
                    ctx.fill();
                    ctx.closePath();

                }

            }

        }

    }

    /**
     * Calculates how many bricks remain
     * @return {number}
     */
    brickCounts() {

        let brickCount = 0;

        for (let c = 0; c < this.brickColumnCount; c++) {

            for (let r = 0; r < this.brickRowCount; r++) {

                if (this.bricks[c][r].status === 1)
                    brickCount++;

            }

        }

        return brickCount;

    }

}