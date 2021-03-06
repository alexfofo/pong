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
    this.leftBar.update(elapsedTime, this.players[0]);
    this.rightBar.update(elapsedTime, this.players[1]);
    this.ball.update(elapsedTime);

    var ballLeft = this.ball.position.x - this.ball.size.x / 2.0,
        ballBottom = this.ball.position.y + this.ball.size.y / 2.0,
        ballRight = this.ball.position.x + this.ball.size.x / 2.0,
        ballTop = this.ball.position.y - this.ball.size.y / 2.0;

    if (this.ball.isColliding(this.leftBar)) {
        this.ball.direction.x *= -1;
        this.ball.speed += this.ball.speed * 0.3;
    } else if (this.ball.isColliding(this.rightBar)) {
        this.ball.direction.x *= -1;
        this.ball.speed += this.ball.speed * 0.3;
    } else if (ballLeft <= 0) {
        this.players[1].score++;
        this.ball.position = Ball.POSITION.clone();
        this.ball.speed = Ball.SPEED_START;
        this.ball.direction = new Vector(Math.random() > 0.5 ? 1 : -1, Math.random() * 2.0 - 1.0).normalize();
    } else if (ballRight >= 1500) {
        this.players[0].score++;
        this.ball.position = Ball.POSITION.clone();
        this.ball.speed = Ball.SPEED_START;
        this.ball.direction = new Vector(Math.random() > 0.5 ? 1 : -1, Math.random() * 2.0 - 1.0).normalize();
    } else if (ballTop <= 0) {
        this.ball.direction.y *= -1;
        this.ball.speed += this.ball.speed * 0.3;
    } else if (ballBottom >= 750) {
        this.ball.direction.y *= -1;
        this.ball.speed += this.ball.speed * 0.3;
    }
    return this;
};

module.exports = Board;
