"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHumanReadableAgoTime = void 0;
const getHumanReadableAgoTime = (unixTime) => {
    const timeAgo = Date.now() - unixTime;
    const daysAgo = timeAgo / 86400000;
    if (daysAgo < 1) {
        const hoursAgo = daysAgo * 24;
        if (hoursAgo < 1) {
            return "just now";
        }
        return `${Math.round(hoursAgo)} hours ago`;
    }
    return `${Math.round(daysAgo)} days ago`;
};
exports.getHumanReadableAgoTime = getHumanReadableAgoTime;
//# sourceMappingURL=getHumanReadableAgoTime.js.map