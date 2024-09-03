"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withoutSubExtensions = void 0;
var index_js_1 = require("../filename-conventions/index.js");
var js_js_1 = require("./js.js");
/**
 * NB: filename must have extension!
 *
 * Removes all KNOWN subextensions from the filename (if any) including main extension. Only conventionalised sub-extensions will be removed. The thing behind the last dot (extension) will always be removed.
 *
 * if `allowAllSubextensions` is true, only returns everything before the first dot (.)
 */
var withoutSubExtensions = function (
/**
 * filename including extension
 */
fileName, config) {
    var allowAllSubextensions = config === null || config === void 0 ? void 0 : config.allowAllSubextensions;
    var pieces = (0, js_js_1.withoutExtension)(fileName).split(".");
    if (allowAllSubextensions) {
        return pieces[0];
    }
    // only conventioned
    var isNotAllowedSubExtension = false;
    var reversePiecesAllowed = pieces
        .reverse()
        .reduce(function (previous, current, currentIndex) {
        if (!index_js_1.possibleSubExtensions.includes(current)) {
            isNotAllowedSubExtension = true;
        }
        if (isNotAllowedSubExtension) {
            previous.push(current);
        }
        return previous;
    }, []);
    var newName = reversePiecesAllowed.reverse().join(".");
    //  .concat(`.${getExtension(fileName)}`);
    return newName;
};
exports.withoutSubExtensions = withoutSubExtensions;
//# sourceMappingURL=withoutSubExtensions.js.map