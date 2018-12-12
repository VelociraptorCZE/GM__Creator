/*
AlertsJS 1.1
Copyright (C) Simon Raichl 2018
MIT License
Use this as you want, share it as you want, do basically whatever you want with this :)
*/

export class Alert{
    constructor(content, buttons, props){
        this.content = content;
        this.buttons = buttons;
        this.props = props;
        if (this.props ? !this.props.noescape : true){
            let escape = (input) => {
                return input.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
            };
            let objs = [this.content, this.buttons, this.props];
            objs.forEach((obj) => {
                if (obj !== void 0){
                    Object.keys(obj).forEach((key) => {
                        if (typeof obj[key] === "object"){
                            Object.keys(obj[key]).forEach((subkey) => {
                                obj[key][subkey] = escape(obj[key][subkey]);
                            });
                        }
                        else{
                            obj[key] = escape(obj[key]);
                        }
                    });
                }
            });
        }
    }
    show(){
        let id = parseInt(document.body.getAttribute("data-alerts")); isNaN(id) ? id = 0 : null;
        let id_str = id.toString();
        let alert = document.createElement("div");
        alert.setAttribute("class", "alert--overlay alert--overlay-fade-in");
        let fade = (this.props === void 0 ? 650 : this.props.fade === void 0 ? 650 : this.props.fade - 50); fade < 0 ? fade = 0 : null;
        alert.setAttribute("data-fade-in-ms", fade.toString());
        setTimeout(() => {
            alert.classList.remove("alert--overlay-fade-in");
        }, fade);
        alert.innerHTML =
        '<div class="alert--box" data-alert--id=' + id + '>' +
          '<div class="alert--box-title no-hover ' + (!this.props ? "" : "alert--box-color-" + this.props.color) + '">' + (!this.content.title ? "" : this.content.title) + '<span class="alert--box-exit" data-alert--id=' + id + '></span></div>' +
          '<div class="alert--box-content">' + this.content.text + '</div>' +
          '<div class="alert--box-buttons">' +
                (this.buttons ? (this.buttons.first ? '<div class="alert--box-button alert--box-color-' + this.buttons.first.color + '" data-alert--id='+ id +' data-button--id="0">' + this.buttons.first.text + '</div>' : "") +
                (this.buttons.second ? '<div class="alert--box-button alert--box-color-' + this.buttons.second.color + '" data-alert--id='+ id +' data-button--id="1">' + this.buttons.second.text + '</div>' : "") : "") +
          '</div>' +
        '</div>';
        document.body.appendChild(alert);
        let buttons = [".alert--box-button[data-alert--id='" + id_str + "']", ".alert--box-exit[data-alert--id='" + id_str + "']"];
        buttons.forEach((button) => {
            document.querySelectorAll(button).forEach((node) => {
                let key = (!this.buttons ? null : Object.keys(this.buttons)[parseInt(node.getAttribute("data-button--id"))] || 4);
                let overlay = document.querySelector(".alert--box[data-alert--id='" + id_str + "']").parentElement;
                node.addEventListener("click", () => {
                    if (getComputedStyle(overlay, null).getPropertyValue("opacity") == 1){
                        if (key !== null ? this.buttons[key] === void 0 ? this.dismiss(id_str) : this.buttons[key].onclick !== void 0 : false){
                            this.buttons[key].onclick();
                            this.buttons[key].dismiss ? this.dismiss(id_str, overlay, !this.props ? void 0 : fade) : null;
                        }
                        else{
                            this.dismiss(id_str, overlay, !this.props ? void 0 : fade);
                        }
                    }
                });
            });
        });
        document.body.setAttribute("data-alerts", id+1);
    }
    dismiss(id_str, box = (document.querySelector(".alert--box[data-alert--id='" + id_str + "']").parentElement), fade){
        !fade ? fade = parseInt(box.getAttribute("data-fade-in-ms")) - 50 : null;
        if (getComputedStyle(box, null).getPropertyValue("opacity") == 1){
            (fade === void 0 ? box.classList.add("alert--overlay-fade") : box.style = "animation: " + fade + "ms fade---anim");
            setTimeout(() => {
                box.remove();
            }, fade);
        }
    }
}
