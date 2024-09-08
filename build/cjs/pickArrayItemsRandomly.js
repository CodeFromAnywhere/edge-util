"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickArrayItemsRandomly = exports.shuffleNumbers = void 0;
const shuffleNumbers = (numbers) => numbers.sort(() => {
    return Math.random() - 0.5;
});
exports.shuffleNumbers = shuffleNumbers;
const pickArrayItemsRandomly = (list, amount) => {
    if (list.length <= amount) {
        return list;
    }
    const indexes = list.map((_, index) => index);
    const shuffled = (0, exports.shuffleNumbers)(indexes);
    const indexesToPick = shuffled.slice(0, amount);
    const newList = indexesToPick.map((index) => list[index]);
    return newList;
};
exports.pickArrayItemsRandomly = pickArrayItemsRandomly;
//# sourceMappingURL=pickArrayItemsRandomly.js.map