"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withoutSubExtensions = void 0;
const index_js_1 = require("../filename-conventions/index.js");
const js_js_1 = require("./js.js");
/**
 * NB: filename must have extension!
 *
 * Removes all KNOWN subextensions from the filename (if any) including main extension. Only conventionalised sub-extensions will be removed. The thing behind the last dot (extension) will always be removed.
 *
 * if `allowAllSubextensions` is true, only returns everything before the first dot (.)
 */
const withoutSubExtensions = (
/**
 * filename including extension
 */
fileName, config) => {
    const allowAllSubextensions = config === null || config === void 0 ? void 0 : config.allowAllSubextensions;
    const pieces = (0, js_js_1.withoutExtension)(fileName).split(".");
    if (allowAllSubextensions) {
        return pieces[0];
    }
    // only conventioned
    let isNotAllowedSubExtension = false;
    const reversePiecesAllowed = pieces
        .reverse()
        .reduce((previous, current, currentIndex) => {
        if (!index_js_1.possibleSubExtensions.includes(current)) {
            isNotAllowedSubExtension = true;
        }
        if (isNotAllowedSubExtension) {
            previous.push(current);
        }
        return previous;
    }, []);
    const newName = reversePiecesAllowed.reverse().join(".");
    //  .concat(`.${getExtension(fileName)}`);
    return newName;
};
exports.withoutSubExtensions = withoutSubExtensions;
//# sourceMappingURL=withoutSubExtensions.js.map