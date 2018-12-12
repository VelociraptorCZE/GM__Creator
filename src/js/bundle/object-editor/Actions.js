/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

const getData = (params) => {
    let response = [];
    try {
        params.forEach(param => {
            let val = document.getElementById(param).value;
            val = isNaN(val) ? val : parseInt(val);
            response.push(val);
        });
    }
    catch {}
    return response;
};

export const actionList = {
    moveToRelative: {
        title: "Move to relative",
        inputs: `<label for="edit-obj-x">New x:</label><input type="number" id="edit-obj-x" value="0"><br>
                 <label for="edit-obj-y">New y:</label><input type="number" id="edit-obj-y" value="0">`,
        get vals() {
            return getData(["edit-obj-x", "edit-obj-y"]);
        },

        get overrideInputs() {
            return {
                callback: (params) => {
                    const inputArray = this.inputs.split("<br>");
                    for (let i = 0; i < 2; i++) {
                        inputArray[i] = inputArray[i].replace("0", params[i]);
                    }
                    return inputArray.join("<br>");
                }
            }
        }
    },
    get moveToPoint() {
        const moveToPoint = this.moveToRelative;
        moveToPoint.title = "Move to point";
        return moveToPoint;
    },
    checkWrapping: {
        title: "Check wrapping",
        inputs: `<label for="edit-obj-check-wrp">Check wrapping for following sides:</label><select id="edit-obj-check-wrp">
                    <option>both</option>
                    <option>vertical</option>
                    <option>horizontal</option>
                 </select>`,
        get vals() {
            return getData(["edit-obj-check-wrp"]);
        }
    },
    collision: {
        title: "Collision",
        get inputs() {
                return `<label for="edit-obj-check-wrp">Enable collision with:</label><select id="edit-obj-to-col">
                ${document.querySelector(".js-global-obj-select").innerHTML}
                </select>`; },

        get vals() {
            return getData(["edit-obj-to-col"]);
        }
    },
    jump: {
        title: "Move to relative",
        inputs: `<label for="edit-obj-force">New x:</label><input type="number" id="edit-obj-force" value="0"><br>
                 <label for="edit-obj-coord">Axis:</label>
                     <select id="edit-obj-coord">
                        <option>y</option>
                        <option>x</option>
                     </select>`,
        get vals() {
            return getData(["edit-obj-force", "edit-obj-coord"]);
        },
    },
};

export const actionGUI = {
    doOnSelect:
        `<label>Do:</label>
         <select id="js-do-on-sel">
            <option data-code="">on every frame</option>
            <option data-code="onKey">on key</option>
        </select>`,
    doOnListener: `<label>Listener (e.g. key - Space, W...):</label><input type="text" id="edit-obj-do-on-spec">`,
    get data() {
        return {
            events: function* () {
                const elem = document.getElementById("js-do-on-sel");
                yield elem.options[elem.options.selectedIndex].getAttribute("data-code");
                yield document.getElementById("edit-obj-do-on-spec").value;
            },
        }
    }
};