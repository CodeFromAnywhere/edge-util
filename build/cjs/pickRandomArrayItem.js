"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickRandomArrayItem = void 0;
const pickRandomArrayItem = (array) => {
    return array[Math.floor((array.length - 1) * Math.random())];
};
exports.pickRandomArrayItem = pickRandomArrayItem;
//# sourceMappingURL=pickRandomArrayItem.js.map