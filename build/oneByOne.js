#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneByOne = void 0;
/**
 * for every item in an array, executes an async callback, one by one.
 * promises an array of the results of every callback once it's done
 */
var oneByOne = function (array, callback, timeBetweenCallbacksMs) { return __awaiter(void 0, void 0, void 0, function () {
    var getResults, result, realResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                getResults = function (results, instance, index, array) { return __awaiter(void 0, void 0, void 0, function () {
                    var awaitedResults, result, _a, newResults;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, results];
                            case 1:
                                awaitedResults = _b.sent();
                                if (!timeBetweenCallbacksMs) return [3 /*break*/, 2];
                                _a = callback(instance, index, awaitedResults);
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, callback(instance, index, awaitedResults)];
                            case 3:
                                _a = (_b.sent());
                                _b.label = 4;
                            case 4:
                                result = _a;
                                if (!timeBetweenCallbacksMs) return [3 /*break*/, 6];
                                return [4 /*yield*/, new Promise(function (resolve) {
                                        return setTimeout(function () { return resolve(); }, timeBetweenCallbacksMs);
                                    })];
                            case 5:
                                _b.sent();
                                _b.label = 6;
                            case 6:
                                newResults = __spreadArray(__spreadArray([], __read(awaitedResults), false), [result], false);
                                return [2 /*return*/, newResults];
                        }
                    });
                }); };
                return [4 /*yield*/, array.reduce(getResults, new Promise(function (resolve) { return resolve([]); }))];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, Promise.all(result)];
            case 2:
                realResult = _a.sent();
                return [2 /*return*/, realResult];
        }
    });
}); };
exports.oneByOne = oneByOne;
//# sourceMappingURL=oneByOne.js.map