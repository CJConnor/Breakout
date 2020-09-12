class Lives {

    lives = 3;

    constructor() {
        this.lives = this.lives;
    }

    draw(ctx, cWidth) {

        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: " + this.lives, cWidth - 65, 20);

    }

}