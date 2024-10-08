"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstEmoji = void 0;
const emoji_regex_1 = require("emoji-regex");
const getFirstEmoji = (text) => {
    var _a;
    if (!text)
        return;
    return (_a = text === null || text === void 0 ? void 0 : text.match((0, emoji_regex_1.default)())) === null || _a === void 0 ? void 0 : _a[0];
};
exports.getFirstEmoji = getFirstEmoji;
//# sourceMappingURL=getFirstEmoji.js.map