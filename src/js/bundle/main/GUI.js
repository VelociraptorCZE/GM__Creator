/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

/**
 * This class provides full list of all elements, used on multiple occasions
 */

import ElementFactory from "./ElementFactory.js";

export default class GUI extends ElementFactory {
    constructor() {
        super();
        this.elems = { ...this.getBaseGUI(), ...this.layout() };
    }

    layout() {
        return {
            _subContainers: {
                ...this.runElementFactory({
                    createObjContainer: "js-create-obj-container",
                    createInstanceContainer: "js-create-instance-container",
                    editObjContainer: "js-edit-obj-container",
                })
            },

            _subToggles: {
                ...this.runElementFactory({
                    createObjBtn: "js-create-obj",
                    createInstanceBtn: "js-create-instance",
                    editObjBtn: "js-edit-obj"
                })
            },

            /**
             * Main container:
             */

            _containers: {
                ...this.runElementFactory({
                    createContainer: "js-create-container",
                    configContainer: "js-config-container",
                    previewContainer: "js-preview-container"
})
            },

            _nav: {
                ...this.runElementFactory({
                    createBtn: "js-create",
                    configBtn: "js-config",
                    previewBtn: "js-preview",
                })
            }
        }
    }

    getBaseGUI() {
        return this.runElementFactory({
            addObjBtn: "js-add-obj",
            addInstanceBtn: "js-add-instance",
            addInstanceSel: "js-instance-select",
            buildProjBtn: "js-game-build",
            editObjSel: "js-edit-obj-select",
            editObjSaveBtn: "js-edit-obj-save",
            globalObjSelect: ".js-global-obj-select",
            instanceX: "js-instance-x",
            instanceY: "js-instance-y",
            configGameName: "js-config-game-name",
            configCanvasWidth: "js-config-canvas-width",
            configCanvasHeight: "js-config-canvas-height",
            configSaveBtn: "js-config-save",
            downloadProj: "js-download-proj",
            objName: "js-obj-name",
            objImgSrc: "js-obj-img",
            objWidth: "js-obj-width",
            objHeight: "js-obj-height",
            objOutputCode: "js-output-code",
            disableTooltips: "js-disable-tooltips"
        });
    }
}
