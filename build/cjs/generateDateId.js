"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDateId = void 0;
const generateRandomString_js_1 = require("./generateRandomString.js");
const generateDateId = () => {
    return (new Date(Date.now()).toISOString().slice(0, -8) + (0, generateRandomString_js_1.generateRandomString)(3));
};
exports.generateDateId = generateDateId;
//# sourceMappingURL=generateDateId.js.map