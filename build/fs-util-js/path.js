"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathJoin = void 0;
var pathJoin = function () {
    var chunks = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        chunks[_i] = arguments[_i];
    }
    return chunks.join("/");
};
exports.pathJoin = pathJoin;
//# sourceMappingURL=path.js.map