'use strict';

var Bar = require('./Bar'),
    Ball = require('./Ball'),
    Vector = require('./Vector');

function Board() {
    this.players = [
        {
            name: 'Player one',
            score: 0,
            top: false,
            bot: false
        },
        {
            name: 'Player two',
            score: 0,
            top: false,
            bot: false
        }
    ];

    this.size = new Vector(1500, 750);

    this.leftBar = new Bar({ position: new Vector(50, 25) });
    this.rightBar = new Bar({ position: new Vector(1420, 25) });
    this.ball = new Ball({ position: new Vector(750, 375) });
}

Board.prototype.reset = function() {
    Board.prototype.constructor.call(this);
    return this;
};

Board.prototype.update = function() {
    var elapsedTime = 50;
    this.leftBar.direction = new Vector(0, this.players[0].top ? -1 : (this.players[0].bot ? 1 : 0));
    this.rightBar.direction = new Vector(0, this.players[1].top ? -1 : (this.players[1].bot ? 1 : 0));
    this.leftBar.update(elapsedTime);
    this.rightBar.update(elapsedTime);
    this.ball.update(elapsedTime);

    var ballLeft = this.ball.position.x - this.ball.size.x / 2.0,
        ballBottom = this.ball.position.y + this.ball.size.y / 2.0,
        ballRight = this.ball.position.x + this.ball.size.x / 2.0,
        ballTop = this.ball.position.y - this.ball.size.y / 2.0;

    if (this.ball.isColliding(this.leftBar)) {
        this.ball.direction.x *= -1;
    } else if (this.ball.isColliding(this.rightBar)) {
        this.ball.direction.x *= -1;
    } else if (ballLeft <= 0) {
        this.players[1].score++;
        this.ball.position = Ball.POSITION.clone();
        this.ball.direction = Ball.DIRECTION.clone();
    } else if (ballRight >= 1500) {
        this.players[0].score++;
        this.ball.position = Ball.POSITION.clone();
        this.ball.direction = Ball.DIRECTION.clone();
    } else if (ballTop <= 0) {
        this.ball.direction.y *= -1;
    } else if (ballBottom >= 750) {
        this.ball.direction.y *= -1;
    }
    return this;
};

module.exports = Board;
