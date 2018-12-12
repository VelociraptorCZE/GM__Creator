/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

const GMCLang = {
    /**
     * Movement.js library methods:
     */

    moveToPoint: (object, params) => {
        object.instances.map(instance => instance.moveToPoint(...params));
    },

    moveToRelative: (object, params) => {
        object.instances.map(instance => instance.moveToRelative(...params));
    },

    checkWrapping: (object, param) => {
        object.instances.map(instance => instance.checkWrapping(param));
    },

    collision: (object, target) => {
        object.instances.map(instance => instance.collision(target));
    },

    jump: (object, params) => {
        object.instances.map(instance => instance.jump(...params));
    },
};

export default GMCLang;