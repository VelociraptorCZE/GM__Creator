/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

Object.prototype.moveToRelative = function(x, y) {
    this.x += x;
    this.y += y;
};

Object.prototype.moveToPoint = function(x, y) {
    this.x = x;
    this.y = y;
};

Object.prototype.checkWrapping = function(mode = "both") {
    const checkCoords = (coord, canvasSize, objSize) => {
        let val = coord;
        if (coord > canvasSize + (objSize / 3)) {
            val = -objSize;
        }
        else if (coord < -objSize) {
            val = canvasSize;
        }
        return val;
    };

    const wrap = {
        both: () => {
            wrap["horizontal"]();
            wrap["vertical"]();
        },
        horizontal: () => {
            this.x = checkCoords(this.x, Canvas.get().width, this.width);
        },
        vertical: () => {
            this.y = checkCoords(this.y, Canvas.get().height, this.height);
        }
    };

    wrap[mode]();
};

Object.prototype.jump = function(force, coord) {
    coord = isNaN(coord) || !coord ? "y" : coord;
    if (this.col) {
        const jmp = setInterval(() => {
            this[coord] += force / Math.atan(.4);
            force -= 0.001;
            if (force <= 0) {
                clearInterval(jmp);
            }
        }, 100);
    }
    this.col = false;
};

Object.prototype.collision = function (target) {
    const checkCoords = (coord, objSize, instance) => {
        return {
            condition: this[coord] + this[objSize] > instance[coord] && instance[coord] + instance[objSize] > this[coord],
            newPosition: {
                first: instance[coord] + instance[objSize] - this[coord],
                second: this[coord] + this[objSize] - instance[coord]
            }
        };
    };

    const setPosition = obj => {
        const { first, second } = obj;
        return first < second ? first : -second;
    };

    objects[target].instances.forEach(targetInstance => {
        const w = checkCoords("x", "width", targetInstance);
        const h = checkCoords("y", "height", targetInstance);
        if (w.condition && h.condition) {
            if (w.newPosition.first < h.newPosition.first || w.newPosition.second < h.newPosition.second) {
                this.x += setPosition(w.newPosition);
            }
            else {
                this.y += setPosition(h.newPosition);
            }
            this.col = true;
        }
        else {
            setTimeout(() => { this.col = false }, 25);
        }
    });
};


import Canvas from "../bundle/shared/Canvas.js";