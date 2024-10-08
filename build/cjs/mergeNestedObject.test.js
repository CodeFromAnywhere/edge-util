"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mergeNestedObject_js_1 = require("./mergeNestedObject.js");
const mergeNestedObjectTest = () => {
    const testObject = {
        a: "lol",
        b: 8,
        c: { x: "lol", y: 88, z: { a: "wow", b: 888, c: { x: "wow" } } },
    };
    const result = (0, mergeNestedObject_js_1.mergeNestedObject)(testObject, {
        c: { z: { c: { x: undefined }, b: 999 } },
    });
    console.dir({ testObject, result }, { depth: 999 });
};
mergeNestedObjectTest();
//# sourceMappingURL=mergeNestedObject.test.js.map