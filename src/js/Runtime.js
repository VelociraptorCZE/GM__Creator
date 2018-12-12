/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

import Transpiler from "./bundle/shared/Transpiler.js";
import Canvas from "./bundle/shared/Canvas.js";
import ImageParser from "./bundle/shared/ImageParser.js";

export default class Runtime {
    constructor(release) {
        window.objects = {};
        window.game = {};
        window.gameIntervals = [];
        if (release) {
            this.build();
            this.redraw();
        }
    }

    build() {
        this.clearIntervals();

        const objs = Object.keys(objects);
        objs.forEach(obj => {
            new Transpiler().compile(objects[obj], this);
        });

        document.title = game.name ? game.name : "GM::Creator";
        Canvas.get().setWidth(game.width);
        Canvas.get().setHeight(game.height);

        this.redraw();
    }

    clearIntervals() {
        gameIntervals.forEach(interval => clearInterval(interval));
        window.gameIntervals = [];
    }

    redraw() {
        requestAnimationFrame(() => this.render());
    }

    render() {
        Canvas.get().context.clearRect(0, 0, Canvas.get().width, Canvas.get().height);
        Object.values(objects).forEach(object => {
            for (let i = 0; i < object.instances.length; i++) {
                new ImageParser().parse(object, i);
            }
        });

        this.redraw();
    }
}

