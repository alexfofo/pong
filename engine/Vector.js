'use strict';

function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
    return this;
};

Vector.prototype.copy = function(vector) {
    this.x = vector.x;
    this.y = vector.y;
    return this;
};

Vector.prototype.clone = function() {
    return new Vector(this.x, this.y);
};

Vector.prototype.add = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
};

Vector.prototype.subtract = function(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
};

Vector.prototype.multiply = function(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    return this;
};

Vector.prototype.divide = function(vector) {
    this.x /= vector.x;
    this.y /= vector.y;
    return this;
};

Vector.prototype.addScalar = function(number) {
    this.x += number;
    this.y += number;
    return this;
};

Vector.prototype.subtractScalar = function(number) {
    this.x -= number;
    this.y -= number;
    return this;
};

Vector.prototype.multiplyScalar = function(number) {
    this.x *= number;
    this.y *= number;
    return this;
};

Vector.prototype.divideScalar = function(number) {
    if (!number) {
        this.x = 0;
        this.y = 0;
    } else {
        this.x /= number;
        this.y /= number;
    }
    return this;
};

Vector.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.negate = function() {
    this.x = - this.x;
    this.y = - this.y;
    return this;
};

Vector.prototype.dot = function(vector) {
    return this.x * vector.x + this.y * vector.y;
};

Vector.prototype.normalize = function() {
    return this.divideScalar(this.length());
};

module.exports = Vector;
