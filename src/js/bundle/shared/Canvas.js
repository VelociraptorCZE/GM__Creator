/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

export default class Canvas {
    static get() {
        const canvas = document.getElementById("js-game");
        return {
            elem: canvas,
            width: parseInt(canvas.width),
            height: parseInt(canvas.height),
            setWidth: (width) => { canvas.width = width },
            setHeight: (height) => { canvas.height = height },
            context: canvas.getContext("2d")
        }
    }
}
