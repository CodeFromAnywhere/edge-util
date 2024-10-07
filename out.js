"use strict";
(() => {
  // build/esm/array-modifications.js
  var insertAt = (array, items, beforeIndex) => {
    const itemsArray = Array.isArray(items) ? items : [items];
    const before = array.slice(0, beforeIndex);
    const after = array.slice(beforeIndex);
    return [...before, ...itemsArray, ...after];
  };
  var removeIndexFromArray = (array, index) => {
    const before = array.slice(0, index);
    const after = array.slice(index + 1);
    return [...before, ...after];
  };
  var findLastIndex = (array, findFn) => {
    var _a;
    const lastIndex = (_a = array.map((item, index) => ({ item, index })).filter(({ item }) => findFn(item)).pop()) === null || _a === void 0 ? void 0 : _a.index;
    return lastIndex;
  };
  var putIndexAtIndex = (array, index, toIndex) => {
    const item = array[index];
    const arrayWithoutIndex = removeIndexFromArray(array, index);
    const changedArray = insertAt(arrayWithoutIndex, item, toIndex);
    return changedArray;
  };

  // build/esm/byteCount.js
  var byteCount = (s) => {
    return encodeURI(s).split(/%..|./).length - 1;
  };

  // build/esm/mergeObjectsArray.js
  var mergeObjectsArray = (objectsArray) => {
    const result = objectsArray.reduce((previous, current) => {
      return { ...previous, ...current };
    }, {});
    return result;
  };

  // build/esm/createMappedObject.js
  var createMappedObject = (array, mapKey, mapFn) => {
    const mappedObject = mergeObjectsArray(array.map((item) => {
      const key = item[mapKey];
      const value = mapFn ? mapFn(item, array) : item;
      return {
        [key]: value
      };
    }));
    return mappedObject;
  };
  var createMappedKeysObject = (keys, map2) => {
    const result = mergeObjectsArray(keys.map((key) => ({ [key]: map2(key) })));
    return result;
  };
  var createPromisedMappedKeysObject = async (keys, map2) => {
    const result = mergeObjectsArray(await Promise.all(keys.map(async (key) => ({ [key]: await map2(key) }))));
    return result;
  };

  // build/esm/destructureOptionalObject.js
  var destructureOptionalObject = (object) => {
    if (!object)
      return {};
    return object;
  };

  // build/esm/oneByOne.js
  var oneByOne = async (array, callback, timeBetweenCallbacksMs) => {
    const getResults = async (results, instance, index, array2) => {
      const awaitedResults = await results;
      const result2 = timeBetweenCallbacksMs ? callback(instance, index, awaitedResults) : await callback(instance, index, awaitedResults);
      if (timeBetweenCallbacksMs) {
        await new Promise((resolve) => setTimeout(() => resolve(), timeBetweenCallbacksMs));
      }
      const newResults = [...awaitedResults, result2];
      return newResults;
    };
    const result = await array.reduce(getResults, new Promise((resolve) => resolve([])));
    const realResult = await Promise.all(result);
    return realResult;
  };

  // build/esm/convert-case.js
  function slugify(string) {
    const a = "\xE0\xE1\xE2\xE4\xE6\xE3\xE5\u0101\u0103\u0105\xE7\u0107\u010D\u0111\u010F\xE8\xE9\xEA\xEB\u0113\u0117\u0119\u011B\u011F\u01F5\u1E27\xEE\xEF\xED\u012B\u012F\xEC\u0131\u0130\u0142\u1E3F\xF1\u0144\u01F9\u0148\xF4\xF6\xF2\xF3\u0153\xF8\u014D\xF5\u0151\u1E55\u0155\u0159\xDF\u015B\u0161\u015F\u0219\u0165\u021B\xFB\xFC\xF9\xFA\u016B\u01D8\u016F\u0171\u0173\u1E83\u1E8D\xFF\xFD\u017E\u017A\u017C\xB7/_,:;";
    const b = "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");
    return string.toString().toLowerCase().replace(/\s+/g, "-").replace(p, (c) => b.charAt(a.indexOf(c))).replace(/&/g, "-and-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
  }
  function fileSlugify(string) {
    const a = "\xE0\xE1\xE2\xE4\xE6\xE3\xE5\u0101\u0103\u0105\xE7\u0107\u010D\u0111\u010F\xE8\xE9\xEA\xEB\u0113\u0117\u0119\u011B\u011F\u01F5\u1E27\xEE\xEF\xED\u012B\u012F\xEC\u0131\u0130\u0142\u1E3F\xF1\u0144\u01F9\u0148\xF4\xF6\xF2\xF3\u0153\xF8\u014D\xF5\u0151\u1E55\u0155\u0159\xDF\u015B\u0161\u015F\u0219\u0165\u021B\xFB\xFC\xF9\xFA\u016B\u01D8\u016F\u0171\u0173\u1E83\u1E8D\xFF\xFD\u017E\u017A\u017C\xB7,:;";
    const b = "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz----";
    const p = new RegExp(a.split("").join("|"), "g");
    return string.toString().replace(/\s+/g, "-").replace(p, (c) => b.charAt(a.indexOf(c))).replace(/&/g, "-and-").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
  }
  var splitCasingDelimiters = (word) => {
    const letters = word.split("");
    const allWords = letters.reduce((words, letter) => {
      const lastWord = words.pop();
      const lastLetter = lastWord.substring(-1);
      const lastLetterIsLowercase = lastLetter.toUpperCase() !== lastLetter;
      const letterIsUppercase = letter.toLowerCase() !== letter;
      const shouldCreateNewWord = lastLetterIsLowercase && letterIsUppercase;
      const newSequence = shouldCreateNewWord ? [lastWord, letter] : [`${lastWord}${letter}`];
      const newWords = words.concat(newSequence);
      return newWords;
    }, [""]);
    return allWords;
  };
  var nonCasingDelimiters = /[\s,._-]+/;
  var getDelimiter = (target) => {
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
  var capitaliseFirstLetter = (word) => {
    return word.charAt(0).toUpperCase().concat(word.substring(1));
  };
  var convertToTargetCasing = (word, index, target) => {
    if (target === "capital")
      return word.toUpperCase();
    if (target === "kebab" || target === "snake")
      return word.toLowerCase();
    if (target === "pascal")
      return capitaliseFirstLetter(word);
    if (target === "camel")
      return index === 0 ? word.toLowerCase() : capitaliseFirstLetter(word);
    return index === 0 ? capitaliseFirstLetter(word) : word.toLowerCase();
  };
  var convertCase = (text, target) => text.split(nonCasingDelimiters).reduce((all, word) => all.concat(splitCasingDelimiters(word)), []).map((word, index) => convertToTargetCasing(word, index, target)).join(getDelimiter(target));
  var camelCase = (text) => convertCase(text, "camel");
  var pascalCase = (text) => convertCase(text, "pascal");
  var snakeCase = (text) => convertCase(text, "snake");
  var kebabCase = (text) => convertCase(text, "kebab");
  var capitalCase = (text) => convertCase(text, "capital");
  var humanCase = (text) => convertCase(text, "human");
  var lowerCaseArray = (text) => {
    return kebabCase(text).split("-");
  };

  // build/esm/earthDistance.js
  function earthDistance(lat1, long1, lat2, long2, response) {
    const m = Math.PI / 180;
    lat1 = lat1 * m;
    long1 = long1 * m;
    lat2 = lat2 * m;
    long2 = long2 * m;
    var R = 6371e3;
    var x = (long2 - long1) * Math.cos((lat1 + lat2) / 2);
    var y = lat2 - lat1;
    var d = Math.sqrt(x * x + y * y) * R;
    return response === "m" ? Math.round(d / 10) * 10 : Math.round(d / 1e3);
  }

  // build/esm/tryParseJson.js
  var removeCommentsRegex = /\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g;
  var tryParseJson = (text, logParseError) => {
    try {
      const jsonStringWithoutComments = text.replace(removeCommentsRegex, (m, g) => g ? "" : m);
      return JSON.parse(jsonStringWithoutComments);
    } catch (parseError) {
      if (logParseError)
        console.log("JSON Parse error:", parseError);
      return null;
    }
  };

  // node_modules/js-yaml/dist/js-yaml.mjs
  function isNothing(subject) {
    return typeof subject === "undefined" || subject === null;
  }
  function isObject(subject) {
    return typeof subject === "object" && subject !== null;
  }
  function toArray(sequence) {
    if (Array.isArray(sequence)) return sequence;
    else if (isNothing(sequence)) return [];
    return [sequence];
  }
  function extend(target, source) {
    var index, length, key, sourceKeys;
    if (source) {
      sourceKeys = Object.keys(source);
      for (index = 0, length = sourceKeys.length; index < length; index += 1) {
        key = sourceKeys[index];
        target[key] = source[key];
      }
    }
    return target;
  }
  function repeat(string, count) {
    var result = "", cycle;
    for (cycle = 0; cycle < count; cycle += 1) {
      result += string;
    }
    return result;
  }
  function isNegativeZero(number) {
    return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
  }
  var isNothing_1 = isNothing;
  var isObject_1 = isObject;
  var toArray_1 = toArray;
  var repeat_1 = repeat;
  var isNegativeZero_1 = isNegativeZero;
  var extend_1 = extend;
  var common = {
    isNothing: isNothing_1,
    isObject: isObject_1,
    toArray: toArray_1,
    repeat: repeat_1,
    isNegativeZero: isNegativeZero_1,
    extend: extend_1
  };
  function formatError(exception2, compact) {
    var where = "", message = exception2.reason || "(unknown reason)";
    if (!exception2.mark) return message;
    if (exception2.mark.name) {
      where += 'in "' + exception2.mark.name + '" ';
    }
    where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
    if (!compact && exception2.mark.snippet) {
      where += "\n\n" + exception2.mark.snippet;
    }
    return message + " " + where;
  }
  function YAMLException$1(reason, mark) {
    Error.call(this);
    this.name = "YAMLException";
    this.reason = reason;
    this.mark = mark;
    this.message = formatError(this, false);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack || "";
    }
  }
  YAMLException$1.prototype = Object.create(Error.prototype);
  YAMLException$1.prototype.constructor = YAMLException$1;
  YAMLException$1.prototype.toString = function toString(compact) {
    return this.name + ": " + formatError(this, compact);
  };
  var exception = YAMLException$1;
  function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
    var head = "";
    var tail = "";
    var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
    if (position - lineStart > maxHalfLength) {
      head = " ... ";
      lineStart = position - maxHalfLength + head.length;
    }
    if (lineEnd - position > maxHalfLength) {
      tail = " ...";
      lineEnd = position + maxHalfLength - tail.length;
    }
    return {
      str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "\u2192") + tail,
      pos: position - lineStart + head.length
      // relative position
    };
  }
  function padStart(string, max) {
    return common.repeat(" ", max - string.length) + string;
  }
  function makeSnippet(mark, options) {
    options = Object.create(options || null);
    if (!mark.buffer) return null;
    if (!options.maxLength) options.maxLength = 79;
    if (typeof options.indent !== "number") options.indent = 1;
    if (typeof options.linesBefore !== "number") options.linesBefore = 3;
    if (typeof options.linesAfter !== "number") options.linesAfter = 2;
    var re = /\r?\n|\r|\0/g;
    var lineStarts = [0];
    var lineEnds = [];
    var match;
    var foundLineNo = -1;
    while (match = re.exec(mark.buffer)) {
      lineEnds.push(match.index);
      lineStarts.push(match.index + match[0].length);
      if (mark.position <= match.index && foundLineNo < 0) {
        foundLineNo = lineStarts.length - 2;
      }
    }
    if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
    var result = "", i, line;
    var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
    var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
    for (i = 1; i <= options.linesBefore; i++) {
      if (foundLineNo - i < 0) break;
      line = getLine(
        mark.buffer,
        lineStarts[foundLineNo - i],
        lineEnds[foundLineNo - i],
        mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
        maxLineLength
      );
      result = common.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
    }
    line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
    result += common.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    result += common.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
    for (i = 1; i <= options.linesAfter; i++) {
      if (foundLineNo + i >= lineEnds.length) break;
      line = getLine(
        mark.buffer,
        lineStarts[foundLineNo + i],
        lineEnds[foundLineNo + i],
        mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
        maxLineLength
      );
      result += common.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    }
    return result.replace(/\n$/, "");
  }
  var snippet = makeSnippet;
  var TYPE_CONSTRUCTOR_OPTIONS = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
  ];
  var YAML_NODE_KINDS = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function compileStyleAliases(map2) {
    var result = {};
    if (map2 !== null) {
      Object.keys(map2).forEach(function(style) {
        map2[style].forEach(function(alias) {
          result[String(alias)] = style;
        });
      });
    }
    return result;
  }
  function Type$1(tag, options) {
    options = options || {};
    Object.keys(options).forEach(function(name) {
      if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
        throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
      }
    });
    this.options = options;
    this.tag = tag;
    this.kind = options["kind"] || null;
    this.resolve = options["resolve"] || function() {
      return true;
    };
    this.construct = options["construct"] || function(data) {
      return data;
    };
    this.instanceOf = options["instanceOf"] || null;
    this.predicate = options["predicate"] || null;
    this.represent = options["represent"] || null;
    this.representName = options["representName"] || null;
    this.defaultStyle = options["defaultStyle"] || null;
    this.multi = options["multi"] || false;
    this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
    if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
      throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
    }
  }
  var type = Type$1;
  function compileList(schema2, name) {
    var result = [];
    schema2[name].forEach(function(currentType) {
      var newIndex = result.length;
      result.forEach(function(previousType, previousIndex) {
        if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
          newIndex = previousIndex;
        }
      });
      result[newIndex] = currentType;
    });
    return result;
  }
  function compileMap() {
    var result = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {},
      multi: {
        scalar: [],
        sequence: [],
        mapping: [],
        fallback: []
      }
    }, index, length;
    function collectType(type2) {
      if (type2.multi) {
        result.multi[type2.kind].push(type2);
        result.multi["fallback"].push(type2);
      } else {
        result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
      }
    }
    for (index = 0, length = arguments.length; index < length; index += 1) {
      arguments[index].forEach(collectType);
    }
    return result;
  }
  function Schema$1(definition) {
    return this.extend(definition);
  }
  Schema$1.prototype.extend = function extend2(definition) {
    var implicit = [];
    var explicit = [];
    if (definition instanceof type) {
      explicit.push(definition);
    } else if (Array.isArray(definition)) {
      explicit = explicit.concat(definition);
    } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
      if (definition.implicit) implicit = implicit.concat(definition.implicit);
      if (definition.explicit) explicit = explicit.concat(definition.explicit);
    } else {
      throw new exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    }
    implicit.forEach(function(type$1) {
      if (!(type$1 instanceof type)) {
        throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
      if (type$1.loadKind && type$1.loadKind !== "scalar") {
        throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      }
      if (type$1.multi) {
        throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
      }
    });
    explicit.forEach(function(type$1) {
      if (!(type$1 instanceof type)) {
        throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
    });
    var result = Object.create(Schema$1.prototype);
    result.implicit = (this.implicit || []).concat(implicit);
    result.explicit = (this.explicit || []).concat(explicit);
    result.compiledImplicit = compileList(result, "implicit");
    result.compiledExplicit = compileList(result, "explicit");
    result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
    return result;
  };
  var schema = Schema$1;
  var str = new type("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(data) {
      return data !== null ? data : "";
    }
  });
  var seq = new type("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(data) {
      return data !== null ? data : [];
    }
  });
  var map = new type("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(data) {
      return data !== null ? data : {};
    }
  });
  var failsafe = new schema({
    explicit: [
      str,
      seq,
      map
    ]
  });
  function resolveYamlNull(data) {
    if (data === null) return true;
    var max = data.length;
    return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
  }
  function constructYamlNull() {
    return null;
  }
  function isNull(object) {
    return object === null;
  }
  var _null = new type("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: resolveYamlNull,
    construct: constructYamlNull,
    predicate: isNull,
    represent: {
      canonical: function() {
        return "~";
      },
      lowercase: function() {
        return "null";
      },
      uppercase: function() {
        return "NULL";
      },
      camelcase: function() {
        return "Null";
      },
      empty: function() {
        return "";
      }
    },
    defaultStyle: "lowercase"
  });
  function resolveYamlBoolean(data) {
    if (data === null) return false;
    var max = data.length;
    return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
  }
  function constructYamlBoolean(data) {
    return data === "true" || data === "True" || data === "TRUE";
  }
  function isBoolean(object) {
    return Object.prototype.toString.call(object) === "[object Boolean]";
  }
  var bool = new type("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: resolveYamlBoolean,
    construct: constructYamlBoolean,
    predicate: isBoolean,
    represent: {
      lowercase: function(object) {
        return object ? "true" : "false";
      },
      uppercase: function(object) {
        return object ? "TRUE" : "FALSE";
      },
      camelcase: function(object) {
        return object ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  });
  function isHexCode(c) {
    return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
  }
  function isOctCode(c) {
    return 48 <= c && c <= 55;
  }
  function isDecCode(c) {
    return 48 <= c && c <= 57;
  }
  function resolveYamlInteger(data) {
    if (data === null) return false;
    var max = data.length, index = 0, hasDigits = false, ch;
    if (!max) return false;
    ch = data[index];
    if (ch === "-" || ch === "+") {
      ch = data[++index];
    }
    if (ch === "0") {
      if (index + 1 === max) return true;
      ch = data[++index];
      if (ch === "b") {
        index++;
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_") continue;
          if (ch !== "0" && ch !== "1") return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "x") {
        index++;
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_") continue;
          if (!isHexCode(data.charCodeAt(index))) return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "o") {
        index++;
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_") continue;
          if (!isOctCode(data.charCodeAt(index))) return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
    }
    if (ch === "_") return false;
    for (; index < max; index++) {
      ch = data[index];
      if (ch === "_") continue;
      if (!isDecCode(data.charCodeAt(index))) {
        return false;
      }
      hasDigits = true;
    }
    if (!hasDigits || ch === "_") return false;
    return true;
  }
  function constructYamlInteger(data) {
    var value = data, sign = 1, ch;
    if (value.indexOf("_") !== -1) {
      value = value.replace(/_/g, "");
    }
    ch = value[0];
    if (ch === "-" || ch === "+") {
      if (ch === "-") sign = -1;
      value = value.slice(1);
      ch = value[0];
    }
    if (value === "0") return 0;
    if (ch === "0") {
      if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
      if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
      if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
    }
    return sign * parseInt(value, 10);
  }
  function isInteger(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
  }
  var int = new type("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: resolveYamlInteger,
    construct: constructYamlInteger,
    predicate: isInteger,
    represent: {
      binary: function(obj) {
        return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
      },
      octal: function(obj) {
        return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
      },
      decimal: function(obj) {
        return obj.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(obj) {
        return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  });
  var YAML_FLOAT_PATTERN = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function resolveYamlFloat(data) {
    if (data === null) return false;
    if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    data[data.length - 1] === "_") {
      return false;
    }
    return true;
  }
  function constructYamlFloat(data) {
    var value, sign;
    value = data.replace(/_/g, "").toLowerCase();
    sign = value[0] === "-" ? -1 : 1;
    if ("+-".indexOf(value[0]) >= 0) {
      value = value.slice(1);
    }
    if (value === ".inf") {
      return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    } else if (value === ".nan") {
      return NaN;
    }
    return sign * parseFloat(value, 10);
  }
  var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
  function representYamlFloat(object, style) {
    var res;
    if (isNaN(object)) {
      switch (style) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    } else if (Number.POSITIVE_INFINITY === object) {
      switch (style) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    } else if (Number.NEGATIVE_INFINITY === object) {
      switch (style) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    } else if (common.isNegativeZero(object)) {
      return "-0.0";
    }
    res = object.toString(10);
    return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
  }
  function isFloat(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
  }
  var float = new type("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: resolveYamlFloat,
    construct: constructYamlFloat,
    predicate: isFloat,
    represent: representYamlFloat,
    defaultStyle: "lowercase"
  });
  var json = failsafe.extend({
    implicit: [
      _null,
      bool,
      int,
      float
    ]
  });
  var core = json;
  var YAML_DATE_REGEXP = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  );
  var YAML_TIMESTAMP_REGEXP = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function resolveYamlTimestamp(data) {
    if (data === null) return false;
    if (YAML_DATE_REGEXP.exec(data) !== null) return true;
    if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
    return false;
  }
  function constructYamlTimestamp(data) {
    var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
    match = YAML_DATE_REGEXP.exec(data);
    if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
    if (match === null) throw new Error("Date resolve error");
    year = +match[1];
    month = +match[2] - 1;
    day = +match[3];
    if (!match[4]) {
      return new Date(Date.UTC(year, month, day));
    }
    hour = +match[4];
    minute = +match[5];
    second = +match[6];
    if (match[7]) {
      fraction = match[7].slice(0, 3);
      while (fraction.length < 3) {
        fraction += "0";
      }
      fraction = +fraction;
    }
    if (match[9]) {
      tz_hour = +match[10];
      tz_minute = +(match[11] || 0);
      delta = (tz_hour * 60 + tz_minute) * 6e4;
      if (match[9] === "-") delta = -delta;
    }
    date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
    if (delta) date.setTime(date.getTime() - delta);
    return date;
  }
  function representYamlTimestamp(object) {
    return object.toISOString();
  }
  var timestamp = new type("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: resolveYamlTimestamp,
    construct: constructYamlTimestamp,
    instanceOf: Date,
    represent: representYamlTimestamp
  });
  function resolveYamlMerge(data) {
    return data === "<<" || data === null;
  }
  var merge = new type("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: resolveYamlMerge
  });
  var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
  function resolveYamlBinary(data) {
    if (data === null) return false;
    var code, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
    for (idx = 0; idx < max; idx++) {
      code = map2.indexOf(data.charAt(idx));
      if (code > 64) continue;
      if (code < 0) return false;
      bitlen += 6;
    }
    return bitlen % 8 === 0;
  }
  function constructYamlBinary(data) {
    var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
    for (idx = 0; idx < max; idx++) {
      if (idx % 4 === 0 && idx) {
        result.push(bits >> 16 & 255);
        result.push(bits >> 8 & 255);
        result.push(bits & 255);
      }
      bits = bits << 6 | map2.indexOf(input.charAt(idx));
    }
    tailbits = max % 4 * 6;
    if (tailbits === 0) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    } else if (tailbits === 18) {
      result.push(bits >> 10 & 255);
      result.push(bits >> 2 & 255);
    } else if (tailbits === 12) {
      result.push(bits >> 4 & 255);
    }
    return new Uint8Array(result);
  }
  function representYamlBinary(object) {
    var result = "", bits = 0, idx, tail, max = object.length, map2 = BASE64_MAP;
    for (idx = 0; idx < max; idx++) {
      if (idx % 3 === 0 && idx) {
        result += map2[bits >> 18 & 63];
        result += map2[bits >> 12 & 63];
        result += map2[bits >> 6 & 63];
        result += map2[bits & 63];
      }
      bits = (bits << 8) + object[idx];
    }
    tail = max % 3;
    if (tail === 0) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    } else if (tail === 2) {
      result += map2[bits >> 10 & 63];
      result += map2[bits >> 4 & 63];
      result += map2[bits << 2 & 63];
      result += map2[64];
    } else if (tail === 1) {
      result += map2[bits >> 2 & 63];
      result += map2[bits << 4 & 63];
      result += map2[64];
      result += map2[64];
    }
    return result;
  }
  function isBinary(obj) {
    return Object.prototype.toString.call(obj) === "[object Uint8Array]";
  }
  var binary = new type("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: resolveYamlBinary,
    construct: constructYamlBinary,
    predicate: isBinary,
    represent: representYamlBinary
  });
  var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
  var _toString$2 = Object.prototype.toString;
  function resolveYamlOmap(data) {
    if (data === null) return true;
    var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];
      pairHasKey = false;
      if (_toString$2.call(pair) !== "[object Object]") return false;
      for (pairKey in pair) {
        if (_hasOwnProperty$3.call(pair, pairKey)) {
          if (!pairHasKey) pairHasKey = true;
          else return false;
        }
      }
      if (!pairHasKey) return false;
      if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
      else return false;
    }
    return true;
  }
  function constructYamlOmap(data) {
    return data !== null ? data : [];
  }
  var omap = new type("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: resolveYamlOmap,
    construct: constructYamlOmap
  });
  var _toString$1 = Object.prototype.toString;
  function resolveYamlPairs(data) {
    if (data === null) return true;
    var index, length, pair, keys, result, object = data;
    result = new Array(object.length);
    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];
      if (_toString$1.call(pair) !== "[object Object]") return false;
      keys = Object.keys(pair);
      if (keys.length !== 1) return false;
      result[index] = [keys[0], pair[keys[0]]];
    }
    return true;
  }
  function constructYamlPairs(data) {
    if (data === null) return [];
    var index, length, pair, keys, result, object = data;
    result = new Array(object.length);
    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];
      keys = Object.keys(pair);
      result[index] = [keys[0], pair[keys[0]]];
    }
    return result;
  }
  var pairs = new type("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: resolveYamlPairs,
    construct: constructYamlPairs
  });
  var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
  function resolveYamlSet(data) {
    if (data === null) return true;
    var key, object = data;
    for (key in object) {
      if (_hasOwnProperty$2.call(object, key)) {
        if (object[key] !== null) return false;
      }
    }
    return true;
  }
  function constructYamlSet(data) {
    return data !== null ? data : {};
  }
  var set = new type("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: resolveYamlSet,
    construct: constructYamlSet
  });
  var _default = core.extend({
    implicit: [
      timestamp,
      merge
    ],
    explicit: [
      binary,
      omap,
      pairs,
      set
    ]
  });
  var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var CONTEXT_FLOW_IN = 1;
  var CONTEXT_FLOW_OUT = 2;
  var CONTEXT_BLOCK_IN = 3;
  var CONTEXT_BLOCK_OUT = 4;
  var CHOMPING_CLIP = 1;
  var CHOMPING_STRIP = 2;
  var CHOMPING_KEEP = 3;
  var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
  var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
  var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
  var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function _class(obj) {
    return Object.prototype.toString.call(obj);
  }
  function is_EOL(c) {
    return c === 10 || c === 13;
  }
  function is_WHITE_SPACE(c) {
    return c === 9 || c === 32;
  }
  function is_WS_OR_EOL(c) {
    return c === 9 || c === 32 || c === 10 || c === 13;
  }
  function is_FLOW_INDICATOR(c) {
    return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
  }
  function fromHexCode(c) {
    var lc;
    if (48 <= c && c <= 57) {
      return c - 48;
    }
    lc = c | 32;
    if (97 <= lc && lc <= 102) {
      return lc - 97 + 10;
    }
    return -1;
  }
  function escapedHexLen(c) {
    if (c === 120) {
      return 2;
    }
    if (c === 117) {
      return 4;
    }
    if (c === 85) {
      return 8;
    }
    return 0;
  }
  function fromDecimalCode(c) {
    if (48 <= c && c <= 57) {
      return c - 48;
    }
    return -1;
  }
  function simpleEscapeSequence(c) {
    return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
  }
  function charFromCodepoint(c) {
    if (c <= 65535) {
      return String.fromCharCode(c);
    }
    return String.fromCharCode(
      (c - 65536 >> 10) + 55296,
      (c - 65536 & 1023) + 56320
    );
  }
  var simpleEscapeCheck = new Array(256);
  var simpleEscapeMap = new Array(256);
  for (i = 0; i < 256; i++) {
    simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
    simpleEscapeMap[i] = simpleEscapeSequence(i);
  }
  var i;
  function State$1(input, options) {
    this.input = input;
    this.filename = options["filename"] || null;
    this.schema = options["schema"] || _default;
    this.onWarning = options["onWarning"] || null;
    this.legacy = options["legacy"] || false;
    this.json = options["json"] || false;
    this.listener = options["listener"] || null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.typeMap = this.schema.compiledTypeMap;
    this.length = input.length;
    this.position = 0;
    this.line = 0;
    this.lineStart = 0;
    this.lineIndent = 0;
    this.firstTabInLine = -1;
    this.documents = [];
  }
  function generateError(state, message) {
    var mark = {
      name: state.filename,
      buffer: state.input.slice(0, -1),
      // omit trailing \0
      position: state.position,
      line: state.line,
      column: state.position - state.lineStart
    };
    mark.snippet = snippet(mark);
    return new exception(message, mark);
  }
  function throwError(state, message) {
    throw generateError(state, message);
  }
  function throwWarning(state, message) {
    if (state.onWarning) {
      state.onWarning.call(null, generateError(state, message));
    }
  }
  var directiveHandlers = {
    YAML: function handleYamlDirective(state, name, args) {
      var match, major, minor;
      if (state.version !== null) {
        throwError(state, "duplication of %YAML directive");
      }
      if (args.length !== 1) {
        throwError(state, "YAML directive accepts exactly one argument");
      }
      match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
      if (match === null) {
        throwError(state, "ill-formed argument of the YAML directive");
      }
      major = parseInt(match[1], 10);
      minor = parseInt(match[2], 10);
      if (major !== 1) {
        throwError(state, "unacceptable YAML version of the document");
      }
      state.version = args[0];
      state.checkLineBreaks = minor < 2;
      if (minor !== 1 && minor !== 2) {
        throwWarning(state, "unsupported YAML version of the document");
      }
    },
    TAG: function handleTagDirective(state, name, args) {
      var handle, prefix;
      if (args.length !== 2) {
        throwError(state, "TAG directive accepts exactly two arguments");
      }
      handle = args[0];
      prefix = args[1];
      if (!PATTERN_TAG_HANDLE.test(handle)) {
        throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
      }
      if (_hasOwnProperty$1.call(state.tagMap, handle)) {
        throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
      }
      if (!PATTERN_TAG_URI.test(prefix)) {
        throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
      }
      try {
        prefix = decodeURIComponent(prefix);
      } catch (err) {
        throwError(state, "tag prefix is malformed: " + prefix);
      }
      state.tagMap[handle] = prefix;
    }
  };
  function captureSegment(state, start, end, checkJson) {
    var _position, _length, _character, _result;
    if (start < end) {
      _result = state.input.slice(start, end);
      if (checkJson) {
        for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
          _character = _result.charCodeAt(_position);
          if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
            throwError(state, "expected valid JSON character");
          }
        }
      } else if (PATTERN_NON_PRINTABLE.test(_result)) {
        throwError(state, "the stream contains non-printable characters");
      }
      state.result += _result;
    }
  }
  function mergeMappings(state, destination, source, overridableKeys) {
    var sourceKeys, key, index, quantity;
    if (!common.isObject(source)) {
      throwError(state, "cannot merge mappings; the provided source object is unacceptable");
    }
    sourceKeys = Object.keys(source);
    for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
      key = sourceKeys[index];
      if (!_hasOwnProperty$1.call(destination, key)) {
        destination[key] = source[key];
        overridableKeys[key] = true;
      }
    }
  }
  function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
    var index, quantity;
    if (Array.isArray(keyNode)) {
      keyNode = Array.prototype.slice.call(keyNode);
      for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
        if (Array.isArray(keyNode[index])) {
          throwError(state, "nested arrays are not supported inside keys");
        }
        if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
          keyNode[index] = "[object Object]";
        }
      }
    }
    if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
      keyNode = "[object Object]";
    }
    keyNode = String(keyNode);
    if (_result === null) {
      _result = {};
    }
    if (keyTag === "tag:yaml.org,2002:merge") {
      if (Array.isArray(valueNode)) {
        for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
          mergeMappings(state, _result, valueNode[index], overridableKeys);
        }
      } else {
        mergeMappings(state, _result, valueNode, overridableKeys);
      }
    } else {
      if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
        state.line = startLine || state.line;
        state.lineStart = startLineStart || state.lineStart;
        state.position = startPos || state.position;
        throwError(state, "duplicated mapping key");
      }
      if (keyNode === "__proto__") {
        Object.defineProperty(_result, keyNode, {
          configurable: true,
          enumerable: true,
          writable: true,
          value: valueNode
        });
      } else {
        _result[keyNode] = valueNode;
      }
      delete overridableKeys[keyNode];
    }
    return _result;
  }
  function readLineBreak(state) {
    var ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 10) {
      state.position++;
    } else if (ch === 13) {
      state.position++;
      if (state.input.charCodeAt(state.position) === 10) {
        state.position++;
      }
    } else {
      throwError(state, "a line break is expected");
    }
    state.line += 1;
    state.lineStart = state.position;
    state.firstTabInLine = -1;
  }
  function skipSeparationSpace(state, allowComments, checkIndent) {
    var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        if (ch === 9 && state.firstTabInLine === -1) {
          state.firstTabInLine = state.position;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      if (allowComments && ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 10 && ch !== 13 && ch !== 0);
      }
      if (is_EOL(ch)) {
        readLineBreak(state);
        ch = state.input.charCodeAt(state.position);
        lineBreaks++;
        state.lineIndent = 0;
        while (ch === 32) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
      } else {
        break;
      }
    }
    if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
      throwWarning(state, "deficient indentation");
    }
    return lineBreaks;
  }
  function testDocumentSeparator(state) {
    var _position = state.position, ch;
    ch = state.input.charCodeAt(_position);
    if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
      _position += 3;
      ch = state.input.charCodeAt(_position);
      if (ch === 0 || is_WS_OR_EOL(ch)) {
        return true;
      }
    }
    return false;
  }
  function writeFoldedLines(state, count) {
    if (count === 1) {
      state.result += " ";
    } else if (count > 1) {
      state.result += common.repeat("\n", count - 1);
    }
  }
  function readPlainScalar(state, nodeIndent, withinFlowCollection) {
    var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
    ch = state.input.charCodeAt(state.position);
    if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
      return false;
    }
    if (ch === 63 || ch === 45) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        return false;
      }
    }
    state.kind = "scalar";
    state.result = "";
    captureStart = captureEnd = state.position;
    hasPendingContent = false;
    while (ch !== 0) {
      if (ch === 58) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
          break;
        }
      } else if (ch === 35) {
        preceding = state.input.charCodeAt(state.position - 1);
        if (is_WS_OR_EOL(preceding)) {
          break;
        }
      } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
        break;
      } else if (is_EOL(ch)) {
        _line = state.line;
        _lineStart = state.lineStart;
        _lineIndent = state.lineIndent;
        skipSeparationSpace(state, false, -1);
        if (state.lineIndent >= nodeIndent) {
          hasPendingContent = true;
          ch = state.input.charCodeAt(state.position);
          continue;
        } else {
          state.position = captureEnd;
          state.line = _line;
          state.lineStart = _lineStart;
          state.lineIndent = _lineIndent;
          break;
        }
      }
      if (hasPendingContent) {
        captureSegment(state, captureStart, captureEnd, false);
        writeFoldedLines(state, state.line - _line);
        captureStart = captureEnd = state.position;
        hasPendingContent = false;
      }
      if (!is_WHITE_SPACE(ch)) {
        captureEnd = state.position + 1;
      }
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, captureEnd, false);
    if (state.result) {
      return true;
    }
    state.kind = _kind;
    state.result = _result;
    return false;
  }
  function readSingleQuotedScalar(state, nodeIndent) {
    var ch, captureStart, captureEnd;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 39) {
      return false;
    }
    state.kind = "scalar";
    state.result = "";
    state.position++;
    captureStart = captureEnd = state.position;
    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      if (ch === 39) {
        captureSegment(state, captureStart, state.position, true);
        ch = state.input.charCodeAt(++state.position);
        if (ch === 39) {
          captureStart = state.position;
          state.position++;
          captureEnd = state.position;
        } else {
          return true;
        }
      } else if (is_EOL(ch)) {
        captureSegment(state, captureStart, captureEnd, true);
        writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
        captureStart = captureEnd = state.position;
      } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
        throwError(state, "unexpected end of the document within a single quoted scalar");
      } else {
        state.position++;
        captureEnd = state.position;
      }
    }
    throwError(state, "unexpected end of the stream within a single quoted scalar");
  }
  function readDoubleQuotedScalar(state, nodeIndent) {
    var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 34) {
      return false;
    }
    state.kind = "scalar";
    state.result = "";
    state.position++;
    captureStart = captureEnd = state.position;
    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      if (ch === 34) {
        captureSegment(state, captureStart, state.position, true);
        state.position++;
        return true;
      } else if (ch === 92) {
        captureSegment(state, captureStart, state.position, true);
        ch = state.input.charCodeAt(++state.position);
        if (is_EOL(ch)) {
          skipSeparationSpace(state, false, nodeIndent);
        } else if (ch < 256 && simpleEscapeCheck[ch]) {
          state.result += simpleEscapeMap[ch];
          state.position++;
        } else if ((tmp = escapedHexLen(ch)) > 0) {
          hexLength = tmp;
          hexResult = 0;
          for (; hexLength > 0; hexLength--) {
            ch = state.input.charCodeAt(++state.position);
            if ((tmp = fromHexCode(ch)) >= 0) {
              hexResult = (hexResult << 4) + tmp;
            } else {
              throwError(state, "expected hexadecimal character");
            }
          }
          state.result += charFromCodepoint(hexResult);
          state.position++;
        } else {
          throwError(state, "unknown escape sequence");
        }
        captureStart = captureEnd = state.position;
      } else if (is_EOL(ch)) {
        captureSegment(state, captureStart, captureEnd, true);
        writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
        captureStart = captureEnd = state.position;
      } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
        throwError(state, "unexpected end of the document within a double quoted scalar");
      } else {
        state.position++;
        captureEnd = state.position;
      }
    }
    throwError(state, "unexpected end of the stream within a double quoted scalar");
  }
  function readFlowCollection(state, nodeIndent) {
    var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = /* @__PURE__ */ Object.create(null), keyNode, keyTag, valueNode, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 91) {
      terminator = 93;
      isMapping = false;
      _result = [];
    } else if (ch === 123) {
      terminator = 125;
      isMapping = true;
      _result = {};
    } else {
      return false;
    }
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(++state.position);
    while (ch !== 0) {
      skipSeparationSpace(state, true, nodeIndent);
      ch = state.input.charCodeAt(state.position);
      if (ch === terminator) {
        state.position++;
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = isMapping ? "mapping" : "sequence";
        state.result = _result;
        return true;
      } else if (!readNext) {
        throwError(state, "missed comma between flow collection entries");
      } else if (ch === 44) {
        throwError(state, "expected the node content, but found ','");
      }
      keyTag = keyNode = valueNode = null;
      isPair = isExplicitPair = false;
      if (ch === 63) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following)) {
          isPair = isExplicitPair = true;
          state.position++;
          skipSeparationSpace(state, true, nodeIndent);
        }
      }
      _line = state.line;
      _lineStart = state.lineStart;
      _pos = state.position;
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      keyTag = state.tag;
      keyNode = state.result;
      skipSeparationSpace(state, true, nodeIndent);
      ch = state.input.charCodeAt(state.position);
      if ((isExplicitPair || state.line === _line) && ch === 58) {
        isPair = true;
        ch = state.input.charCodeAt(++state.position);
        skipSeparationSpace(state, true, nodeIndent);
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        valueNode = state.result;
      }
      if (isMapping) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
      } else if (isPair) {
        _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
      } else {
        _result.push(keyNode);
      }
      skipSeparationSpace(state, true, nodeIndent);
      ch = state.input.charCodeAt(state.position);
      if (ch === 44) {
        readNext = true;
        ch = state.input.charCodeAt(++state.position);
      } else {
        readNext = false;
      }
    }
    throwError(state, "unexpected end of the stream within a flow collection");
  }
  function readBlockScalar(state, nodeIndent) {
    var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 124) {
      folding = false;
    } else if (ch === 62) {
      folding = true;
    } else {
      return false;
    }
    state.kind = "scalar";
    state.result = "";
    while (ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
      if (ch === 43 || ch === 45) {
        if (CHOMPING_CLIP === chomping) {
          chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
        } else {
          throwError(state, "repeat of a chomping mode identifier");
        }
      } else if ((tmp = fromDecimalCode(ch)) >= 0) {
        if (tmp === 0) {
          throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
        } else if (!detectedIndent) {
          textIndent = nodeIndent + tmp - 1;
          detectedIndent = true;
        } else {
          throwError(state, "repeat of an indentation width identifier");
        }
      } else {
        break;
      }
    }
    if (is_WHITE_SPACE(ch)) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (is_WHITE_SPACE(ch));
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (!is_EOL(ch) && ch !== 0);
      }
    }
    while (ch !== 0) {
      readLineBreak(state);
      state.lineIndent = 0;
      ch = state.input.charCodeAt(state.position);
      while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
      if (!detectedIndent && state.lineIndent > textIndent) {
        textIndent = state.lineIndent;
      }
      if (is_EOL(ch)) {
        emptyLines++;
        continue;
      }
      if (state.lineIndent < textIndent) {
        if (chomping === CHOMPING_KEEP) {
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        } else if (chomping === CHOMPING_CLIP) {
          if (didReadContent) {
            state.result += "\n";
          }
        }
        break;
      }
      if (folding) {
        if (is_WHITE_SPACE(ch)) {
          atMoreIndented = true;
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        } else if (atMoreIndented) {
          atMoreIndented = false;
          state.result += common.repeat("\n", emptyLines + 1);
        } else if (emptyLines === 0) {
          if (didReadContent) {
            state.result += " ";
          }
        } else {
          state.result += common.repeat("\n", emptyLines);
        }
      } else {
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      }
      didReadContent = true;
      detectedIndent = true;
      emptyLines = 0;
      captureStart = state.position;
      while (!is_EOL(ch) && ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, state.position, false);
    }
    return true;
  }
  function readBlockSequence(state, nodeIndent) {
    var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
    if (state.firstTabInLine !== -1) return false;
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while (ch !== 0) {
      if (state.firstTabInLine !== -1) {
        state.position = state.firstTabInLine;
        throwError(state, "tab characters must not be used in indentation");
      }
      if (ch !== 45) {
        break;
      }
      following = state.input.charCodeAt(state.position + 1);
      if (!is_WS_OR_EOL(following)) {
        break;
      }
      detected = true;
      state.position++;
      if (skipSeparationSpace(state, true, -1)) {
        if (state.lineIndent <= nodeIndent) {
          _result.push(null);
          ch = state.input.charCodeAt(state.position);
          continue;
        }
      }
      _line = state.line;
      composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
      _result.push(state.result);
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
      if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
        throwError(state, "bad indentation of a sequence entry");
      } else if (state.lineIndent < nodeIndent) {
        break;
      }
    }
    if (detected) {
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = "sequence";
      state.result = _result;
      return true;
    }
    return false;
  }
  function readBlockMapping(state, nodeIndent, flowIndent) {
    var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = /* @__PURE__ */ Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
    if (state.firstTabInLine !== -1) return false;
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while (ch !== 0) {
      if (!atExplicitKey && state.firstTabInLine !== -1) {
        state.position = state.firstTabInLine;
        throwError(state, "tab characters must not be used in indentation");
      }
      following = state.input.charCodeAt(state.position + 1);
      _line = state.line;
      if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
        if (ch === 63) {
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = true;
          allowCompact = true;
        } else if (atExplicitKey) {
          atExplicitKey = false;
          allowCompact = true;
        } else {
          throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
        }
        state.position += 1;
        ch = following;
      } else {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
        if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          break;
        }
        if (state.line === _line) {
          ch = state.input.charCodeAt(state.position);
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 58) {
            ch = state.input.charCodeAt(++state.position);
            if (!is_WS_OR_EOL(ch)) {
              throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
            }
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = false;
            allowCompact = false;
            keyTag = state.tag;
            keyNode = state.result;
          } else if (detected) {
            throwError(state, "can not read an implicit mapping pair; a colon is missed");
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true;
          }
        } else if (detected) {
          throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true;
        }
      }
      if (state.line === _line || state.lineIndent > nodeIndent) {
        if (atExplicitKey) {
          _keyLine = state.line;
          _keyLineStart = state.lineStart;
          _keyPos = state.position;
        }
        if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
          if (atExplicitKey) {
            keyNode = state.result;
          } else {
            valueNode = state.result;
          }
        }
        if (!atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
      }
      if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
        throwError(state, "bad indentation of a mapping entry");
      } else if (state.lineIndent < nodeIndent) {
        break;
      }
    }
    if (atExplicitKey) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
    }
    if (detected) {
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = "mapping";
      state.result = _result;
    }
    return detected;
  }
  function readTagProperty(state) {
    var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 33) return false;
    if (state.tag !== null) {
      throwError(state, "duplication of a tag property");
    }
    ch = state.input.charCodeAt(++state.position);
    if (ch === 60) {
      isVerbatim = true;
      ch = state.input.charCodeAt(++state.position);
    } else if (ch === 33) {
      isNamed = true;
      tagHandle = "!!";
      ch = state.input.charCodeAt(++state.position);
    } else {
      tagHandle = "!";
    }
    _position = state.position;
    if (isVerbatim) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 0 && ch !== 62);
      if (state.position < state.length) {
        tagName = state.input.slice(_position, state.position);
        ch = state.input.charCodeAt(++state.position);
      } else {
        throwError(state, "unexpected end of the stream within a verbatim tag");
      }
    } else {
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        if (ch === 33) {
          if (!isNamed) {
            tagHandle = state.input.slice(_position - 1, state.position + 1);
            if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
              throwError(state, "named tag handle cannot contain such characters");
            }
            isNamed = true;
            _position = state.position + 1;
          } else {
            throwError(state, "tag suffix cannot contain exclamation marks");
          }
        }
        ch = state.input.charCodeAt(++state.position);
      }
      tagName = state.input.slice(_position, state.position);
      if (PATTERN_FLOW_INDICATORS.test(tagName)) {
        throwError(state, "tag suffix cannot contain flow indicator characters");
      }
    }
    if (tagName && !PATTERN_TAG_URI.test(tagName)) {
      throwError(state, "tag name cannot contain such characters: " + tagName);
    }
    try {
      tagName = decodeURIComponent(tagName);
    } catch (err) {
      throwError(state, "tag name is malformed: " + tagName);
    }
    if (isVerbatim) {
      state.tag = tagName;
    } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
      state.tag = state.tagMap[tagHandle] + tagName;
    } else if (tagHandle === "!") {
      state.tag = "!" + tagName;
    } else if (tagHandle === "!!") {
      state.tag = "tag:yaml.org,2002:" + tagName;
    } else {
      throwError(state, 'undeclared tag handle "' + tagHandle + '"');
    }
    return true;
  }
  function readAnchorProperty(state) {
    var _position, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 38) return false;
    if (state.anchor !== null) {
      throwError(state, "duplication of an anchor property");
    }
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
      throwError(state, "name of an anchor node must contain at least one character");
    }
    state.anchor = state.input.slice(_position, state.position);
    return true;
  }
  function readAlias(state) {
    var _position, alias, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 42) return false;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
      throwError(state, "name of an alias node must contain at least one character");
    }
    alias = state.input.slice(_position, state.position);
    if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
      throwError(state, 'unidentified alias "' + alias + '"');
    }
    state.result = state.anchorMap[alias];
    skipSeparationSpace(state, true, -1);
    return true;
  }
  function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
    var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
    if (state.listener !== null) {
      state.listener("open", state);
    }
    state.tag = null;
    state.anchor = null;
    state.kind = null;
    state.result = null;
    allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
    if (allowToSeek) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      }
    }
    if (indentStatus === 1) {
      while (readTagProperty(state) || readAnchorProperty(state)) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          allowBlockCollections = allowBlockStyles;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        } else {
          allowBlockCollections = false;
        }
      }
    }
    if (allowBlockCollections) {
      allowBlockCollections = atNewLine || allowCompact;
    }
    if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
      if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
        flowIndent = parentIndent;
      } else {
        flowIndent = parentIndent + 1;
      }
      blockIndent = state.position - state.lineStart;
      if (indentStatus === 1) {
        if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
          hasContent = true;
        } else {
          if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
            hasContent = true;
          } else if (readAlias(state)) {
            hasContent = true;
            if (state.tag !== null || state.anchor !== null) {
              throwError(state, "alias node should not have any properties");
            }
          } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
            hasContent = true;
            if (state.tag === null) {
              state.tag = "?";
            }
          }
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
        }
      } else if (indentStatus === 0) {
        hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
      }
    }
    if (state.tag === null) {
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    } else if (state.tag === "?") {
      if (state.result !== null && state.kind !== "scalar") {
        throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
      }
      for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
        type2 = state.implicitTypes[typeIndex];
        if (type2.resolve(state.result)) {
          state.result = type2.construct(state.result);
          state.tag = type2.tag;
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
          break;
        }
      }
    } else if (state.tag !== "!") {
      if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
        type2 = state.typeMap[state.kind || "fallback"][state.tag];
      } else {
        type2 = null;
        typeList = state.typeMap.multi[state.kind || "fallback"];
        for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
          if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
            type2 = typeList[typeIndex];
            break;
          }
        }
      }
      if (!type2) {
        throwError(state, "unknown tag !<" + state.tag + ">");
      }
      if (state.result !== null && type2.kind !== state.kind) {
        throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
      }
      if (!type2.resolve(state.result, state.tag)) {
        throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
      } else {
        state.result = type2.construct(state.result, state.tag);
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    }
    if (state.listener !== null) {
      state.listener("close", state);
    }
    return state.tag !== null || state.anchor !== null || hasContent;
  }
  function readDocument(state) {
    var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
    state.version = null;
    state.checkLineBreaks = state.legacy;
    state.tagMap = /* @__PURE__ */ Object.create(null);
    state.anchorMap = /* @__PURE__ */ Object.create(null);
    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
      if (state.lineIndent > 0 || ch !== 37) {
        break;
      }
      hasDirectives = true;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      directiveName = state.input.slice(_position, state.position);
      directiveArgs = [];
      if (directiveName.length < 1) {
        throwError(state, "directive name must not be less than one character in length");
      }
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 0 && !is_EOL(ch));
          break;
        }
        if (is_EOL(ch)) break;
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveArgs.push(state.input.slice(_position, state.position));
      }
      if (ch !== 0) readLineBreak(state);
      if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
        directiveHandlers[directiveName](state, directiveName, directiveArgs);
      } else {
        throwWarning(state, 'unknown document directive "' + directiveName + '"');
      }
    }
    skipSeparationSpace(state, true, -1);
    if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    } else if (hasDirectives) {
      throwError(state, "directives end mark is expected");
    }
    composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
    skipSeparationSpace(state, true, -1);
    if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
      throwWarning(state, "non-ASCII line breaks are interpreted as content");
    }
    state.documents.push(state.result);
    if (state.position === state.lineStart && testDocumentSeparator(state)) {
      if (state.input.charCodeAt(state.position) === 46) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      }
      return;
    }
    if (state.position < state.length - 1) {
      throwError(state, "end of the stream or a document separator is expected");
    } else {
      return;
    }
  }
  function loadDocuments(input, options) {
    input = String(input);
    options = options || {};
    if (input.length !== 0) {
      if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
        input += "\n";
      }
      if (input.charCodeAt(0) === 65279) {
        input = input.slice(1);
      }
    }
    var state = new State$1(input, options);
    var nullpos = input.indexOf("\0");
    if (nullpos !== -1) {
      state.position = nullpos;
      throwError(state, "null byte is not allowed in input");
    }
    state.input += "\0";
    while (state.input.charCodeAt(state.position) === 32) {
      state.lineIndent += 1;
      state.position += 1;
    }
    while (state.position < state.length - 1) {
      readDocument(state);
    }
    return state.documents;
  }
  function loadAll$1(input, iterator, options) {
    if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
      options = iterator;
      iterator = null;
    }
    var documents = loadDocuments(input, options);
    if (typeof iterator !== "function") {
      return documents;
    }
    for (var index = 0, length = documents.length; index < length; index += 1) {
      iterator(documents[index]);
    }
  }
  function load$1(input, options) {
    var documents = loadDocuments(input, options);
    if (documents.length === 0) {
      return void 0;
    } else if (documents.length === 1) {
      return documents[0];
    }
    throw new exception("expected a single document in the stream, but found more");
  }
  var loadAll_1 = loadAll$1;
  var load_1 = load$1;
  var loader = {
    loadAll: loadAll_1,
    load: load_1
  };
  var _toString = Object.prototype.toString;
  var _hasOwnProperty = Object.prototype.hasOwnProperty;
  var CHAR_BOM = 65279;
  var CHAR_TAB = 9;
  var CHAR_LINE_FEED = 10;
  var CHAR_CARRIAGE_RETURN = 13;
  var CHAR_SPACE = 32;
  var CHAR_EXCLAMATION = 33;
  var CHAR_DOUBLE_QUOTE = 34;
  var CHAR_SHARP = 35;
  var CHAR_PERCENT = 37;
  var CHAR_AMPERSAND = 38;
  var CHAR_SINGLE_QUOTE = 39;
  var CHAR_ASTERISK = 42;
  var CHAR_COMMA = 44;
  var CHAR_MINUS = 45;
  var CHAR_COLON = 58;
  var CHAR_EQUALS = 61;
  var CHAR_GREATER_THAN = 62;
  var CHAR_QUESTION = 63;
  var CHAR_COMMERCIAL_AT = 64;
  var CHAR_LEFT_SQUARE_BRACKET = 91;
  var CHAR_RIGHT_SQUARE_BRACKET = 93;
  var CHAR_GRAVE_ACCENT = 96;
  var CHAR_LEFT_CURLY_BRACKET = 123;
  var CHAR_VERTICAL_LINE = 124;
  var CHAR_RIGHT_CURLY_BRACKET = 125;
  var ESCAPE_SEQUENCES = {};
  ESCAPE_SEQUENCES[0] = "\\0";
  ESCAPE_SEQUENCES[7] = "\\a";
  ESCAPE_SEQUENCES[8] = "\\b";
  ESCAPE_SEQUENCES[9] = "\\t";
  ESCAPE_SEQUENCES[10] = "\\n";
  ESCAPE_SEQUENCES[11] = "\\v";
  ESCAPE_SEQUENCES[12] = "\\f";
  ESCAPE_SEQUENCES[13] = "\\r";
  ESCAPE_SEQUENCES[27] = "\\e";
  ESCAPE_SEQUENCES[34] = '\\"';
  ESCAPE_SEQUENCES[92] = "\\\\";
  ESCAPE_SEQUENCES[133] = "\\N";
  ESCAPE_SEQUENCES[160] = "\\_";
  ESCAPE_SEQUENCES[8232] = "\\L";
  ESCAPE_SEQUENCES[8233] = "\\P";
  var DEPRECATED_BOOLEANS_SYNTAX = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
  ];
  var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function compileStyleMap(schema2, map2) {
    var result, keys, index, length, tag, style, type2;
    if (map2 === null) return {};
    result = {};
    keys = Object.keys(map2);
    for (index = 0, length = keys.length; index < length; index += 1) {
      tag = keys[index];
      style = String(map2[tag]);
      if (tag.slice(0, 2) === "!!") {
        tag = "tag:yaml.org,2002:" + tag.slice(2);
      }
      type2 = schema2.compiledTypeMap["fallback"][tag];
      if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
        style = type2.styleAliases[style];
      }
      result[tag] = style;
    }
    return result;
  }
  function encodeHex(character) {
    var string, handle, length;
    string = character.toString(16).toUpperCase();
    if (character <= 255) {
      handle = "x";
      length = 2;
    } else if (character <= 65535) {
      handle = "u";
      length = 4;
    } else if (character <= 4294967295) {
      handle = "U";
      length = 8;
    } else {
      throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
    }
    return "\\" + handle + common.repeat("0", length - string.length) + string;
  }
  var QUOTING_TYPE_SINGLE = 1;
  var QUOTING_TYPE_DOUBLE = 2;
  function State(options) {
    this.schema = options["schema"] || _default;
    this.indent = Math.max(1, options["indent"] || 2);
    this.noArrayIndent = options["noArrayIndent"] || false;
    this.skipInvalid = options["skipInvalid"] || false;
    this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
    this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
    this.sortKeys = options["sortKeys"] || false;
    this.lineWidth = options["lineWidth"] || 80;
    this.noRefs = options["noRefs"] || false;
    this.noCompatMode = options["noCompatMode"] || false;
    this.condenseFlow = options["condenseFlow"] || false;
    this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
    this.forceQuotes = options["forceQuotes"] || false;
    this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;
    this.tag = null;
    this.result = "";
    this.duplicates = [];
    this.usedDuplicates = null;
  }
  function indentString(string, spaces) {
    var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
    while (position < length) {
      next = string.indexOf("\n", position);
      if (next === -1) {
        line = string.slice(position);
        position = length;
      } else {
        line = string.slice(position, next + 1);
        position = next + 1;
      }
      if (line.length && line !== "\n") result += ind;
      result += line;
    }
    return result;
  }
  function generateNextLine(state, level) {
    return "\n" + common.repeat(" ", state.indent * level);
  }
  function testImplicitResolving(state, str2) {
    var index, length, type2;
    for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
      type2 = state.implicitTypes[index];
      if (type2.resolve(str2)) {
        return true;
      }
    }
    return false;
  }
  function isWhitespace(c) {
    return c === CHAR_SPACE || c === CHAR_TAB;
  }
  function isPrintable(c) {
    return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== CHAR_BOM || 65536 <= c && c <= 1114111;
  }
  function isNsCharOrWhitespace(c) {
    return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
  }
  function isPlainSafe(c, prev, inblock) {
    var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
    var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
    return (
      // ns-plain-safe
      (inblock ? (
        // c = flow-in
        cIsNsCharOrWhitespace
      ) : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar
    );
  }
  function isPlainSafeFirst(c) {
    return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
  }
  function isPlainSafeLast(c) {
    return !isWhitespace(c) && c !== CHAR_COLON;
  }
  function codePointAt(string, pos) {
    var first = string.charCodeAt(pos), second;
    if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
      second = string.charCodeAt(pos + 1);
      if (second >= 56320 && second <= 57343) {
        return (first - 55296) * 1024 + second - 56320 + 65536;
      }
    }
    return first;
  }
  function needIndentIndicator(string) {
    var leadingSpaceRe = /^\n* /;
    return leadingSpaceRe.test(string);
  }
  var STYLE_PLAIN = 1;
  var STYLE_SINGLE = 2;
  var STYLE_LITERAL = 3;
  var STYLE_FOLDED = 4;
  var STYLE_DOUBLE = 5;
  function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
    var i;
    var char = 0;
    var prevChar = null;
    var hasLineBreak = false;
    var hasFoldableLine = false;
    var shouldTrackWidth = lineWidth !== -1;
    var previousLineBreak = -1;
    var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
    if (singleLineOnly || forceQuotes) {
      for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
        char = codePointAt(string, i);
        if (!isPrintable(char)) {
          return STYLE_DOUBLE;
        }
        plain = plain && isPlainSafe(char, prevChar, inblock);
        prevChar = char;
      }
    } else {
      for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
        char = codePointAt(string, i);
        if (char === CHAR_LINE_FEED) {
          hasLineBreak = true;
          if (shouldTrackWidth) {
            hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
            i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
            previousLineBreak = i;
          }
        } else if (!isPrintable(char)) {
          return STYLE_DOUBLE;
        }
        plain = plain && isPlainSafe(char, prevChar, inblock);
        prevChar = char;
      }
      hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
    }
    if (!hasLineBreak && !hasFoldableLine) {
      if (plain && !forceQuotes && !testAmbiguousType(string)) {
        return STYLE_PLAIN;
      }
      return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
    }
    if (indentPerLevel > 9 && needIndentIndicator(string)) {
      return STYLE_DOUBLE;
    }
    if (!forceQuotes) {
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  function writeScalar(state, string, level, iskey, inblock) {
    state.dump = function() {
      if (string.length === 0) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
      }
      if (!state.noCompatMode) {
        if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
          return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
        }
      }
      var indent = state.indent * Math.max(1, level);
      var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
      var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
      function testAmbiguity(string2) {
        return testImplicitResolving(state, string2);
      }
      switch (chooseScalarStyle(
        string,
        singleLineOnly,
        state.indent,
        lineWidth,
        testAmbiguity,
        state.quotingType,
        state.forceQuotes && !iskey,
        inblock
      )) {
        case STYLE_PLAIN:
          return string;
        case STYLE_SINGLE:
          return "'" + string.replace(/'/g, "''") + "'";
        case STYLE_LITERAL:
          return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
        case STYLE_FOLDED:
          return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
        case STYLE_DOUBLE:
          return '"' + escapeString(string) + '"';
        default:
          throw new exception("impossible error: invalid scalar style");
      }
    }();
  }
  function blockHeader(string, indentPerLevel) {
    var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
    var clip = string[string.length - 1] === "\n";
    var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
    var chomp = keep ? "+" : clip ? "" : "-";
    return indentIndicator + chomp + "\n";
  }
  function dropEndingNewline(string) {
    return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
  }
  function foldString(string, width) {
    var lineRe = /(\n+)([^\n]*)/g;
    var result = function() {
      var nextLF = string.indexOf("\n");
      nextLF = nextLF !== -1 ? nextLF : string.length;
      lineRe.lastIndex = nextLF;
      return foldLine(string.slice(0, nextLF), width);
    }();
    var prevMoreIndented = string[0] === "\n" || string[0] === " ";
    var moreIndented;
    var match;
    while (match = lineRe.exec(string)) {
      var prefix = match[1], line = match[2];
      moreIndented = line[0] === " ";
      result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
      prevMoreIndented = moreIndented;
    }
    return result;
  }
  function foldLine(line, width) {
    if (line === "" || line[0] === " ") return line;
    var breakRe = / [^ ]/g;
    var match;
    var start = 0, end, curr = 0, next = 0;
    var result = "";
    while (match = breakRe.exec(line)) {
      next = match.index;
      if (next - start > width) {
        end = curr > start ? curr : next;
        result += "\n" + line.slice(start, end);
        start = end + 1;
      }
      curr = next;
    }
    result += "\n";
    if (line.length - start > width && curr > start) {
      result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
    } else {
      result += line.slice(start);
    }
    return result.slice(1);
  }
  function escapeString(string) {
    var result = "";
    var char = 0;
    var escapeSeq;
    for (var i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      escapeSeq = ESCAPE_SEQUENCES[char];
      if (!escapeSeq && isPrintable(char)) {
        result += string[i];
        if (char >= 65536) result += string[i + 1];
      } else {
        result += escapeSeq || encodeHex(char);
      }
    }
    return result;
  }
  function writeFlowSequence(state, level, object) {
    var _result = "", _tag = state.tag, index, length, value;
    for (index = 0, length = object.length; index < length; index += 1) {
      value = object[index];
      if (state.replacer) {
        value = state.replacer.call(object, String(index), value);
      }
      if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
        if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
        _result += state.dump;
      }
    }
    state.tag = _tag;
    state.dump = "[" + _result + "]";
  }
  function writeBlockSequence(state, level, object, compact) {
    var _result = "", _tag = state.tag, index, length, value;
    for (index = 0, length = object.length; index < length; index += 1) {
      value = object[index];
      if (state.replacer) {
        value = state.replacer.call(object, String(index), value);
      }
      if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
        if (!compact || _result !== "") {
          _result += generateNextLine(state, level);
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          _result += "-";
        } else {
          _result += "- ";
        }
        _result += state.dump;
      }
    }
    state.tag = _tag;
    state.dump = _result || "[]";
  }
  function writeFlowMapping(state, level, object) {
    var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
    for (index = 0, length = objectKeyList.length; index < length; index += 1) {
      pairBuffer = "";
      if (_result !== "") pairBuffer += ", ";
      if (state.condenseFlow) pairBuffer += '"';
      objectKey = objectKeyList[index];
      objectValue = object[objectKey];
      if (state.replacer) {
        objectValue = state.replacer.call(object, objectKey, objectValue);
      }
      if (!writeNode(state, level, objectKey, false, false)) {
        continue;
      }
      if (state.dump.length > 1024) pairBuffer += "? ";
      pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
      if (!writeNode(state, level, objectValue, false, false)) {
        continue;
      }
      pairBuffer += state.dump;
      _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = "{" + _result + "}";
  }
  function writeBlockMapping(state, level, object, compact) {
    var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
    if (state.sortKeys === true) {
      objectKeyList.sort();
    } else if (typeof state.sortKeys === "function") {
      objectKeyList.sort(state.sortKeys);
    } else if (state.sortKeys) {
      throw new exception("sortKeys must be a boolean or a function");
    }
    for (index = 0, length = objectKeyList.length; index < length; index += 1) {
      pairBuffer = "";
      if (!compact || _result !== "") {
        pairBuffer += generateNextLine(state, level);
      }
      objectKey = objectKeyList[index];
      objectValue = object[objectKey];
      if (state.replacer) {
        objectValue = state.replacer.call(object, objectKey, objectValue);
      }
      if (!writeNode(state, level + 1, objectKey, true, true, true)) {
        continue;
      }
      explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
      if (explicitPair) {
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += "?";
        } else {
          pairBuffer += "? ";
        }
      }
      pairBuffer += state.dump;
      if (explicitPair) {
        pairBuffer += generateNextLine(state, level);
      }
      if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
        continue;
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += ":";
      } else {
        pairBuffer += ": ";
      }
      pairBuffer += state.dump;
      _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = _result || "{}";
  }
  function detectType(state, object, explicit) {
    var _result, typeList, index, length, type2, style;
    typeList = explicit ? state.explicitTypes : state.implicitTypes;
    for (index = 0, length = typeList.length; index < length; index += 1) {
      type2 = typeList[index];
      if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
        if (explicit) {
          if (type2.multi && type2.representName) {
            state.tag = type2.representName(object);
          } else {
            state.tag = type2.tag;
          }
        } else {
          state.tag = "?";
        }
        if (type2.represent) {
          style = state.styleMap[type2.tag] || type2.defaultStyle;
          if (_toString.call(type2.represent) === "[object Function]") {
            _result = type2.represent(object, style);
          } else if (_hasOwnProperty.call(type2.represent, style)) {
            _result = type2.represent[style](object, style);
          } else {
            throw new exception("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
          }
          state.dump = _result;
        }
        return true;
      }
    }
    return false;
  }
  function writeNode(state, level, object, block, compact, iskey, isblockseq) {
    state.tag = null;
    state.dump = object;
    if (!detectType(state, object, false)) {
      detectType(state, object, true);
    }
    var type2 = _toString.call(state.dump);
    var inblock = block;
    var tagStr;
    if (block) {
      block = state.flowLevel < 0 || state.flowLevel > level;
    }
    var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
    if (objectOrArray) {
      duplicateIndex = state.duplicates.indexOf(object);
      duplicate = duplicateIndex !== -1;
    }
    if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
      compact = false;
    }
    if (duplicate && state.usedDuplicates[duplicateIndex]) {
      state.dump = "*ref_" + duplicateIndex;
    } else {
      if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
        state.usedDuplicates[duplicateIndex] = true;
      }
      if (type2 === "[object Object]") {
        if (block && Object.keys(state.dump).length !== 0) {
          writeBlockMapping(state, level, state.dump, compact);
          if (duplicate) {
            state.dump = "&ref_" + duplicateIndex + state.dump;
          }
        } else {
          writeFlowMapping(state, level, state.dump);
          if (duplicate) {
            state.dump = "&ref_" + duplicateIndex + " " + state.dump;
          }
        }
      } else if (type2 === "[object Array]") {
        if (block && state.dump.length !== 0) {
          if (state.noArrayIndent && !isblockseq && level > 0) {
            writeBlockSequence(state, level - 1, state.dump, compact);
          } else {
            writeBlockSequence(state, level, state.dump, compact);
          }
          if (duplicate) {
            state.dump = "&ref_" + duplicateIndex + state.dump;
          }
        } else {
          writeFlowSequence(state, level, state.dump);
          if (duplicate) {
            state.dump = "&ref_" + duplicateIndex + " " + state.dump;
          }
        }
      } else if (type2 === "[object String]") {
        if (state.tag !== "?") {
          writeScalar(state, state.dump, level, iskey, inblock);
        }
      } else if (type2 === "[object Undefined]") {
        return false;
      } else {
        if (state.skipInvalid) return false;
        throw new exception("unacceptable kind of an object to dump " + type2);
      }
      if (state.tag !== null && state.tag !== "?") {
        tagStr = encodeURI(
          state.tag[0] === "!" ? state.tag.slice(1) : state.tag
        ).replace(/!/g, "%21");
        if (state.tag[0] === "!") {
          tagStr = "!" + tagStr;
        } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
          tagStr = "!!" + tagStr.slice(18);
        } else {
          tagStr = "!<" + tagStr + ">";
        }
        state.dump = tagStr + " " + state.dump;
      }
    }
    return true;
  }
  function getDuplicateReferences(object, state) {
    var objects = [], duplicatesIndexes = [], index, length;
    inspectNode(object, objects, duplicatesIndexes);
    for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
      state.duplicates.push(objects[duplicatesIndexes[index]]);
    }
    state.usedDuplicates = new Array(length);
  }
  function inspectNode(object, objects, duplicatesIndexes) {
    var objectKeyList, index, length;
    if (object !== null && typeof object === "object") {
      index = objects.indexOf(object);
      if (index !== -1) {
        if (duplicatesIndexes.indexOf(index) === -1) {
          duplicatesIndexes.push(index);
        }
      } else {
        objects.push(object);
        if (Array.isArray(object)) {
          for (index = 0, length = object.length; index < length; index += 1) {
            inspectNode(object[index], objects, duplicatesIndexes);
          }
        } else {
          objectKeyList = Object.keys(object);
          for (index = 0, length = objectKeyList.length; index < length; index += 1) {
            inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
          }
        }
      }
    }
  }
  function dump$1(input, options) {
    options = options || {};
    var state = new State(options);
    if (!state.noRefs) getDuplicateReferences(input, state);
    var value = input;
    if (state.replacer) {
      value = state.replacer.call({ "": value }, "", value);
    }
    if (writeNode(state, 0, value, true, true)) return state.dump + "\n";
    return "";
  }
  var dump_1 = dump$1;
  var dumper = {
    dump: dump_1
  };
  function renamed(from, to) {
    return function() {
      throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
    };
  }
  var load = loader.load;
  var loadAll = loader.loadAll;
  var dump = dumper.dump;
  var safeLoad = renamed("safeLoad", "load");
  var safeLoadAll = renamed("safeLoadAll", "loadAll");
  var safeDump = renamed("safeDump", "dump");

  // build/esm/tryParseYamlToJson.js
  var tryParseYamlToJson = (yamlString) => {
    try {
      const document = load(yamlString);
      return document;
    } catch (e) {
      return null;
    }
  };

  // build/esm/fetchWithTimeout.js
  var fetchWithTimeout = async (input, init, timeoutMs, isNoJson, isNoText) => {
    const { status, statusText, text, response } = await fetchTextWithTimeout(input, init, timeoutMs, isNoText);
    const json2 = text && !isNoJson ? tryParseJson(text) || tryParseYamlToJson(text) : null;
    return { text, json: json2, status, statusText, response };
  };
  var fetchTextWithTimeout = async (input, init, timeoutMs, isNoText) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs || 3e5);
      const response = await fetch(input, {
        ...init,
        signal: controller.signal
      }).catch((err) => {
        console.log(Object.keys(err.cause));
        return err.cause.code;
      });
      clearTimeout(timeoutId);
      if (typeof response === "string") {
        return { statusText: response };
      }
      const status = response === null || response === void 0 ? void 0 : response.status;
      const statusText = response === null || response === void 0 ? void 0 : response.statusText;
      const text = isNoText ? void 0 : await response.text();
      return { text, status, statusText, response };
    } catch (e) {
      return { text: void 0, status: 500, statusText: "Catched fetch" };
    }
  };

  // build/esm/pluralize.js
  var pluralize = (parameterName) => {
    return parameterName.concat("s");
  };
  var singularize = (parameterName) => {
    return parameterName.endsWith("s") ? parameterName.substring(0, parameterName.length - 1) : parameterName;
  };
  var isPlural = (parameterName) => {
    return parameterName.endsWith("s");
  };
  var isSingular = (parameterName) => {
    return !isPlural(parameterName);
  };

  // build/esm/general.js
  var noEmptyString = (input) => {
    if (input === "")
      return void 0;
    return input;
  };
  var sum = (items) => {
    const total = items.reduce((total2, num) => {
      if (typeof num !== "number") {
        console.log("WTF", num);
      }
      return total2 + num;
    }, 0);
    return total;
  };
  var apply = (functions, value) => {
    return functions.reduce((val, fn) => {
      return fn(val);
    }, value);
  };
  var createEnum = (array) => array.reduce((previous, current) => {
    return { ...previous, [current]: current };
  }, {});
  var groupByKey = (array, key) => {
    return array.reduce((all, item) => {
      const newAll = all;
      const keyToUse = item[key];
      const already = newAll[keyToUse];
      if (!already) {
        newAll[item[key]] = [item];
      } else {
        newAll[item[key]].push(item);
      }
      return newAll;
    }, {});
  };
  var isAllTrue = (array) => {
    const result = array.find((x) => !x);
    return result === void 0;
  };
  function onlyUnique(value, index, self) {
    return self.findIndex((v) => v === value) === index;
  }
  var onlyUnique2 = (isEqualFn) => (value, index, self) => {
    return self.findIndex((v) => isEqualFn ? isEqualFn(v, value) : v === value) === index;
  };
  var onlyDuplicates = (isEqualFn) => (value, index, self) => {
    return self.findIndex((v) => isEqualFn ? isEqualFn(v, value) : v === value) !== index;
  };
  var makeArray = (...arrayOrNotArray) => {
    return arrayOrNotArray.map((arrayOrNot) => {
      const array = arrayOrNot ? Array.isArray(arrayOrNot) ? arrayOrNot : [arrayOrNot] : [];
      return array;
    }).flat();
  };
  var takeFirst = (arrayOrNot) => {
    return makeArray(arrayOrNot)[0];
  };
  var getObjectFromParamsString = (paramsString) => mergeObjectsArray(paramsString.split(",").map((x) => x.trim().split(":")).map((pair) => pair[0] && pair[1] ? { [pair[0].trim()]: pair[1] } : null).filter(notEmpty));
  var sumObjectParameters = (object1, object2) => {
    const objectKeys = Object.keys(object1);
    const summedObject = mergeObjectsArray(objectKeys.map((key) => {
      const summedObjectPart = { [key]: object1[key] + object2[key] };
      return summedObjectPart;
    }));
    return summedObject;
  };
  var sumAllKeys = (objectArray, keys) => {
    const sumObject = objectArray.reduce((total, item) => {
      if (!item)
        return total;
      const newTotal = mergeObjectsArray(keys.map((key) => {
        const value1 = total ? total[key] || 0 : 0;
        const value2 = (item === null || item === void 0 ? void 0 : item[key]) || 0;
        const sum2 = (!total || total[key] === void 0) && item[key] === void 0 ? void 0 : value1 + value2;
        return { [key]: sum2 };
      }));
      return newTotal;
    }, null);
    return sumObject;
  };
  function notEmpty(value) {
    return value !== null && value !== void 0;
  }

  // build/esm/findNextId.js
  var getNextCharacter = (charCode) => {
    if (charCode < 48) {
      return 48;
    }
    if (charCode < 57) {
      return charCode + 1;
    }
    if (charCode < 65) {
      return 65;
    }
    if (charCode < 90) {
      return charCode + 1;
    }
    if (charCode < 97) {
      return 97;
    }
    if (charCode < 122) {
      return charCode + 1;
    }
    return null;
  };
  var charCodesToString = (charCodes) => {
    return charCodes.map((charCode) => String.fromCharCode(charCode)).join("");
  };
  var findNextId = (ids) => {
    const sorted = makeArray(ids).sort();
    const lastId = sorted.pop() || "0";
    const charCodes = lastId.split("").map((letter) => letter.charCodeAt(0));
    const zeroCharcode = 48;
    const zCharCode = 122;
    if (charCodes.length < 6) {
      const newCharcodes = charCodes.concat(zeroCharcode);
      return charCodesToString(newCharcodes);
    }
    const nonZIndex = charCodes.findLastIndex((c) => c < zCharCode);
    const newCharCodes = nonZIndex < 5 ? charCodes.slice(0, nonZIndex + 1) : charCodes;
    if (charCodes.length === 6 && nonZIndex !== -1) {
      newCharCodes[nonZIndex] = getNextCharacter(newCharCodes[nonZIndex]);
      const newId2 = charCodesToString(newCharCodes);
      return newId2;
    }
    const indexToIncrease = charCodes.map((charCode) => getNextCharacter(charCode)).findIndex((charCode) => charCode !== null);
    const otherCharCodes = indexToIncrease === -1 ? charCodes.concat(zeroCharcode) : charCodes.slice(0, indexToIncrease + 1).map((c, i) => i === indexToIncrease ? getNextCharacter(c) : c);
    const newId = charCodesToString(otherCharCodes);
    return newId;
  };

  // build/esm/generateRandomString.js
  var generateRandomString = (length) => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const characterArray = "x".repeat(length).split("");
    const string = characterArray.map(() => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const character = characters.charAt(randomIndex);
      return character;
    }).join("");
    return string;
  };
  var generateId = () => {
    return generateRandomString(24).toLowerCase();
  };
  var generatePassword = (passwordLength = 14) => {
    return generateRandomString(passwordLength);
  };

  // build/esm/generateDateId.js
  var generateDateId = () => {
    return new Date(Date.now()).toISOString().slice(0, -8) + generateRandomString(3);
  };

  // build/esm/getCurrentDate.js
  var getCurrentDate = (date = /* @__PURE__ */ new Date()) => {
    const month = date.getMonth() + 1;
    const monthString = month < 10 ? `0${month}` : month;
    const dateDay = date.getDate();
    const dateDayString = dateDay < 10 ? `0${dateDay}` : dateDay;
    const currentDate = `${date.getFullYear()}-${monthString}-${dateDayString}`;
    return currentDate;
  };

  // build/esm/getDatesArray.js
  var getDatesArray = function(startDate, untilDate) {
    const datesArray = [];
    for (let dt = new Date(startDate); dt <= new Date(untilDate); dt.setDate(dt.getDate() + 1)) {
      datesArray.push(getCurrentDate(dt));
    }
    return datesArray;
  };

  // node_modules/emoji-regex/index.mjs
  var emoji_regex_default = () => {
    return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
  };

  // build/esm/getFirstEmoji.js
  var getFirstEmoji = (text) => {
    var _a;
    if (!text)
      return;
    return (_a = text === null || text === void 0 ? void 0 : text.match(emoji_regex_default())) === null || _a === void 0 ? void 0 : _a[0];
  };

  // build/esm/getHumanReadableAgoTime.js
  var getHumanReadableAgoTime = (unixTime) => {
    const timeAgo = Date.now() - unixTime;
    const daysAgo = timeAgo / 864e5;
    if (daysAgo < 1) {
      const hoursAgo = daysAgo * 24;
      if (hoursAgo < 1) {
        return "just now";
      }
      return `${Math.round(hoursAgo)} hours ago`;
    }
    return `${Math.round(daysAgo)} days ago`;
  };

  // build/esm/getHumanReadableDatetime.js
  var getHumanReadableDatetime = (unixTime) => {
    if (unixTime === 0) {
      return "";
    }
    const dateObject = new Date(unixTime);
    const nowDate = new Date(Date.now());
    const yesterdayDate = new Date(Date.now() - 864e5);
    const msAgo = Date.now() - unixTime;
    const isToday = msAgo < 864e5 && nowDate.getDate() === dateObject.getDate();
    const isYesterday = msAgo < 864e5 * 2 && yesterdayDate.getDate() === dateObject.getDate();
    const isThisWeek = msAgo < 864e5 * 7;
    if (isToday) {
      const hours = dateObject.getHours();
      const hoursString = hours < 10 ? `0${hours}` : hours;
      const minutes = dateObject.getMinutes();
      const minutesString = minutes < 10 ? `0${minutes}` : minutes;
      return `${hoursString}:${minutesString}`;
    }
    if (isYesterday) {
      return `Yesterday`;
    }
    if (isThisWeek) {
      return [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ][dateObject.getDay()];
    }
    const month = dateObject.getMonth() + 1;
    const monthString = month < 10 ? `0${month}` : month;
    const date = dateObject.getDate();
    const dateString = date < 10 ? `0${date}` : date;
    return `${dateString}/${monthString}/${dateObject.getFullYear()}`;
  };

  // build/esm/getNumberOfLines.js
  var getNumberOfLines = (string) => {
    return string.split("\n").length;
  };

  // build/esm/getObjectKeysArray.js
  var getObjectKeysArray = (object) => {
    return Object.keys(object);
  };

  // build/esm/getParameterAtLocation.js
  var getParameterAtLocation = (object, location) => {
    const firstParameter = object[location[0]];
    if (location.length === 1)
      return firstParameter;
    return getParameterAtLocation(firstParameter, location.slice(1));
  };

  // build/esm/getQueryPath.js
  var getQueryPath = (parsedUrlQuery) => {
    const paths = parsedUrlQuery === null || parsedUrlQuery === void 0 ? void 0 : parsedUrlQuery.paths;
    const queryPath = Array.isArray(paths) ? paths.join("/") : paths === void 0 ? "" : paths;
    return queryPath;
  };

  // build/esm/getStringSizeSummary.js
  var getStringSizeSummary = (string) => {
    const characters = string.length;
    const lines = string.split("\n").length;
    const bytes = byteCount(string);
    return {
      characters,
      lines,
      bytes,
      bytesPerCharacter: bytes / characters,
      charactersPerLine: Math.round(characters / lines),
      linesPerFile: lines,
      numberOfFiles: 1
    };
  };

  // build/esm/getSubsetFromObject.js
  var getSubsetFromObject = (object, keys) => {
    const subsetObject = keys.reduce((obj, key) => {
      return { ...obj, [key]: object[key] };
    }, {});
    return subsetObject;
  };

  // build/esm/getYoutubeId.js
  var getYoutubeId = (url) => {
    if (!url)
      return;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    }
    return;
  };

  // build/esm/hasAllLetters.js
  var hasAllLetters = (a, b) => {
    const lettersLeft = a.split("").reduce((lettersLeft2, lowercaseValueLetter) => {
      if (lettersLeft2[0] === lowercaseValueLetter) {
        lettersLeft2.shift();
      }
      return lettersLeft2;
    }, b.split(""));
    return lettersLeft.length === 0;
  };

  // build/esm/hashCode.js
  var hashCode = (string) => {
    if (!string) {
      return -1;
    }
    var hash = 0, i, chr;
    if (string.length === 0)
      return hash;
    for (i = 0; i < string.length; i++) {
      chr = string.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash >>> 0;
  };

  // build/esm/isAbsoluteImport.js
  var isAbsoluteImport = (moduleString) => moduleString ? !moduleString.startsWith(".") : false;

  // build/esm/isArrayEqual.js
  var isArrayEqual = (a, b) => {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
  };

  // build/esm/isPhoneNumber.js
  var isPhoneNumber = (phoneNumber) => {
    var _a;
    const match = (_a = phoneNumber.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)) === null || _a === void 0 ? void 0 : _a[0];
    return !!match;
  };

  // build/esm/isUrl.js
  var isUrl = (urlOrPath) => {
    if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")) {
      return true;
    }
    return false;
  };
  isUrl.config = {
    isPublic: true,
    categories: ["util"],
    emoji: "\u{1F517}",
    shortDescription: "Check if something is an url"
  };

  // build/esm/mapAsync.js
  var mapAsync = (array, callback) => {
    const u = Promise.all(array.map(callback));
    return u;
  };

  // build/esm/mapMany.js
  var mapItem = async (mapFn, currentValue, index, array) => {
    try {
      return {
        status: "fulfilled",
        value: await mapFn(currentValue, index, array)
      };
    } catch (reason) {
      return {
        status: "rejected",
        reason
      };
    }
  };
  async function worker(id, generator, mapFn, result) {
    for (let [currentValue, index, array] of generator) {
      const mappedResult = await mapItem(mapFn, currentValue, index, array);
      if (mappedResult.status === "fulfilled") {
        result[index] = mappedResult.value;
      }
    }
  }
  function* arrayGenerator(array) {
    for (let index = 0; index < array.length; index++) {
      const currentValue = array[index];
      const generatorTuple = [currentValue, index, array];
      yield generatorTuple;
    }
  }
  var mapMany = async (array, mapFn, limit) => {
    const result = [];
    if (array.length === 0) {
      return result;
    }
    const generator = arrayGenerator(array);
    const realLimit = Math.min(limit || array.length, array.length);
    const workers = new Array(realLimit);
    for (let i = 0; i < realLimit; i++) {
      workers.push(worker(i, generator, mapFn, result));
    }
    await Promise.all(workers);
    return result;
  };

  // build/esm/mergeNestedObject.js
  var mergeNestedObject = (object, otherObject) => {
    if (object === void 0 && otherObject !== void 0) {
      return otherObject;
    }
    if (otherObject === void 0)
      return object;
    const partialNewObject = mergeObjectsArray(
      // go over all keys in otherObject...
      getObjectKeysArray(otherObject).map((key) => {
        const otherObjectValue = otherObject[key];
        if (typeof otherObjectValue !== "object" || Array.isArray(otherObjectValue)) {
          return { [key]: otherObject[key] };
        }
        const newValue = mergeNestedObject(object[key], otherObject[key]);
        return { [key]: newValue };
      })
    );
    return { ...object, ...partialNewObject };
  };
  var setNestedObject = (object, otherObject, value) => {
    if (object === void 0 && otherObject !== void 0) {
      return otherObject;
    }
    if (otherObject === void 0)
      return object;
    const partialNewObject = mergeObjectsArray(
      // go over all keys in otherObject...
      getObjectKeysArray(otherObject).map((key) => {
        const otherObjectValue = otherObject[key];
        if (otherObjectValue === null) {
          return { [key]: value };
        }
        const newValue = setNestedObject(object[key], otherObject[key], value);
        return { [key]: newValue };
      })
    );
    return { ...object, ...partialNewObject };
  };

  // build/esm/object-maps.js
  var objectMapAsync = async (object, mapFn) => {
    const keys = getObjectKeysArray(object);
    const result = mergeObjectsArray(await Promise.all(keys.map(async (key) => {
      const value = object[key];
      return { [key]: await mapFn(key, value) };
    })));
    return result;
  };
  var objectMapSync = (object, mapFn) => {
    const valueObjectParts = getObjectKeysArray(object).map((key) => {
      return { [key]: mapFn(key, object[key]) };
    });
    const merged = mergeObjectsArray(valueObjectParts);
    return merged;
  };
  var objectValuesMap = (object, mapFn) => {
    return Object.keys(object).reduce(function(result, key) {
      result[key] = mapFn(key, object[key]);
      return result;
    }, {});
  };
  var mapValuesSync = (object, mapFn) => {
    const valueObjectParts = Object.keys(object).map((key) => {
      return { [key]: mapFn(object[key]) };
    });
    return mergeObjectsArray(valueObjectParts);
  };
  var mapKeys = async (object, mapFn) => {
    const keyPairs = await Promise.all(Object.keys(object).map(async (oldKey) => {
      return { oldKey, newKey: await mapFn(oldKey) };
    }));
    return mergeObjectsArray(keyPairs.map((pair) => {
      return pair.newKey ? { [pair.newKey]: object[pair.oldKey] } : null;
    }).filter(notEmpty));
  };
  var objectMapToArray = (objectMap, keyPropertyName) => {
    const items = !objectMap ? [] : Object.keys(objectMap).map((key) => {
      const keyName = keyPropertyName || "key";
      const keyObject = { [keyName]: key };
      const newItem = { ...keyObject, ...objectMap[key] };
      return newItem;
    });
    return items;
  };

  // build/esm/omitUndefinedValues.js
  var omitUndefinedValues = (object) => {
    Object.keys(object).map((key) => {
      const value = object[key];
      if (value === void 0) {
        delete object[key];
      }
    });
    return object;
  };

  // build/esm/object-merge.js
  var mergeObjectParameters = (config, defaults) => {
    const parameters = Object.keys({
      ...config,
      ...defaults
    });
    const mergedConfig = parameters.reduce((getConfig, p) => ({ ...getConfig, [p]: (config === null || config === void 0 ? void 0 : config[p]) || (defaults === null || defaults === void 0 ? void 0 : defaults[p]) }), {});
    return mergedConfig;
  };
  var mergeObjects = (...objects) => {
    if (objects.length === 0)
      return;
    const firstObject = objects[0];
    const mergedObject = objects.reduce((previous, current) => {
      if (!current)
        return previous;
      const currentWithoutUndefined = omitUndefinedValues(current);
      const newObject = !previous ? current : { ...previous, ...currentWithoutUndefined };
      return newObject;
    }, firstObject);
    return mergedObject;
  };

  // build/esm/pickArrayItemsRandomly.js
  var shuffleNumbers = (numbers) => numbers.sort(() => {
    return Math.random() - 0.5;
  });
  var pickArrayItemsRandomly = (list, amount) => {
    if (list.length <= amount) {
      return list;
    }
    const indexes = list.map((_, index) => index);
    const shuffled = shuffleNumbers(indexes);
    const indexesToPick = shuffled.slice(0, amount);
    const newList = indexesToPick.map((index) => list[index]);
    return newList;
  };

  // build/esm/pickRandomArrayItem.js
  var pickRandomArrayItem = (array) => {
    return array[Math.floor((array.length - 1) * Math.random())];
  };

  // build/esm/promisifyValue.js
  var promisifyValue = (value) => {
    const promise = new Promise((resolve) => resolve(value));
    return promise;
  };

  // build/esm/pipelinify.js
  var pipelinifyOne = async (input, functions, context, config) => {
    let errors = [];
    const finalOutput = await functions.reduce(async (inputPromise, fn) => {
      const rawInputs = makeArray(await inputPromise);
      const inputs = rawInputs.filter(notEmpty);
      if (inputs.length === 0) {
        return;
      }
      const rawOutput = await Promise.all(inputs.map((input2) => fn(input2, context)));
      if (config === null || config === void 0 ? void 0 : config.showErrors) {
        const errorInputValues = rawOutput.map((output2, index) => !output2 ? inputs[index] : void 0).filter(notEmpty);
        errors = errors.concat(errorInputValues.map((inputValue) => ({
          functionName: fn.name,
          inputValue
        })));
      }
      const output = rawOutput.filter(notEmpty).flat();
      return output;
    }, promisifyValue(input));
    return { output: finalOutput, errors };
  };
  var pipelinify = async (input, functions, context, config) => {
    if (!input) {
      return;
    }
    const inputs = makeArray(input);
    const result = await Promise.all(inputs.map((input2) => pipelinifyOne(input2, functions, context, config)));
    const output = result.map((x) => x.output).flat();
    const errors = result.map((x) => x.errors).flat();
    return { output, errors };
  };

  // build/esm/queueThis.js
  var isRunning = {};
  var queueThis = async (fn, maxConcurrency, ...parameters) => {
    const name = fn.name;
    if (!isRunning[name]) {
      isRunning[name] = 0;
    }
    if (isRunning[name] >= maxConcurrency) {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (isRunning[name] < maxConcurrency) {
            clearInterval(interval);
            resolve();
          }
        }, 1e3);
      });
    }
    isRunning[name]++;
    try {
      const result = await fn(...parameters);
      isRunning[name]--;
      return result;
    } catch (e) {
      isRunning[name]--;
      throw e;
    }
  };

  // build/esm/removeOptionalKeysFromObject.js
  var removeOptionalKeysFromObjectStrings = (object, keys) => {
    const newObject = keys.reduce((objectNow, key) => {
      return {
        ...objectNow,
        [key]: void 0
      };
    }, object);
    return omitUndefinedValues(newObject);
  };
  var removeOptionalKeysFromObject = (object, keys) => {
    return removeOptionalKeysFromObjectStrings(object, keys);
  };

  // build/esm/replaceLastOccurence.js
  var reverseString = (string) => {
    return string.split("").reverse().join("");
  };
  var replaceLastOccurence = (string, searchValue, replaceValue) => {
    const [reversedString, reversedSearchValue, reversedReplaceValue] = [
      string,
      searchValue,
      replaceValue
    ].map(reverseString);
    const replacedReversedString = reversedString.replace(reversedSearchValue, reversedReplaceValue);
    const replacedString = reverseString(replacedReversedString);
    return replacedString;
  };

  // build/esm/runFunctionWithTimeout.js
  var runFunctionWithTimeout = async (fn, timeoutMs, onFinish) => {
    const result = await new Promise(async (resolve, reject) => {
      let isTimedOut = false;
      const timeout = setTimeout(() => {
        isTimedOut = true;
        clearTimeout(timeout);
        resolve({ isTimedOut: true });
      }, timeoutMs);
      const fnResult = await fn();
      if (onFinish) {
        onFinish(fnResult, isTimedOut);
      }
      clearTimeout(timeout);
      resolve({ result: fnResult, isTimedOut: false });
    });
    return result;
  };

  // build/esm/simplifyOpenapi.js
  var simplifyOpenapi = (openapi) => {
    const pathsArray = objectMapToArray(
      //@ts-ignore
      openapi.paths || {},
      "path"
    );
    const pathArrayWithMethods = pathsArray.map(({ path, description, summary, $ref, ...methodObject }) => {
      const result = objectMapToArray(methodObject, "method");
      return result.map((x) => ({
        path,
        description,
        summary,
        $ref,
        ...x
      }));
    }).flat();
    const simplified = pathArrayWithMethods.map(({ requestBody, responses, ...item }) => {
      var _a, _b, _c, _d;
      const forcedRequestBody = requestBody;
      const forcedResponses = responses === null || responses === void 0 ? void 0 : responses["200"];
      const newItem = {
        ...item,
        // Response stuff
        responsesStatusCode: 200,
        responseDescription: forcedResponses === null || forcedResponses === void 0 ? void 0 : forcedResponses.description,
        responseMediaType: "application/json",
        responseContentSchema: (_b = (_a = forcedResponses === null || forcedResponses === void 0 ? void 0 : forcedResponses.content) === null || _a === void 0 ? void 0 : _a["application/json"]) === null || _b === void 0 ? void 0 : _b.schema,
        // Body stuff
        requestBodyRequired: forcedRequestBody === null || forcedRequestBody === void 0 ? void 0 : forcedRequestBody.required,
        requestBodyDescription: forcedRequestBody === null || forcedRequestBody === void 0 ? void 0 : forcedRequestBody.description,
        requestBodySchema: (_d = (_c = forcedRequestBody === null || forcedRequestBody === void 0 ? void 0 : forcedRequestBody.content) === null || _c === void 0 ? void 0 : _c["application/json"]) === null || _d === void 0 ? void 0 : _d.schema
      };
      return newItem;
    });
    return simplified;
  };

  // build/esm/sleep.js
  var sleep = async (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

  // build/esm/splitObject.js
  var splitObject = (object, secondObjectKeys) => {
    const initialValue = [object, {}];
    const newObject = secondObjectKeys.reduce((previous, key) => {
      const [primary, secondary] = previous;
      const newPrimary = {
        ...primary,
        [key]: void 0
      };
      delete newPrimary[key];
      const newSecondary = {
        ...secondary,
        [key]: primary[key]
      };
      return [newPrimary, newSecondary];
    }, initialValue);
    return newObject;
  };

  // build/esm/trimSlashes.js
  var trimSlashes = (absoluteOrRelativePath) => {
    const isFirstCharacterSlash = absoluteOrRelativePath.charAt(0) === "/";
    const isLastCharacterSlash = absoluteOrRelativePath.charAt(absoluteOrRelativePath.length - 1) === "/";
    const withoutSlashPrefix = isFirstCharacterSlash ? absoluteOrRelativePath.slice(1) : absoluteOrRelativePath;
    const withoutSlashSuffix = isLastCharacterSlash ? withoutSlashPrefix.slice(0, withoutSlashPrefix.length - 1) : withoutSlashPrefix;
    return withoutSlashSuffix;
  };

  // build/esm/tryJsonStringify.js
  var tryJsonStringify = (data) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch (e) {
      return;
    }
  };

  // build/esm/uniqueSlug.js
  var uniqueSlug = onlyUnique2((a, b) => a.__id === b.__id);

  // build/esm/unwrapJson.js
  var unwrapJson = (json2) => {
    if (json2 === null) {
      return null;
    }
    if (json2 === void 0) {
      return null;
    }
    if (typeof json2 === "boolean") {
      return json2;
    }
    if (typeof json2 === "object" && !Array.isArray(json2)) {
      const result = Object.keys(json2).map((key) => {
        const value = json2[key];
        return { [key]: unwrapJson(value) };
      });
      return result;
    }
    if (typeof json2 === "object" && Array.isArray(json2)) {
      return json2.map((item) => unwrapJson(item));
    }
    if (typeof json2 === "string") {
      const parsed = tryParseJson(json2);
      return parsed || json2;
    }
    return json2;
  };

  // build/esm/filename-conventions/extensions.js
  var typescriptExtensionsConst = ["ts", "tsx"];
  var markdownExtensionsConst = ["md", "mdx"];
  var jsonExtensionsConst = ["json"];
  var typescriptExtensions = [...typescriptExtensionsConst];
  var markdownExtensions = [...markdownExtensionsConst];
  var jsonExtensions = [...jsonExtensionsConst];
  var getWriterType = (extension) => {
    if (!extension)
      return "other";
    if (typescriptExtensions.includes(extension))
      return "typescript";
    if (markdownExtensions.includes(extension))
      return "markdown";
    return "other";
  };
  var extensions = {
    code: typescriptExtensions,
    data: jsonExtensions,
    text: markdownExtensions
  };
  var allowedSearchContentExtensions = [
    ...typescriptExtensions,
    ...markdownExtensions,
    ...jsonExtensions
  ];
  var fileTypes = Object.keys(extensions);
  var codeExtensions = [
    "ts",
    "tsx",
    "js",
    "jsx",
    "php",
    "c",
    "h",
    "swift",
    "map"
  ];

  // build/esm/filename-conventions/filename-conventions.js
  var unregulatedFolders = [
    "installation",
    "cloned",
    "bundled",
    "backups",
    "to-integrate",
    "browser-sessions",
    "legacy",
    // this is a big exception with block quotes and triple dot names
    "pages",
    // TODO: not regulated because it is automated and should be good (however, there's this one little thing: namedParameters<xyz>)
    "db",
    "src",
    // wordpress stuff
    "wp-content",
    "wp-admin",
    "wp-includes",
    "metadata",
    "wwwroot",
    "phonegap",
    "httpdocs",
    ".index"
  ];
  var buildFolderName = "build";
  var databaseFolderName = "db";
  var sourceFolderName = "src";
  var indexFolderName = ".index";
  var nodeModulesFolderName = "node_modules";
  var nextBuildFolderName = ".next";
  var gitFolderName = ".git";
  var turboFolderName = ".turbo";
  var generatedFolders = [
    buildFolderName,
    nodeModulesFolderName,
    nextBuildFolderName,
    gitFolderName,
    turboFolderName
  ];
  var ignorableFilenames = {
    dsStore: ".DS_Store",
    htaccess: ".htaccess",
    iconFile: "Icon\r"
  };
  var folderNames = {
    buildFolderName,
    databaseFolderName,
    sourceFolderName,
    nodeModulesFolderName,
    nextBuildFolderName,
    gitFolderName,
    turboFolderName
  };
  var projectRelativeToolsPath = "packages";
  var ignorableFileAndFolderNames = Object.values(ignorableFilenames).concat(generatedFolders);
  var movedFileSubextension = "moved";
  var temporaryConvertedSubextension = "converted";
  var projectRelativeGeneratedOperationsFolder = `${projectRelativeToolsPath}/generated`;
  var frontendOptionalFileSubExtensions = [
    "native",
    "ios",
    "android",
    "web"
  ];
  var cliFileExtension = "cli";
  var testFileExtension = "test";
  var operationUnindexableNamesOrSubExtensions = ["cli", "test"];
  var subExtensions = {
    cliFileExtension,
    testFileExtension
  };
  var possibleSubExtensions = [
    "cli",
    "test",
    "native",
    "ios",
    "android",
    "web",
    "ActionStatus",
    "transcription",
    "Transcription",
    "MarkdownIndex",
    "drawio",
    "schema",
    //used for .schema.json files
    "template",
    //used for templates
    // deprecated
    "wav",
    "clean",
    "todo",
    "index"
    //replaced with MarkdownIndex
  ];
  var fileSystemConventions = {
    folderNames,
    subExtensions
  };

  // build/esm/filename-conventions/getFileTypeFromPath.js
  var getFileTypeFromPath = (path) => {
    if (!path)
      return "other";
    if (path.endsWith(".ts"))
      return "code";
    if (path.endsWith(".tsx"))
      return "code";
    if (path.endsWith(".js"))
      return "code";
    if (path.endsWith(".jsx"))
      return "code";
    if (path.endsWith(".md"))
      return "text";
    if (path.endsWith(".mdx"))
      return "text";
    if (path.endsWith(".txt"))
      return "text";
    if (path.endsWith(".json"))
      return "data";
    return "other";
  };

  // build/esm/filename-conventions/hasSpecificSubExtension.js
  var hasSpecificSubExtension = (srcRelativeFileId, subExtensions2, includeRootName) => {
    const subExtensionsArray = makeArray(subExtensions2);
    const parts = srcRelativeFileId.split(".");
    const isSinglePart = parts.length === 1;
    const subExtension = parts.pop();
    const includesSubExtension = subExtensionsArray.includes(subExtension);
    const isCounting = includeRootName ? true : !isSinglePart;
    const has = isCounting && includesSubExtension;
    return has;
  };

  // build/esm/filename-conventions/isGeneratedOperation.js
  var isGeneratedOperation = (operationBasePath) => {
    return operationBasePath.includes("/generated/");
  };
  var isGeneratedOperationName = (operationName) => {
    if (!operationName)
      return false;
    return operationName === "sdk" || operationName.startsWith("sdk-");
  };

  // build/esm/filename-conventions/isIndexableFileId.js
  var isIndexableFileId = (fileId) => {
    const isOperationName = hasSpecificSubExtension(fileId, operationUnindexableNamesOrSubExtensions, true);
    const isFrontendOptionalName = hasSpecificSubExtension(fileId, frontendOptionalFileSubExtensions, false);
    const isTypescriptDeclarationFile = hasSpecificSubExtension(fileId, ["d"], false);
    const isIndex = fileId === "index";
    const isIndexable = !isIndex && !isTypescriptDeclarationFile && !isFrontendOptionalName && !isOperationName;
    return isIndexable;
  };

  // build/esm/fs-util-js/path.js
  var pathJoin = (...chunks) => {
    return chunks.join("/");
  };

  // build/esm/fs-util-js/js.js
  var getFolderJs = (filePath) => {
    if (filePath === void 0)
      return void 0;
    const chunks = filePath.split("/");
    chunks.pop();
    const allWithoutFile = chunks.join("/");
    return allWithoutFile;
  };
  var getFileOrFolderName = (fileOrFolderPath) => {
    if (!fileOrFolderPath)
      return void 0;
    const last = fileOrFolderPath.split("/").pop();
    return last;
  };
  var isPathRelative = (path) => path.startsWith("./") || path.startsWith("../");
  var removeTrailingSlash = (p) => p.charAt(0) === "/" ? p.slice(1) : p;
  var withoutExtension = (fileName) => {
    const pieces = fileName.split(".");
    pieces.pop();
    return pieces.join(".");
  };
  var getExtension = (fileNameOrPath) => {
    const pieces = fileNameOrPath.split(".");
    return pieces.pop();
  };

  // build/esm/fs-util-js/withoutSubExtensions.js
  var withoutSubExtensions = (fileName, config) => {
    const allowAllSubextensions = config === null || config === void 0 ? void 0 : config.allowAllSubextensions;
    const pieces = withoutExtension(fileName).split(".");
    if (allowAllSubextensions) {
      return pieces[0];
    }
    let isNotAllowedSubExtension = false;
    const reversePiecesAllowed = pieces.reverse().reduce((previous, current, currentIndex) => {
      if (!possibleSubExtensions.includes(current)) {
        isNotAllowedSubExtension = true;
      }
      if (isNotAllowedSubExtension) {
        previous.push(current);
      }
      return previous;
    }, []);
    const newName = reversePiecesAllowed.reverse().join(".");
    return newName;
  };

  // build/esm/fs-util-js/makeRelative.js
  var makeRelative = (absolutePath, baseFolderPath) => {
    if (baseFolderPath.length === 0)
      return absolutePath;
    if (absolutePath.length < baseFolderPath.length)
      return "";
    return absolutePath.slice(baseFolderPath.length + 1);
  };

  // build/esm/fs-util-js/getSubExtension.js
  var getSubExtension = (filename) => {
    const parts = filename.split(".");
    parts.pop();
    const subExtension = parts.pop();
    return subExtension;
  };

  // build/esm/fs-util-js/withoutNumbersSuffix.js
  var withoutNumbersSuffix = (filename) => {
    const reverse = filename.split("").reverse();
    const firstLetterIndex = reverse.findIndex((letter) => isNaN(Number(letter)));
    if (firstLetterIndex === 0) {
      return filename;
    }
    const withoutNumbers = reverse.slice(firstLetterIndex).reverse().join("");
    return withoutNumbers;
  };

  // build/esm/measure-performance/generateUniqueId.js
  var generateUniqueId = () => generateId();

  // build/esm/measure-performance/measure-performance.js
  var timer = {};
  var getNewPerformance = (label, uniqueId, isNew) => {
    const timePrevious = timer[uniqueId];
    const timeNow = Date.now();
    timer[uniqueId] = timeNow;
    if (isNew)
      return;
    const durationMs = timeNow - timePrevious;
    return { label, durationMs };
  };
  var cleanupTimer = (uniqueId) => {
    delete timer[uniqueId];
  };

  // build/esm/types/asset-type/OpenFile.js
  var openFileConfig = {
    storageLocation: `memory/persons/[personSlug]/open-files.json`,
    pathIndexKeys: ["personSlug"],
    modelName: "OpenFile"
  };

  // build/esm/types/asset-type/mimeTypes.js
  var mimeTypes = {
    //   File Extension   MIME Type
    abs: "audio/x-mpeg",
    ai: "application/postscript",
    aif: "audio/x-aiff",
    aifc: "audio/x-aiff",
    aiff: "audio/x-aiff",
    aim: "application/x-aim",
    art: "image/x-jg",
    asf: "video/x-ms-asf",
    asx: "video/x-ms-asf",
    au: "audio/basic",
    avi: "video/x-msvideo",
    avx: "video/x-rad-screenplay",
    bcpio: "application/x-bcpio",
    bin: "application/octet-stream",
    bmp: "image/bmp",
    body: "text/html",
    cdf: "application/x-cdf",
    cer: "application/pkix-cert",
    class: "application/java",
    cpio: "application/x-cpio",
    csh: "application/x-csh",
    css: "text/css",
    dib: "image/bmp",
    doc: "application/msword",
    dtd: "application/xml-dtd",
    dv: "video/x-dv",
    dvi: "application/x-dvi",
    eot: "application/vnd.ms-fontobject",
    eps: "application/postscript",
    etx: "text/x-setext",
    exe: "application/octet-stream",
    gif: "image/gif",
    gtar: "application/x-gtar",
    gz: "application/x-gzip",
    hdf: "application/x-hdf",
    hqx: "application/mac-binhex40",
    htc: "text/x-component",
    htm: "text/html",
    html: "text/html",
    ief: "image/ief",
    jad: "text/vnd.sun.j2me.app-descriptor",
    jar: "application/java-archive",
    java: "text/x-java-source",
    jnlp: "application/x-java-jnlp-file",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    jpe: "image/jpeg",
    js: "application/javascript",
    jsf: "text/plain",
    json: "application/json",
    jspf: "text/plain",
    kar: "audio/midi",
    latex: "application/x-latex",
    m3u: "audio/x-mpegurl",
    mac: "image/x-macpaint",
    man: "text/troff",
    mathml: "application/mathml+xml",
    me: "text/troff",
    mid: "audio/midi",
    midi: "audio/midi",
    mif: "application/x-mif",
    mov: "video/quicktime",
    movie: "video/x-sgi-movie",
    mp3: "audio/mpeg",
    mp2: "audio/mpeg",
    mp1: "audio/mpeg",
    mp4: "video/mp4",
    mpa: "audio/mpeg",
    mpe: "video/mpeg",
    mpeg: "video/mpeg",
    mpega: "audio/x-mpeg",
    mpg: "video/mpeg",
    mpv2: "video/mpeg2",
    ms: "application/x-wais-source",
    nc: "application/x-netcdf",
    oda: "application/oda",
    odb: "application/vnd.oasis.opendocument.database",
    odc: "application/vnd.oasis.opendocument.chart",
    odf: "application/vnd.oasis.opendocument.formula",
    odg: "application/vnd.oasis.opendocument.graphics",
    odi: "application/vnd.oasis.opendocument.image",
    odm: "application/vnd.oasis.opendocument.text-master",
    odp: "application/vnd.oasis.opendocument.presentation",
    ods: "application/vnd.oasis.opendocument.spreadsheet",
    odt: "application/vnd.oasis.opendocument.text",
    otg: "application/vnd.oasis.opendocument.graphics-template",
    oth: "application/vnd.oasis.opendocument.text-web",
    otp: "application/vnd.oasis.opendocument.presentation-template",
    ots: "application/vnd.oasis.opendocument.spreadsheet-template",
    ott: "application/vnd.oasis.opendocument.text-template",
    ogx: "application/ogg",
    ogv: "video/ogg",
    ogg: "audio/ogg",
    oga: "audio/ogg",
    otf: "application/x-font-opentype",
    spx: "audio/ogg",
    flac: "audio/flac",
    anx: "application/annodex",
    axa: "audio/annodex",
    axv: "video/annodex",
    xspf: "application/xspf+xml",
    pbm: "image/x-portable-bitmap",
    pct: "image/pict",
    pdf: "application/pdf",
    pgm: "image/x-portable-graymap",
    pic: "image/pict",
    pict: "image/pict",
    pls: "audio/x-scpls",
    png: "image/png",
    pnm: "image/x-portable-anymap",
    pnt: "image/x-macpaint",
    ppm: "image/x-portable-pixmap",
    ppt: "application/vnd.ms-powerpoint",
    pps: "application/vnd.ms-powerpoint",
    ps: "application/postscript",
    psd: "image/vnd.adobe.photoshop",
    qt: "video/quicktime",
    qti: "image/x-quicktime",
    qtif: "image/x-quicktime",
    ras: "image/x-cmu-raster",
    rdf: "application/rdf+xml",
    rgb: "image/x-rgb",
    rm: "application/vnd.rn-realmedia",
    roff: "text/troff",
    rtf: "application/rtf",
    rtx: "text/richtext",
    sfnt: "application/font-sfnt",
    sh: "application/x-sh",
    shar: "application/x-shar",
    sit: "application/x-stuffit",
    snd: "audio/basic",
    src: "application/x-wais-source",
    sv4cpio: "application/x-sv4cpio",
    sv4crc: "application/x-sv4crc",
    svg: "image/svg+xml",
    svgz: "image/svg+xml",
    swf: "application/x-shockwave-flash",
    t: "text/troff",
    tar: "application/x-tar",
    tcl: "application/x-tcl",
    tex: "application/x-tex",
    texi: "application/x-texinfo",
    texinfo: "application/x-texinfo",
    tif: "image/tiff",
    tiff: "image/tiff",
    tr: "text/troff",
    tsv: "text/tab-separated-values",
    ttf: "application/x-font-ttf",
    txt: "text/plain",
    ulw: "audio/basic",
    ustar: "application/x-ustar",
    vxml: "application/voicexml+xml",
    xbm: "image/x-xbitmap",
    xht: "application/xhtml+xml",
    xhtml: "application/xhtml+xml",
    xls: "application/vnd.ms-excel",
    xml: "application/xml",
    xpm: "image/x-xpixmap",
    xsl: "application/xml",
    xslt: "application/xslt+xml",
    xul: "application/vnd.mozilla.xul+xml",
    xwd: "image/x-xwindowdump",
    vsd: "application/vnd.visio",
    wav: "audio/x-wav",
    wbmp: "image/vnd.wap.wbmp",
    wml: "text/vnd.wap.wml",
    wmlc: "application/vnd.wap.wmlc",
    wmls: "text/vnd.wap.wmlsc",
    wmlscriptc: "application/vnd.wap.wmlscriptc",
    wmv: "video/x-ms-wmv",
    woff: "application/font-woff",
    woff2: "application/font-woff2",
    wrl: "model/vrml",
    wspolicy: "application/wspolicy+xml",
    z: "application/x-compress",
    zip: "application/zip"
  };

  // build/esm/types/asset-type/Download.js
  var downloadConfig = {
    storageLocation: `memory/downloads/[__id].json`,
    pathIndexKeys: ["__id"],
    modelName: "Download",
    isSingle: true
  };

  // build/esm/types/code-types/DbStorageMethod.js
  var dbStorageMethodsConst = [
    "jsonMultiple",
    "jsonSingle",
    "markdown",
    "keyValueMarkdown",
    "csv"
  ];
  var dbStorageMethods = [...dbStorageMethodsConst];

  // build/esm/types/code-types/Dataset.js
  var datasetFilterOperatorConst = [
    "includesLetters",
    "includes",
    "startsWith",
    "endsWith",
    "equal",
    "notEqual",
    "greaterThan",
    "greaterThanOrEqual",
    "lessThan",
    "lessThanOrEqual"
  ];
  var datasetConfig = {
    storageLocation: `memory/datasets.json`,
    modelName: "Dataset",
    authorizations: { cfa: "crud" }
  };
  var modelViews = [
    {
      view: "table",
      emoji: "\u{1F374}"
    },
    { view: "grid", emoji: "\u2683" },
    {
      view: "timeline",
      emoji: "\u23F3"
    },
    { view: "tree", emoji: "\u{1F333}" }
  ];
  var datasetConfigKeys = [
    "filter",
    "sort",
    "maxRows",
    "startFromIndex",
    "objectParameterKeys",
    "ignoreObjectParameterKeys",
    "view"
  ];

  // build/esm/types/code-types/Operation.js
  var operationConfig = {
    modelName: "Operation",
    isSingle: true,
    storageLocation: "packages/[primaryCategory]/[slug]/package.json",
    pathIndexKeys: ["primaryCategory", "slug"]
  };

  // build/esm/types/code-types/TypescriptIndex.js
  var typescriptIndexModels = [
    "TsBuildError",
    "TsLintWarning",
    "TsExport",
    "TsImport",
    "TsComment",
    "TsInterface",
    "TsFunction",
    "TsVariable"
  ];
  var indexDbModels = [...typescriptIndexModels];
  var indexDbModelFolders = indexDbModels.map(kebabCase).map((f) => `${f}s`);

  // build/esm/types/code-types/OperationClassification.js
  var operationClassificationConst = [
    // general
    "cjs",
    "ts",
    "esm",
    // backend
    "node-cjs",
    "node-cjs-sdk",
    "node-esm",
    "node-ts",
    "server-cjs",
    // frontend
    "ui-web",
    "ui-app",
    "ui-ts",
    "ui-cjs",
    "ui-esm"
  ];

  // build/esm/types/fsorm-types/InterfaceConfig.js
  var genders = ["male", "female"];
  var testInterfaceConfig = {
    slug: "TestInterface",
    propertyConfiguration: {
      names: { type: "string", isArray: true, maybeUndefined: true },
      age: { type: "number", maybeNull: true },
      gender: { enum: genders, maybeNull: true, maybeUndefined: true },
      genderImage: {
        type: "string",
        // assetConfig: {
        //   type: "image",
        //   relativeLocation: "./gender.png",
        //   isMultiple: false,
        // },
        getValue: (item) => searchGoogleImagesFirstResult(item.gender),
        fieldDependencies: ["gender"],
        onChangeDependantBehavior: "reset",
        comment: "It generates from google"
      },
      testInterface: {
        interfaceSlug: "TestInterface",
        maybeUndefined: true
        // isArray: true,
      }
    }
  };
  var searchGoogleImagesFirstResult = async (gender) => {
    return {};
  };

  // build/esm/types/fsorm-types/OrmStorageMethod.js
  var ormStorageMethods = ["json", "md", "ts"];

  // build/esm/types/function-types/FunctionExecution.js
  var getFunctionExersize = async (functionId) => {
    const descriptionString = "";
    const inputString = "";
    const outputString = "";
    const examplesString = 'Input `x, y, z`. Output should be "a"';
    return `
Write a function that can do this:

${descriptionString}

It should take this as its inputs:

${inputString}

It should return this:

${outputString}

Some examples:

${examplesString}
`;
  };

  // build/esm/types/function-types/Queue.js
  var queueConfig = {
    storageLocation: `memory/queues.json`,
    modelName: "Queue",
    extra: {
      queueStatusPath: `memory/queueStatus.json`
    }
  };

  // build/esm/types/function-types/RunEveryPeriodEnum.js
  var runEveryPeriodReadonlyArray = [
    "minute",
    "5-minutes",
    "quarter-hour",
    "hour",
    "6-hours",
    "midnight",
    "week",
    "month",
    "3-months",
    "year"
  ];
  var runEveryPeriodStringArray = [
    ...runEveryPeriodReadonlyArray
  ];

  // build/esm/types/function-types/StandardFunctionConfig.js
  var getIsFunctionExposed = (config) => {
    return (config === null || config === void 0 ? void 0 : config.isPublic) !== void 0 || !!(config === null || config === void 0 ? void 0 : config.authorizations);
  };

  // build/esm/types/marked-types/markdownParseToMarkdownModelType.js
  var tryParseDate = (dateString) => {
    try {
      return new Date(dateString).valueOf();
    } catch (_a) {
    }
  };
  var parseMarkdownModelTimestamp = (parameters, markdownParse, parameterName) => {
    const parameterValue = parameters[parameterName];
    const markdownParseValue = markdownParse[parameterName];
    const parsedParameterValue = typeof parameterValue === "number" && !isNaN(parameterValue) ? parameterValue : typeof parameterValue === "string" ? tryParseDate(parameterValue) : void 0;
    const generatedValue = parameterName === "deletedAt" || parameterName === "openedAt" ? 0 : Date.now();
    const parsedTimestamp = parsedParameterValue !== void 0 ? parsedParameterValue : markdownParseValue !== void 0 ? markdownParseValue : generatedValue;
    return parsedTimestamp;
  };
  var markdownParseToMarkdownModelType = (markdownParse) => {
    if (!markdownParse)
      return null;
    const { parameters, raw, fileName } = markdownParse;
    const name = parameters.name ? String(parameters.name) : fileName;
    const slug = kebabCase(name);
    const id = parameters.id ? String(parameters.id) : generateId();
    const createdAt = parseMarkdownModelTimestamp(parameters, markdownParse, "createdAt");
    const createdFirstAt = parseMarkdownModelTimestamp(parameters, markdownParse, "createdFirstAt");
    const updatedAt = parseMarkdownModelTimestamp(parameters, markdownParse, "updatedAt");
    const deletedAt = parseMarkdownModelTimestamp(parameters, markdownParse, "deletedAt");
    const openedAt = parseMarkdownModelTimestamp(parameters, markdownParse, "openedAt");
    const markdownModelType = {
      ...parameters,
      id,
      createdAt,
      createdFirstAt,
      deletedAt,
      updatedAt,
      openedAt,
      markdown: raw,
      name,
      slug
    };
    return markdownModelType;
  };

  // build/esm/types/model-types/language.js
  var languages = {
    // added later:
    // hebrew: "Hebrew",
    /////
    english: "English",
    dutch: "Dutch (Nederlands)",
    nepali: "Nepali",
    portuguese: "Portuguese",
    brazilian: "Portuguese (Brazilian)",
    german: "German (Deutsch)",
    french: "French",
    spanish: "Spanish",
    italian: "Italian",
    norwegian: "Norwegian",
    swedish: "Swedish",
    danish: "Danish",
    vietnamese: "Vietnamese",
    indonesian: "Indonesian (Bahasa)",
    southAfrican: "South African (Afrikaans)",
    tokiPona: "Toki Pona",
    hindi: "Hindi",
    mandarin: "Mandarin (Chinese)",
    arabic: "Arabic",
    bengali: "Bengali",
    urdu: "Urdu",
    japanese: "Japanese",
    swahili: "Swahili"
  };

  // build/esm/types/model-types/common.js
  function isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // build/esm/types/model-types/time-objects.js
  var getTimeObject = () => {
    const unixTime = Date.now();
    const dateObject = new Date(unixTime);
    const date = `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}`;
    const time = `${dateObject.getHours()}:${dateObject.getMinutes()}`;
    return { unixTime, date, time };
  };
  var getUpdatedTimeObject = () => {
    const { unixTime, date, time } = getTimeObject();
    return {
      updatedAt: unixTime,
      updatedDate: date,
      updatedTime: time
    };
  };
  var getCreatedTimeObject = () => {
    const { unixTime, date, time } = getTimeObject();
    return {
      createdAt: unixTime,
      createdDate: date,
      createdTime: time
    };
  };

  // build/esm/types/model-types/time.js
  var generateTime = () => Date.now();

  // build/esm/types/schema-types/SchemaItem.js
  var schemaItemConfig = {
    modelName: "SchemaItem",
    storageLocation: "packages/[packageCategory]/[packageName]/schema.json",
    pathIndexKeys: ["packageName", "packageCategory"]
  };

  // build/esm/edge/getUrlParams.js
  var getUrlParams = (url) => {
    const params = new URL(url).searchParams;
    return Object.fromEntries(Array.from(params.entries()).map(([key, value]) => [
      key,
      value === "null" ? null : value === "true" ? true : value === "false" ? false : !isNaN(Number(value)) ? Number(value) : value
    ]));
  };

  // build/esm/edge/jsonGetter.js
  var jsonGetter = (fn) => async (request) => {
    const context = getUrlParams(request.url);
    const result = await fn(context);
    if (!result) {
      return new Response("No result", { status: 400 });
    }
    if (result.status && result.status !== 200) {
      return new Response(result.message || result.statusText || result.status, {
        status: result.status,
        statusText: result.statusText
      });
    }
    return new Response(JSON.stringify(result, void 0, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  };

  // build/esm/edge/jsonPost.js
  var jsonPost = (fn) => async (request) => {
    const context = await request.json();
    const result = await fn(context);
    if (!result) {
      return new Response("No result", { status: 400 });
    }
    if (result.status && result.status !== 200) {
      return new Response(result.message || result.statusText || result.status, {
        status: result.status,
        statusText: result.statusText
      });
    }
    return new Response(JSON.stringify(result, void 0, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  };

  // build/esm/edge/qStashCancelAllMessages.js
  var qStashCancelAllMessages = async () => {
    const QSTASH_TOKEN = process.env.QSTASH_TOKEN;
    const QSTASH_BASE_URL = "https://qstash.upstash.io";
    const response = await fetch(`${QSTASH_BASE_URL}/v2/messages`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${QSTASH_TOKEN}`
      }
    });
    if (!response.ok) {
      return {
        error: `HTTP error! status: ${response.status} - ${response.statusText} - ${await response.text()}`
      };
    }
    const data = await response.json();
    return { error: void 0, data };
  };

  // build/esm/edge/qStashFanOut.js
  var qStashFanOut = async (destination, context, secondDelayPerItem, bearerToken) => {
    const QSTASH_TOKEN = process.env.QSTASH_TOKEN;
    const CRON_SECRET = process.env.CRON_SECRET;
    const QSTASH_BASE_URL = "https://qstash.upstash.io";
    if (!QSTASH_TOKEN || !CRON_SECRET) {
      return { error: "Missing required environment variables" };
    }
    const batchMessages = context.map((body, index) => {
      const delay = secondDelayPerItem ? Math.round(index * secondDelayPerItem) : void 0;
      const headers = bearerToken ? {
        [`Upstash-Forward-Authorization`]: `Bearer ${bearerToken}`
      } : {};
      if (delay) {
        headers["Upstash-Delay"] = `${delay}s`;
      }
      return {
        destination,
        body: body ? JSON.stringify(body) : void 0,
        headers
      };
    });
    const totalSize = JSON.stringify(batchMessages).length;
    if (totalSize / batchMessages.length > 5e5) {
      return { error: "payload too big, max 500kb per message" };
    }
    const neededRequests = 2 * (totalSize / 1e6);
    const maxPerRequest = Math.ceil(batchMessages.length / neededRequests);
    const batchMessagesBatches = batchMessages.length > maxPerRequest ? new Array(Math.ceil(batchMessages.length / maxPerRequest)).fill(null).map((_, index) => batchMessages.slice(index * maxPerRequest, index * maxPerRequest + maxPerRequest)) : [batchMessages];
    const list = await Promise.all(batchMessagesBatches.map(async (batch) => {
      try {
        const response = await fetch(`${QSTASH_BASE_URL}/v2/batch`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${QSTASH_TOKEN}`
          },
          body: JSON.stringify(batch)
        });
        if (!response.ok) {
          return {
            error: `HTTP error! status: ${response.status} - ${response.statusText} - ${await response.text()}`
          };
        }
        const data = await response.json();
        return { error: void 0, data };
      } catch (e) {
        return { error: String(e) };
      }
    }));
    const errorCount = list.filter((x) => !!x.error).length;
    if (errorCount > 0) {
      return { error: `${errorCount} errors`, list };
    }
    return { error: void 0, list };
  };
  var qStashSend = async (destination, context, delaySeconds, bearerToken) => {
    const QSTASH_TOKEN = process.env.QSTASH_TOKEN;
    const CRON_SECRET = process.env.CRON_SECRET;
    const QSTASH_BASE_URL = "https://qstash.upstash.io";
    if (!QSTASH_TOKEN || !CRON_SECRET) {
      return { error: "Missing required environment variables" };
    }
    const headers = bearerToken ? {
      [`Upstash-Forward-Authorization`]: `Bearer ${bearerToken}`
    } : {};
    if (delaySeconds) {
      headers["Upstash-Delay"] = `${Math.round(delaySeconds)}s`;
    }
    const bodyString = JSON.stringify(context);
    const totalSize = bodyString.length;
    if (totalSize > 1e6) {
      return { error: "payload too big, max 1mb per message" };
    }
    try {
      const response = await fetch(`${QSTASH_BASE_URL}/v2/publish/${destination}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${QSTASH_TOKEN}`,
          ...headers
        },
        body: bodyString
      });
      if (!response.ok) {
        const text = await response.text();
        return {
          error: `Batch HTTP Error! status: ${response.status} - ${response.statusText} - ${text}`
        };
      }
      const data = await response.json();
      return { error: void 0, data };
    } catch (e) {
      return { error: String(e) };
    }
  };
})();
/*! Bundled license information:

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT *)
*/
