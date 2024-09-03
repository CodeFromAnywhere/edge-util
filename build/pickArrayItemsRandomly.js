"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickArrayItemsRandomly = exports.shuffleNumbers = void 0;
var shuffleNumbers = function (numbers) {
    return numbers.sort(function () {
        return Math.random() - 0.5;
    });
};
exports.shuffleNumbers = shuffleNumbers;
var pickArrayItemsRandomly = function (list, amount) {
    if (list.length <= amount) {
        return list;
    }
    var indexes = list.map(function (_, index) { return index; });
    var shuffled = (0, exports.shuffleNumbers)(indexes);
    var indexesToPick = shuffled.slice(0, amount);
    var newList = indexesToPick.map(function (index) { return list[index]; });
    return newList;
};
exports.pickArrayItemsRandomly = pickArrayItemsRandomly;
//# sourceMappingURL=pickArrayItemsRandomly.js.map