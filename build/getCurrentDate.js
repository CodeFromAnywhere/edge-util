"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDate = void 0;
/**
 * Gets date string in format yyyy-mm-dd
 *
 * Provide a date object if you want another date than today
 */
var getCurrentDate = function (date) {
    if (date === void 0) { date = new Date(); }
    var month = date.getMonth() + 1;
    var monthString = month < 10 ? "0".concat(month) : month;
    var dateDay = date.getDate();
    var dateDayString = dateDay < 10 ? "0".concat(dateDay) : dateDay;
    var currentDate = "".concat(date.getFullYear(), "-").concat(monthString, "-").concat(dateDayString);
    return currentDate;
};
exports.getCurrentDate = getCurrentDate;
//# sourceMappingURL=getCurrentDate.js.map