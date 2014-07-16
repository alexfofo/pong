'use strict';

var Vector = require('./Vector');

function Entity(type, options) {
    options = options || {};

    this.id = options.id || '';
    this.type = type;
    this.position = options.position || new Vector();
    this.size = options.size  || new Vector();
    this.direction = options.direction || new Vector();
    this.speed = options.speed || 0;
}

Entity.prototype.update = function(elapsedTime) {
    this.position.add(this.direction.clone().multiply(this.speed * elapsedTime / 1000));
    return this;
};

Entity.prototype.setDirection = function(vector) {
    this.direction = vector.clone().normalize();
    return this;
};

Entity.prototype.setSpeed = function(speed) {
    this.speed = speed;
};

Entity.prototype.isColliding = function(entity) {
    var myLeft = this.position.x - this.size.x / 2.0,
        myBottom = this.position.y - this.size.y / 2.0,
        myRight = this.position.x + this.size.x / 2.0,
        myTop = this.position.y + this.size.y / 2.0;

    var entLeft = entity.position.x - entity.size.x / 2.0,
        entBottom = entity.position.y - entity.size.y / 2.0,
        entRight = entity.position.x + entity.size.x / 2.0,
        entTop = entity.position.y + entity.size.y / 2.0;

    return !(
        (myBottom > entTop) ||
        (myTop < entBottom) ||
        (myLeft > entRight) ||
        (myRight < entLeft)
        );
};

module.exports = Entity;
