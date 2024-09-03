"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPhoneNumber = void 0;
var isPhoneNumber = function (phoneNumber) {
    var _a;
    var match = (_a = phoneNumber.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)) === null || _a === void 0 ? void 0 : _a[0];
    return !!match;
};
exports.isPhoneNumber = isPhoneNumber;
//# sourceMappingURL=isPhoneNumber.js.map