"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitObject = void 0;
const splitObject = (object, secondObjectKeys) => {
    const initialValue = [object, {}];
    const newObject = secondObjectKeys.reduce((previous, key) => {
        const [primary, secondary] = previous;
        const newPrimary = {
            ...primary,
            [key]: undefined,
        };
        delete newPrimary[key];
        const newSecondary = {
            ...secondary,
            [key]: primary[key],
        };
        return [newPrimary, newSecondary];
    }, initialValue);
    return newObject;
};
exports.splitObject = splitObject;
//# sourceMappingURL=splitObject.js.map