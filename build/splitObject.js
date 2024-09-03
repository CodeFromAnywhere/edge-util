"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitObject = void 0;
var splitObject = function (object, secondObjectKeys) {
    var initialValue = [object, {}];
    var newObject = secondObjectKeys.reduce(function (previous, key) {
        var _a, _b;
        var _c = __read(previous, 2), primary = _c[0], secondary = _c[1];
        var newPrimary = __assign(__assign({}, primary), (_a = {}, _a[key] = undefined, _a));
        delete newPrimary[key];
        var newSecondary = __assign(__assign({}, secondary), (_b = {}, _b[key] = primary[key], _b));
        return [newPrimary, newSecondary];
    }, initialValue);
    return newObject;
};
exports.splitObject = splitObject;
//# sourceMappingURL=splitObject.js.map