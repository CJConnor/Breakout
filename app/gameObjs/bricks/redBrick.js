import {Brick} from './brick.js';
export {RedBrick}

/**
 * Red brick class that extends to the brick class
 */
class RedBrick extends Brick {

    colour = ['darkred' , 'red', 'tomato' ];
    score  = 30;
    hp     = 3;

    /**
     * Red brick constructor
     * @param x | integer
     * @param y | integer
     * @param status | integer
     */
    constructor(x, y, status) {
        super(x, y, status);
    }

}