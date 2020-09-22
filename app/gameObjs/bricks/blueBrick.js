import {Brick} from './brick.js';
export {BlueBrick}

/**
 * Blue brick class that extends from the brick class
 */
class BlueBrick extends Brick {

    colour = ['#0095DD'];
    score = 10;
    hp = 1;

    /**
     * Constructs blue brick
     * @param x | integer
     * @param y | integer
     * @param status | integer
     */
    constructor(x, y, status) {
        super(x, y, status);
    }

}