class Ball {

    constructor() {
        this.ballRadius = 10;
    }

    draw(ctx, x, y) {

        ctx.beginPath();
        ctx.arc(x, y, this.ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();

    }

}