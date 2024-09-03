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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPromisedMappedKeysObject = exports.createMappedKeysObject = exports.createMappedObject = void 0;
var mergeObjectsArray_js_1 = require("./mergeObjectsArray.js");
/**
 * Creates a `MappedObject` of an array of any type. `MappedObject`s are great for increasing efficiency to get an item from an array. Especially useful when finds are needed on a specific key match for huge arrays. Instead of finding on the array you can simply get the right property from this object.
 *
 * NB: Don't use this inside of render functions, it's a very slow function, the whole idea is that this makes it faster, so just do it once!
 */
var createMappedObject = function (array, 
/**
 Key to make the map from. Must be unique or it could be overwritten. Key must be a string
 */
mapKey, 
/**
 * If the result of the mapped object, based on the object should have mapped values, provide this mapfunction to get them.
 */
mapFn) {
    var mappedObject = (0, mergeObjectsArray_js_1.mergeObjectsArray)(array.map(function (item) {
        var _a;
        var key = item[mapKey];
        var value = mapFn ? mapFn(item, array) : item;
        return _a = {},
            _a[key] = value,
            _a;
    }));
    return mappedObject;
};
exports.createMappedObject = createMappedObject;
/**
 * Simpler mapped object creator that I need quite often!
 */
var createMappedKeysObject = function (keys, map) {
    var result = (0, mergeObjectsArray_js_1.mergeObjectsArray)(keys.map(function (key) {
        var _a;
        return (_a = {}, _a[key] = map(key), _a);
    }));
    return result;
};
exports.createMappedKeysObject = createMappedKeysObject;
/**
 * Simpler mapped object creator that I need quite often!
 */
var createPromisedMappedKeysObject = function (keys, map) { return __awaiter(void 0, void 0, void 0, function () {
    var result, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = mergeObjectsArray_js_1.mergeObjectsArray;
                return [4 /*yield*/, Promise.all(keys.map(function (key) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        var _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _b = {};
                                    _a = key;
                                    return [4 /*yield*/, map(key)];
                                case 1: return [2 /*return*/, (_b[_a] = _c.sent(), _b)];
                            }
                        });
                    }); }))];
            case 1:
                result = _a.apply(void 0, [_b.sent()]);
                return [2 /*return*/, result];
        }
    });
}); };
exports.createPromisedMappedKeysObject = createPromisedMappedKeysObject;
//# sourceMappingURL=createMappedObject.js.map