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

Bar.prototype.update = function(elapsedTime, playerInputs) {
    this.direction = new Vector(0, playerInputs.top ? -1 : (playerInputs.bot ? 1 : 0));
    Entity.prototype.update.call(this, elapsedTime);

    var topBar = this.position.y - (this.size.y / 2);
    var botBar = this.position.y + (this.size.y / 2);

    if (topBar <= 0) {
        this.position.y = 0 + this.size.y / 2;
    } else if (botBar >= 750) {
        this.position.y = 750 - this.size.y / 2;
    }

    return this;
};

module.exports = Bar;
