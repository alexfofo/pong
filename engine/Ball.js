'use strict';

var util = require('util'),
    Entity = require('./Entity'),
    Vector = require('./Vector');

function Ball(options) {
    options = options || {};

    options.size = Ball.SIZE.clone();
    options.direction = Ball.DIRECTION_START.clone();
    options.speed = Ball.SPEED_START;

    Entity.call(this, 'Ball', options);
}

util.inherits(Ball, Entity);

Ball.DIRECTION_START = new Vector(1, 0);

Ball.SPEED_START = 0.2; // distance unit / second

Ball.SIZE = new Vector(0.1, 0.1);

module.exports = Ball;
