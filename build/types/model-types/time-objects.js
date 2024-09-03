"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCreatedTimeObject = exports.getUpdatedTimeObject = exports.getTimeObject = void 0;
var getTimeObject = function () {
    var unixTime = Date.now();
    var dateObject = new Date(unixTime);
    var date = "".concat(dateObject.getFullYear(), "-").concat(dateObject.getMonth() + 1, "-").concat(dateObject.getDate());
    var time = "".concat(dateObject.getHours(), ":").concat(dateObject.getMinutes());
    return { unixTime: unixTime, date: date, time: time };
};
exports.getTimeObject = getTimeObject;
var getUpdatedTimeObject = function () {
    var _a = (0, exports.getTimeObject)(), unixTime = _a.unixTime, date = _a.date, time = _a.time;
    return {
        updatedAt: unixTime,
        updatedDate: date,
        updatedTime: time,
    };
};
exports.getUpdatedTimeObject = getUpdatedTimeObject;
var getCreatedTimeObject = function () {
    var _a = (0, exports.getTimeObject)(), unixTime = _a.unixTime, date = _a.date, time = _a.time;
    return {
        createdAt: unixTime,
        createdDate: date,
        createdTime: time,
    };
};
exports.getCreatedTimeObject = getCreatedTimeObject;
//# sourceMappingURL=time-objects.js.map