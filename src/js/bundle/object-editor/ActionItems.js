/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

/**
 * Service class for ActionItem.js
 */

export default class ActionItems {
    constructor() {
        this.container = document.querySelector(".edit-obj-actions");
    }

    invalidate() {
        this.container.innerHTML = "";
    }
}