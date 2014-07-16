'use strict';

var Bar = require('./Bar'),
    Ball = require('./Ball');

function Board() {
    this.leftPlayer = {
        name: 'Player one',
        score: 0
    };

    this.rightPlayer = {
        name: 'Player two',
        score: 0
    };

    this.leftBar = new Bar();
    this.rightBar = new Bar();
    this.ball = new Ball();
}

Board.prototype.reset = function() {
    Board.prototype.constructor.call(this);
    return this;
};

Board.prototype.update = function(elapsedTime) {
    this.leftBar.update(elapsedTime);
    this.rightBar.update(elapsedTime);
    this.ball.update(elapsedTime);

    if (this.ball.isColliding(this.leftBar)) {
        console.log('Collision on left bar');
    } else if (this.ball.isColliding(this.rightBar)) {
        console.log('Collision on right bar');
    }
    return this;
};

module.exports = Board;
