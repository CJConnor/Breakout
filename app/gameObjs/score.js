class Score {

    score = 0;

    constructor() {}

    draw(ctx) {

        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + this.score, 8, 20);

    }

}