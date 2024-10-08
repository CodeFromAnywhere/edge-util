"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datasetConfigKeys = exports.modelViews = exports.datasetConfig = exports.datasetFilterOperatorConst = void 0;
/**
 * NB: keys are made `humanCase` and used in UI, so keep a readable name
 */
exports.datasetFilterOperatorConst = [
    "includesLetters",
    "includes",
    "startsWith",
    "endsWith",
    "equal",
    "notEqual",
    "greaterThan",
    "greaterThanOrEqual",
    "lessThan",
    "lessThanOrEqual",
];
exports.datasetConfig = {
    storageLocation: `memory/datasets.json`,
    modelName: "Dataset",
    authorizations: { cfa: "crud" },
};
exports.modelViews = [
    {
        view: "table",
        emoji: "🍴",
    },
    { view: "grid", emoji: "⚃" },
    {
        view: "timeline",
        emoji: "⏳",
    },
    { view: "tree", emoji: "🌳" },
];
exports.datasetConfigKeys = [
    "filter",
    "sort",
    "maxRows",
    "startFromIndex",
    "objectParameterKeys",
    "ignoreObjectParameterKeys",
    "view",
];
//# sourceMappingURL=Dataset.js.map