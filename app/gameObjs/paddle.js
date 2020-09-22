export {Paddle}

/**
 * Paddle class
 */
class Paddle {

    paddleHeight = 10;
    paddleWidth  = 75;

    /**
     * Constructs paddle object
     * @param canvas
     */
    constructor(canvas) {
        this.paddleX = (canvas.width - this.paddleWidth/2)
    }

    /**
     * Draws paddle to the canvas
     * @param ctx | canvas
     * @param cHeight | integer
     */
    draw(ctx, cHeight) {

        ctx.beginPath();
        ctx.rect(this.paddleX, cHeight - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();

    }

}