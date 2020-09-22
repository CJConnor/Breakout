export {Lives}

/**
Live class
 */
class Lives {

    lives = 3;

    /**
     * Lives Constructor
     */
    constructor() {}

    /**
     * Draws the lives to the canvas
     * @param ctx | canvas
     * @param cWidth | integer
     */
    draw(ctx, cWidth) {

        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: " + this.lives, cWidth - 65, 20);

    }

}