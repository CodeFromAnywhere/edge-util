"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatesArray = void 0;
const getCurrentDate_js_1 = require("./getCurrentDate.js");
/**
 * Get dates array between two dates
 */
const getDatesArray = function (startDate, untilDate) {
    const datesArray = [];
    for (let dt = new Date(startDate); dt <= new Date(untilDate); dt.setDate(dt.getDate() + 1)) {
        datesArray.push((0, getCurrentDate_js_1.getCurrentDate)(dt));
    }
    return datesArray;
};
exports.getDatesArray = getDatesArray;
//# sourceMappingURL=getDatesArray.js.map