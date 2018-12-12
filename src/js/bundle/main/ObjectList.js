/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

/**
 * Simple class to refresh all selects with the objects
 */

import GUI from "./GUI.js";

export default class ObjectList extends GUI {

    constructor() {
        super();
    }

    refresh() {
        for (let i = 0; i < this.elems.globalObjSelect.length; i++) {
            const elem = this.elems.globalObjSelect[i];
            elem.innerHTML = "<option disabled selected hidden>Select your object</option>";
            Object.keys(objects).forEach(object => {
                elem.innerHTML += `<option>${object}</option>`;
            })
        }
    }
}