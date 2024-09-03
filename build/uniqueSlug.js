"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueSlug = void 0;
var general_js_1 = require("./general.js");
exports.uniqueSlug = (0, general_js_1.onlyUnique2)(function (a, b) { return a.__id === b.__id; });
//# sourceMappingURL=uniqueSlug.js.map