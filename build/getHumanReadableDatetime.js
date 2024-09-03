"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHumanReadableDatetime = void 0;
/**
 * gets a datetime for a ux with little room, a la whatsapp messages.
 */
var getHumanReadableDatetime = function (unixTime) {
    if (unixTime === 0) {
        return "";
    }
    var dateObject = new Date(unixTime);
    var nowDate = new Date(Date.now());
    var yesterdayDate = new Date(Date.now() - 86400000);
    var msAgo = Date.now() - unixTime;
    var isToday = msAgo < 86400000 && nowDate.getDate() === dateObject.getDate();
    var isYesterday = msAgo < 86400000 * 2 && yesterdayDate.getDate() === dateObject.getDate();
    var isThisWeek = msAgo < 86400000 * 7;
    if (isToday) {
        // NB: if it's today, just show the time
        var hours = dateObject.getHours();
        var hoursString = hours < 10 ? "0".concat(hours) : hours;
        var minutes = dateObject.getMinutes();
        var minutesString = minutes < 10 ? "0".concat(minutes) : minutes;
        return "".concat(hoursString, ":").concat(minutesString);
    }
    if (isYesterday) {
        return "Yesterday";
    }
    if (isThisWeek) {
        return [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ][dateObject.getDay()];
    }
    var month = dateObject.getMonth() + 1;
    var monthString = month < 10 ? "0".concat(month) : month;
    var date = dateObject.getDate();
    var dateString = date < 10 ? "0".concat(date) : date;
    return "".concat(dateString, "/").concat(monthString, "/").concat(dateObject.getFullYear());
};
exports.getHumanReadableDatetime = getHumanReadableDatetime;
//# sourceMappingURL=getHumanReadableDatetime.js.map