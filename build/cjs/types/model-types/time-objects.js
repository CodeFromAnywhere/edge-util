"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCreatedTimeObject = exports.getUpdatedTimeObject = exports.getTimeObject = void 0;
const getTimeObject = () => {
    const unixTime = Date.now();
    const dateObject = new Date(unixTime);
    const date = `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`;
    const time = `${dateObject.getHours()}:${dateObject.getMinutes()}`;
    return { unixTime, date, time };
};
exports.getTimeObject = getTimeObject;
const getUpdatedTimeObject = () => {
    const { unixTime, date, time } = (0, exports.getTimeObject)();
    return {
        updatedAt: unixTime,
        updatedDate: date,
        updatedTime: time,
    };
};
exports.getUpdatedTimeObject = getUpdatedTimeObject;
const getCreatedTimeObject = () => {
    const { unixTime, date, time } = (0, exports.getTimeObject)();
    return {
        createdAt: unixTime,
        createdDate: date,
        createdTime: time,
    };
};
exports.getCreatedTimeObject = getCreatedTimeObject;
//# sourceMappingURL=time-objects.js.map