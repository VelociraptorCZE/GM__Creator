/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

/**
 * A simple service class to simplify work with elements, also to avoid the document.getElementById stack hell
 *
 * Usage: context.runElementFactory({
 *  key: "id",
 *  key2: "id2"
 * })
 *
 * Returns an object with the selected elements by id, or node list
 */

import ErrorMessage from "../shared/ErrorMessage.js";

export default class ElementFactory {
    runElementFactory(o) {
        let newO = {};
        const pattern = /[.#]/;
        const props = Object.keys(o);

        props.forEach(prop => {
            const val = o[prop];
            if (val instanceof Element) {
                newO[prop] = val;
            }
            else {
                newO[prop] = pattern.test(val) ? document.querySelectorAll(val) : document.getElementById(val);

                if (!newO[prop] || (newO[prop] instanceof NodeList && !newO[prop].length)) {
                    console.warn(new ErrorMessage().DOMInvalidElement([val, newO[prop]]));
                }
            }
        });

        return newO;
    }
}