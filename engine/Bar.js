'use strict';

var util = require('util'),
    Entity = require('./Entity'),
    Vector = require('./Vector');

function Bar(options) {
    options = options || {};

    options.size = Bar.SIZE.clone();
    options.speed = Bar.SPEED_START;

    Entity.call(this, 'Bar', options);
}

util.inherits(Bar, Entity);

Bar.SIZE = new Vector(30, 100);

Bar.SPEED_START = 240; // distance unit / second

module.exports = Bar;
