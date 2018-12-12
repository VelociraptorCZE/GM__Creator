/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

import {actionList, actionGUI} from "./Actions.js";
import {Alert} from "../../../../node_modules/alertsjs/js/alerts.js";
import ActionItem from "./ActionItem.js";

export default class ActionListeners {
    setActionListener(elem, newItem) {
        elem.addEventListener("click", e => {
            const elem = e.target.parentElement;
            let code = [];

            try {
                code = elem.getAttribute("data-code").split("->");
            }
            catch {}

            const action = elem.getAttribute("data-action") || code[0];
            const { inputs, title, doOnSelect, doOnListener, data, overrideInputs } = { ...actionGUI, ...actionList[action] };
            const override = overrideInputs ? overrideInputs.callback : void 0;
            let newInputs;

            if (!newItem && override) {
                newInputs = override(code[1].split(","));
            }

            new Alert({
                text: `${newInputs ? newInputs : inputs}<br>${doOnSelect}<br>${doOnListener}`,
                title: title
            }, {
                first: {
                    text: "Add"
                }
            }, {
                noescape: true
            }).show();

            document.querySelector(".alert--box-button").addEventListener("click", e => {
                if (parseInt(getComputedStyle(elem.parentElement.parentElement).opacity)) {
                    const vals = actionList[action].vals.join(",");
                    const events = data.events();
                    const line = `${action}->${vals}->${events.next().value}->${events.next().value}`;
                    if (newItem) {
                        new ActionItem(action, line).render();
                    }
                    else {
                        elem.setAttribute("data-code", line);
                        ActionItem.refreshDescription(line, elem.children[1]);
                    }
                }
            });
        });
    }
}