"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHumanReadableAgoTime = void 0;
var getHumanReadableAgoTime = function (unixTime) {
    var timeAgo = Date.now() - unixTime;
    var daysAgo = timeAgo / 86400000;
    if (daysAgo < 1) {
        var hoursAgo = daysAgo * 24;
        if (hoursAgo < 1) {
            return "just now";
        }
        return "".concat(Math.round(hoursAgo), " hours ago");
    }
    return "".concat(Math.round(daysAgo), " days ago");
};
exports.getHumanReadableAgoTime = getHumanReadableAgoTime;
//# sourceMappingURL=getHumanReadableAgoTime.js.map