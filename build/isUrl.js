"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUrl = void 0;
var isUrl = function (urlOrPath) {
    if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")) {
        return true;
    }
    return false;
};
exports.isUrl = isUrl;
exports.isUrl.config = {
    isPublic: true,
    categories: ["util"],
    emoji: "🔗",
    shortDescription: "Check if something is an url",
};
//# sourceMappingURL=isUrl.js.map