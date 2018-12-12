/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

import actionListData from "./ActionListData.js";

export default class ActionList {
    constructor() {
        this.actionList = actionListData;
        this.container = document.querySelector(".edit-obj-action-list");
    }

    render() {
        this.actionList.forEach(a => {
            const { action, alt } = a;
            const elem = `
            <div class="action-item" data-action="${action}">
            <img src="tex/actions/${action}.svg" alt="${alt}">
            </div>`;
            this.container.innerHTML += elem;
        })
    }
}