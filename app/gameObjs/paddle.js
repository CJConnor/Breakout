class Paddle {

    paddleHeight = 10;
    paddleWidth = 75;

    constructor(canvas) {
        this.paddleX = (canvas.width - this.paddleWidth/2)
    }

    draw(ctx, cHeight) {

        ctx.beginPath();
        ctx.rect(this.paddleX, cHeight - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();

    }

}