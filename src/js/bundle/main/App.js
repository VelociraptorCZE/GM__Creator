/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

/**
 * Core of the app, uses GUI.js, layout init
 */

import GUI from "./GUI.js";
import ErrorMessage from "../shared/ErrorMessage.js";
import Canvas from "../shared/Canvas.js";
import ObjectEditor from "../object-editor/ObjectEditor.js";
import ObjectList from "./ObjectList.js";

export default class App extends GUI {
    constructor(runtime) {
        super();

        new ObjectEditor();

        this.runtime = runtime;
        this.init();

        this.setActive(this.elems._nav.createBtn, this.elems._containers.createContainer);
        this.setListeners();
        this.setListeners(this.elems._subToggles, this.elems._subContainers, true);

        this.elems.disableTooltips.addEventListener("click", e => {
            document.querySelectorAll(".tooltip").forEach(elem => {
                e.target.checked ? elem.classList.add("disable-tooltip") : elem.classList.remove("disable-tooltip");
            });
        });

        window.game = {
            name: "New game",
            width: 640,
            height: 360,
            score: 0
        };
    }

    init() {
        /**
         * Do on object create
         */

        this.elems.addObjBtn.addEventListener("click", () => {
            const ref = this.elems.objName.value;
            const w = parseInt(this.elems.objWidth.value);
            const h = parseInt(this.elems.objHeight.value);
            objects[ref] = {
                width: w,
                height: h,
                code: "",
                img: this.elems.objImgSrc.value,
                instances: []
            };

            new ObjectList().refresh();
        });

        /**
         * Do on instance create
         */

        this.elems.addInstanceBtn.addEventListener("click", () => {
            const elem = this.elems.addInstanceSel;
            const obj = elem.options[elem.options.selectedIndex].value;

            try {
                objects[obj].instances.push({
                    x: parseFloat(this.elems.instanceX.value),
                    y: parseFloat(this.elems.instanceY.value),
                    width: objects[obj].width,
                    height: objects[obj].height,
                    col: false
                });
            }

            catch(e) {
                console.warn(new ErrorMessage().onInstanceCreationFail(e));
            }
        });

        /**
         * On config save
         */

        this.elems.configSaveBtn.addEventListener("click", () => {
            window.game.name = this.elems.configGameName.value;
            window.game.width = parseInt(this.elems.configCanvasWidth.value);
            window.game.height = parseInt(this.elems.configCanvasHeight.value);

            Canvas.get().setWidth(game.width);
            Canvas.get().setHeight(game.height);
        });

        this.elems.buildProjBtn.addEventListener("click", () => this.build());
    }

    setListeners(toggles = this.elems._nav, containers, toggleable) {
        Object.values(toggles).forEach(button => {
            button.addEventListener("click", e => {
                this.setActive(e.target, document.getElementById(e.target.id + "-container"), containers, toggles, toggleable);
            });
        });
    }

    setActive(button, container, containers = this.elems._containers, toggles = this.elems._nav, toggleable) {
        if (!toggleable) {
            Object.keys(containers).forEach(key => {
                const btn = toggles[key.replace("Container", "Btn")];
                const cont = containers[key];
                btn.classList.remove("active-nav-button");
                cont.style.display = "none";
            });

            button.classList.add("active-nav-button");
            container.style.display = "block";
        }
        else {
            container.style.display === "none" ? container.style.display = "block" : container.style.display = "none";
        }
    }

    build() {
        Canvas.get().elem.outerHTML = Canvas.get().elem.outerHTML;
        document.cookie = `GM__Creator_temp_code=${JSON.stringify(window.objects)};`;
        document.cookie = `GM__Creator_temp_gameInfo=${JSON.stringify(window.game)};`;
        const elem = this.elems.objOutputCode;
        const getCode = new XMLHttpRequest();
        getCode.onload = e => {
            const code = e.target.responseText;
            elem.value = code;
            const outputCode = new Blob([code], { type: "text/plain" });
            this.elems.downloadProj.removeAttribute(...["data-ready", "data-tooltip-text"]);
            this.elems.downloadProj.classList.remove("tooltip");
            this.elems.downloadProj.href = URL.createObjectURL(outputCode);
            this.elems.downloadProj.download = `${game.name}.html`;
        };
        getCode.open("get", "src/php/Build.php");
        getCode.send();

        this.runtime.build();
    }
}