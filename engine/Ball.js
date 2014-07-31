'use strict';

var util = require('util'),
    Entity = require('./Entity'),
    Vector = require('./Vector');

function Ball(options) {
    options = options || {};

    options.size = Ball.SIZE.clone();
    options.direction = new Vector(Math.random() > 0.5 ? 1 : -1, Math.random() * 2.0 - 1.0).normalize();
    options.speed = Ball.SPEED_START;

    Entity.call(this, 'Ball', options);
}

util.inherits(Ball, Entity);

// Ball.DIRECTION = new Vector(1, Math.random()).normalize();

Ball.SPEED_START = 240; // distance unit / second

Ball.SIZE = new Vector(25, 25);

Ball.POSITION = new Vector(750, 375);

module.exports = Ball;
