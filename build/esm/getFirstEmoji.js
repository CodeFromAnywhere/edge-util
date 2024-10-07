import emojiRegex from "emoji-regex";
export const getFirstEmoji = (text) => {
    var _a;
    if (!text)
        return;
    return (_a = text === null || text === void 0 ? void 0 : text.match(emojiRegex())) === null || _a === void 0 ? void 0 : _a[0];
};
//# sourceMappingURL=getFirstEmoji.js.map