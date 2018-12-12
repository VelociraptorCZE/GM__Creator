/**
 * GM::Creator
 * Copyright (C) Simon Raichl 2018
 * MIT License
 */

export default class ErrorMessage {
    constructor(lineNum = -2) {
        this.lineNum = lineNum;
        this.core = `Error occurred while parsing line number ${this.lineNum + 1}`;
    }
    
    onInvalidLine(line, dump) {
        return `${this.core} - this line has an incorrect statement: ${line}\n\n${dump}`;
    }

    onJSInvalidLine(line, dump) {
        return `${this.core} - illegal JavaScript snippet:\n\n${line}\n\n${dump}`;
    }

    onInstanceCreationFail(dump) {
        return `Instance cannot be created: \n\n${dump}`;
    }

    DOMInvalidElement(params) {
        let len = "";
        try {
            len = `with length ${params[1].length}`;
        }
        catch {}
        return `Following element selector ${params[0]} returned ${params[1]} ${len}`;
    }

    onInvalidInput(dump) {
        return `Cannot get data from input: ${dump}`;
    }

    onCodeBindFail(obj, dump) {
        return `Cannot bind code to object of ${obj}:\n ${dump}`;
    }
}