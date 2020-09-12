class Bricks {

    brickRowCount = 3;
    brickColumnCount = 5;
    brickWidth = 75;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 30;
    brickOffsetLeft = 30;
    bricks = [];

    constructor() {
        for(var c = 0; c < this.brickColumnCount; c++) {
            this.bricks[c] = [];
            for(var r = 0; r < this.brickRowCount; r++) {
                this.bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
    }

    draw(ctx) {

        for (var c = 0; c < this.brickColumnCount; c++) {

            for (var r = 0; r < this.brickRowCount; r++) {

                if (this.bricks[c][r].status == 1) {

                    var brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
                    var brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;

                    this.bricks[c][r].x = brickX;
                    this.bricks[c][r].y = brickY;

                    ctx.beginPath();
                    ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();

                }

            }

        }

    }

}