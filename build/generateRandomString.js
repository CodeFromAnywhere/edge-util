"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = exports.generateId = exports.generateRandomString = void 0;
var generateRandomString = function (length) {
    var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var characterArray = "x".repeat(length).split("");
    var string = characterArray
        .map(function () {
        var randomIndex = Math.floor(Math.random() * characters.length); //0-63 --> index for above
        var character = characters.charAt(randomIndex);
        return character;
    })
        .join("");
    return string;
};
exports.generateRandomString = generateRandomString;
/**
 * 24 characters of the alphabet provides 9E33 combinations, wont be possible to brute-force in centuries, even if there are billions of entries
 */
var generateId = function () {
    return (0, exports.generateRandomString)(24).toLowerCase();
};
exports.generateId = generateId;
/**
 * generates a password. By default, uses a length of 14
 */
var generatePassword = function (passwordLength) {
    if (passwordLength === void 0) { passwordLength = 14; }
    return (0, exports.generateRandomString)(passwordLength);
};
exports.generatePassword = generatePassword;
//# sourceMappingURL=generateRandomString.js.map