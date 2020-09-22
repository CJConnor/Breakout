export {Score}

/**
 * Score class
 */
class Score {

    score = 0;

    /**
     * Score constructor
     */
    constructor() {}

    /**
     * Draws score to the canvas
     * @param ctx | canvas
     */
    draw(ctx) {

        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + this.score, 8, 20);

    }

}