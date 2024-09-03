"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowerCaseArray = exports.humanCase = exports.capitalCase = exports.kebabCase = exports.snakeCase = exports.pascalCase = exports.camelCase = exports.convertCase = exports.capitaliseFirstLetter = exports.getDelimiter = void 0;
exports.slugify = slugify;
exports.fileSlugify = fileSlugify;
/**
 * this function does the same as kebabCase but it also does some more transformation on top
 *
 * useful for making simple URLs and filenames. Kebacase is not enough
 *
 * NB: this is no two way transformation. When slugifying something, information is lost and it cannot be converted back in the original name.
 *
 * TODO: make the tranformations that are done here into smaller util functions and make a clean function that can be ran before running every casing conversion (maybe in a config)
 */
function slugify(string) {
    var a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    var b = "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    var p = new RegExp(a.split("").join("|"), "g");
    return string
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(p, function (c) { return b.charAt(a.indexOf(c)); }) // Replace special characters
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
}
/**
 * Slugification for filepaths in specific
 */
function fileSlugify(string) {
    var a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·,:;";
    var b = "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz----";
    var p = new RegExp(a.split("").join("|"), "g");
    return (string
        .toString()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(p, function (c) { return b.charAt(a.indexOf(c)); }) // Replace special characters
        .replace(/&/g, "-and-") // Replace & with 'and'
        // .replace(/[^\w\-]+/g, "") // Remove all non-word characters
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, "")); // Trim - from end of text
}
/**
 * Besides normal delimiters, every capital letter also marks the start of a new word
 */
var splitCasingDelimiters = function (word) {
    var letters = word.split("");
    var allWords = letters.reduce(function (words, letter) {
        //get the last word, we know it's always defined because of the initial value of the reduce
        var lastWord = words.pop();
        //let's also get the last letter
        var lastLetter = lastWord.substring(-1);
        var lastLetterIsLowercase = lastLetter.toUpperCase() !== lastLetter;
        // NB: numbers or special characters are not uppercase in this logic, only letters change.
        var letterIsUppercase = letter.toLowerCase() !== letter;
        /**
         * If the last letter was lowercase and the next one is uppercase
         */
        var shouldCreateNewWord = lastLetterIsLowercase && letterIsUppercase;
        var newSequence = shouldCreateNewWord
            ? [lastWord, letter]
            : ["".concat(lastWord).concat(letter)];
        var newWords = words.concat(newSequence);
        return newWords;
    }, [""]);
    return allWords;
    // if it was lowercase but it became upper, it's a new word
};
var nonCasingDelimiters = /[\s,._-]+/; //space, comma, dot, underscore, dash
var getDelimiter = function (target) {
    if (target === "capital")
        return "_";
    if (target === "human")
        return " ";
    if (target === "kebab")
        return "-";
    if (target === "snake")
        return "_";
    return "";
};
exports.getDelimiter = getDelimiter;
var capitaliseFirstLetter = function (word) {
    return word.charAt(0).toUpperCase().concat(word.substring(1));
};
exports.capitaliseFirstLetter = capitaliseFirstLetter;
var convertToTargetCasing = function (word, index, target) {
    if (target === "capital")
        return word.toUpperCase();
    if (target === "kebab" || target === "snake")
        return word.toLowerCase();
    if (target === "pascal")
        return (0, exports.capitaliseFirstLetter)(word);
    if (target === "camel")
        return index === 0 ? word.toLowerCase() : (0, exports.capitaliseFirstLetter)(word);
    //human case
    return index === 0 ? (0, exports.capitaliseFirstLetter)(word) : word.toLowerCase();
};
/**
 *
 */
var convertCase = function (
/**
 * NB: texts of more than a sentence are not supported
 */
text, target) {
    return text
        .split(nonCasingDelimiters)
        .reduce(function (all, word) { return all.concat(splitCasingDelimiters(word)); }, [])
        .map(function (word, index) { return convertToTargetCasing(word, index, target); })
        .join((0, exports.getDelimiter)(target));
};
exports.convertCase = convertCase;
var camelCase = function (text) { return (0, exports.convertCase)(text, "camel"); };
exports.camelCase = camelCase;
var pascalCase = function (text) { return (0, exports.convertCase)(text, "pascal"); };
exports.pascalCase = pascalCase;
var snakeCase = function (text) { return (0, exports.convertCase)(text, "snake"); };
exports.snakeCase = snakeCase;
var kebabCase = function (text) { return (0, exports.convertCase)(text, "kebab"); };
exports.kebabCase = kebabCase;
var capitalCase = function (text) { return (0, exports.convertCase)(text, "capital"); };
exports.capitalCase = capitalCase;
var humanCase = function (text) { return (0, exports.convertCase)(text, "human"); };
exports.humanCase = humanCase;
/**
 * converts any string to an array of lowercase words
 *
 * format ["word1","word2","word3"] from a string of any casing.
 */
var lowerCaseArray = function (text) {
    return (0, exports.kebabCase)(text).split("-");
};
exports.lowerCaseArray = lowerCaseArray;
//# sourceMappingURL=convert-case.js.map