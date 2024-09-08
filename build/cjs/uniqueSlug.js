"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueSlug = void 0;
const general_js_1 = require("./general.js");
exports.uniqueSlug = (0, general_js_1.onlyUnique2)((a, b) => a.__id === b.__id);
//# sourceMappingURL=uniqueSlug.js.map