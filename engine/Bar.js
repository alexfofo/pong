'use strict';

var util = require('util'),
    Entity = require('./Entity'),
    Vector = require('./Vector');

function Bar(options) {
    options = options || {};

    options.size = Bar.SIZE.clone();

    Entity.call(this, 'Bar', options);
}

util.inherits(Bar, Entity);

Bar.SIZE = new Vector(0.1, 1.0);

module.exports = Bar;
