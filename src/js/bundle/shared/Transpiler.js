/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

import GMCLang from "./GMCLang.js";
import ErrorMessage from "./ErrorMessage.js";
import Canvas from "./Canvas.js";

export default class Transpiler {
    compile(object, runtime) {
        const code = object.code.replace(/ /g, "");
        const lines = code.split("\n");
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].slice(0, 2) === "##") {
                const line = lines[i].replace(/##/, "");
                try {
                    new Function(line)();
                }
                catch (e) {
                    console.error(new ErrorMessage(i).onJSInvalidLine(line, e));
                }
            }
            else {
                const line = lines[i].split("->").map(param => param === "" ? void 0 : param);
                /**
                 * const line PARAMS:
                 * ------------------------------------------------------------------------------------------
                 * 0: function           -> cannot be omitted
                 * 1: function params    -> can be undefined
                 * 2: trigger            -> can be undefined - if so then the function triggers on every step
                 * 3: specifying trigger -> can be undefined
                 */

                let params = line[1]
                        ? line[1].includes(",")
                        ? line[1].split(",").map(param => isNaN(Number(param)) ? param : parseFloat(param))
                        : line[1] : void 0;

                const callError = e => {
                    if (lines[i] !== "") {
                        runtime.clearIntervals();
                        throw new ErrorMessage(i).onInvalidLine(line, e);
                    }
                };

                try {
                    const listenerFactory = listener => {
                        const listeners = {
                            "onKey":        "keypress",
                            "onKeyRelease": "keyup",
                        };

                        Canvas.get().elem.addEventListener(listeners[listener], e => {
                            const key = e.key.replace(/ /, "space").toLowerCase();
                            if (key === line[3].toLowerCase()) {
                                GMCLang[line[0]](object, params);
                            }
                        });
                    };

                    const callbacks = {
                        "onKey|onKeyRelease": (param) => {
                            listenerFactory(param);
                        },

                        undefined: () => {
                            gameIntervals.push(setInterval(() => {
                                try {
                                    GMCLang[line[0]](object, params);
                                }
                                catch (e) {
                                    callError(e);
                                }
                            }, 20));
                        }
                    };

                    callbacks[Object.keys(callbacks).filter(query => query.includes(line[2]))[0]](line[2]);
                }
                catch (e) {
                    callError(e);
                }
            }
        }
    }
}