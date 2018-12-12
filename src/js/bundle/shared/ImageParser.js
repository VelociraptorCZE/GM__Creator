/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

import Canvas from "./Canvas.js";

export default class ImageParser {
    parse(obj, instance) {
        const { instances, img, width, height } = obj;
        const ins = instances[instance];
        const shapes = {
            rect: () => {
                Canvas.get().context.fillRect(ins.x, ins.y, width, height);
            },
            circle: () => {
                const w = width / 2;
                Canvas.get().context.beginPath();
                Canvas.get().context.arc(ins.x + w, ins.y + w, w,0,2 * Math.PI);
                Canvas.get().context.fill();
                Canvas.get().context.closePath();
            }
        };
        const command = "draw";
        let image = img.replace(/ /g, "");
        if (image.includes(command)) {
            image = image.toLowerCase()
                .replace(new RegExp(`${command}(->|::)`, "g"), "")
                .split(",");
            Canvas.get().context.fillStyle = image[1] ? image[1] : "#000";
            shapes[image[0]]();
        }
        else {
            const image = new Image(0, 0);
            image.onload = () => {
                Canvas.get().context.drawImage(image, ins.x, ins.y);
            };
            image.src = img;
        }
    }
}