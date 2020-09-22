import {Brick} from './brick.js';
export {GreenBrick}

/**
 * Green brick class that extends from the brick class
 */
class GreenBrick extends Brick {

    colour = ['darkGreen', 'green'];
    score  = 20;
    hp     = 2;

    /**
     * Green brick constructor
     * @param x | integer
     * @param y | integer
     * @param status | integer
     */
    constructor(x, y, status) {
        super(x, y, status);
    }

}