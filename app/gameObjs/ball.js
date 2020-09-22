export {Ball}

/**
 * Ball class
 */
class Ball {

    /**
     * Ball constructor
     */
    constructor() {
        this.ballRadius = 8;
    }

    /**
     * Draws the ball to the canvas
     * @param ctx | canvas
     * @param x | integer
     * @param y | integer
     */
    draw(ctx, x, y) {

        ctx.beginPath();
        ctx.arc(x, y, this.ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();

    }

}