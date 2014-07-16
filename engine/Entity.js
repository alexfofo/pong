'use strict';

function Entity(id, type, position, size) {
    this.id = id;
    this.type = type;
    this.position = position;
    this.size = size;
}

Entity.prototype.translate = function(vector) {
    this.position.add(vector);
    return this;
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
