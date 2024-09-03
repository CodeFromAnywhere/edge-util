"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var findNextId_js_1 = require("./findNextId.js");
//[ 122, 122, 122, 65, 122, 122, 122 ] ==> [ 122, 122, 122, 66 ]
//[ 122, 122, 122, 122, 122, 122 ] ==> [ 122, 122, 122, 122, 122, 122, 48 ]
// [48, 48, 48, 48, 48, 48]
//   console.log({ charCodes, newCharcodes, newId });
// findNextId(["a", "def", "z", "zzzAzzz", "b", "c", "cc", "zzzB", "zomba"]);
// a, b, c, d ==> e f
// aaaaaa, aaaaab, aaaac, aaaad, z, ==> za, ===> zaa/zb?
// console.log(findNextId("10001"));
var test = function () {
    var arr = new Array(10000).fill(0).map(function (x, i) { return i; });
    arr.reduce(function (previous, current) {
        var n = (0, findNextId_js_1.findNextId)(previous);
        console.log(n);
        return n;
    }, "0");
};
test();
//# sourceMappingURL=findNextId.test.js.map