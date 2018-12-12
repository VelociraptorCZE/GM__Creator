/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

/**
 * This class represents every single action item added by user
 */

import actionListData from "./ActionListData.js";
import ActionItems from "./ActionItems.js";
import ActionListeners from "./ActionListeners.js";

export default class ActionItem extends ActionItems {
    constructor(action, code) {
        super();
        this.singleAction = actionListData.filter(a => a.action === action)[0];
        this.code = code;
    }

    render() {
        const { singleAction, code, container } = this;
        const id = "edit-obj-item-" + document.querySelectorAll(".edit-obj-action").length;

        container.innerHTML +=
            `<div class="edit-obj-action" data-code="${code}" id="${id}"> 
                <img src="tex/actions/${singleAction.action}.svg" alt="${singleAction.alt}"> 
                <p style="width:calc(100% - 6.5rem)"></p> 
                <span class="edit-obj-action-remove">x</span>
             </div>`;

        document.querySelectorAll(".edit-obj-action-remove").forEach(rem => {
            rem.addEventListener("click", e => {
                e.target.parentElement.remove();
            });
        });

        setTimeout(() => {
            let p = document.getElementById(id).children[1];
            new ActionListeners().setActionListener(p, false);
            ActionItem.refreshDescription(code, p, singleAction.alt);
        }, 50);
    }

    static refreshDescription(code, elem, a) {
        const separator = " .";
        let action = code.split("->");
        action = {
            params: action[1],
            listener: action[2] === "" ? "onEveryFrame" : action[2],
            target: action[3] ? action[3] : ""
        };

        if (a) {
            elem.innerText = `${a} ()${separator}`;
        }

        elem.innerText = elem.innerText.replace(/\(.+?(\s+\.)/, `(${action.params}) ${action.listener} [${action.target}]${separator}`);
    }
}