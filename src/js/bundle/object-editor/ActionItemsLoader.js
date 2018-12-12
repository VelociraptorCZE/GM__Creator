/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

import ActionItem from "./ActionItem.js";
import ActionItems from "./ActionItems.js";
import GUI from "../main/GUI.js";

export default class ActionItemsLoader extends GUI {
    constructor() {
        super();
        this.elems.editObjSel.addEventListener("change", e => {
            const code = objects[e.target.value].code.split("\n");
            new ActionItems().invalidate();
            code.forEach(line => {
                try {
                    new ActionItem(line.split("->")[0], line).render();
                }
                catch {}
            });
        });
    }
}