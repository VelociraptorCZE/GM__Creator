/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

import ActionList from "./ActionList.js";
import GUI from "../main/GUI.js";
import ErrorMessage from "../shared/ErrorMessage.js";
import ActionItemsLoader from "./ActionItemsLoader.js";
import ActionListeners from "./ActionListeners.js";

export default class ObjectEditor extends GUI{
    constructor() {
        super();

        new ActionList().render();
        new ActionItemsLoader();

        this.initSaveListener();

        document.querySelectorAll(".action-item").forEach(elem => {
            new ActionListeners().setActionListener(elem, true);
        });

    }

    initSaveListener() {
        this.elems.editObjSaveBtn.addEventListener("click", () => {
            const obj = this.elems.editObjSel.value;
            let code = "";
            document.querySelectorAll(".edit-obj-action")
                .forEach(elem => code += elem.getAttribute("data-code") + "\n");
            try {
                window.objects[obj].code = code;
            }
            catch (e) {
                console.warn(new ErrorMessage().onCodeBindFail(objects[obj], e));
            }
        });
    }
}