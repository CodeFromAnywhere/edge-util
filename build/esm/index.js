import { findLastIndex, insertAt, putIndexAtIndex, removeIndexFromArray,
// Add other imports from this file
 } from "./array-modifications.js";
import { byteCount } from "./byteCount.js";
import { createMappedObject } from "./createMappedObject.js";
import { destructureOptionalObject } from "./destructureOptionalObject.js";
import { oneByOne } from "./oneByOne.js";
import { camelCase, snakeCase, kebabCase, capitalCase, capitaliseFirstLetter, convertCase, fileSlugify, getDelimiter, humanCase, lowerCaseArray, pascalCase,
// Add other case conversion functions
 } from "./convert-case.js";
import { earthDistance } from "./earthDistance.js";
import { pluralize } from "./pluralize.js";
import { findNextId } from "./findNextId.js";
import { apply, createEnum, getObjectFromParamsString, groupByKey, isAllTrue, makeArray, noEmptyString, notEmpty, onlyDuplicates, onlyUnique, onlyUnique2, sum, sumAllKeys, sumObjectParameters, takeFirst,
// Add other general utility functions
 } from "./general.js";
import { generateDateId } from "./generateDateId.js";
import { generateRandomString } from "./generateRandomString.js";
import { getCurrentDate } from "./getCurrentDate.js";
import { getDatesArray } from "./getDatesArray.js";
import { getFirstEmoji } from "./getFirstEmoji.js";
import { getHumanReadableAgoTime } from "./getHumanReadableAgoTime.js";
import { getHumanReadableDatetime } from "./getHumanReadableDatetime.js";
import { getNumberOfLines } from "./getNumberOfLines.js";
import { getObjectKeysArray } from "./getObjectKeysArray.js";
import { getParameterAtLocation } from "./getParameterAtLocation.js";
import { getQueryPath } from "./getQueryPath.js";
import { getStringSizeSummary } from "./getStringSizeSummary.js";
import { getSubsetFromObject } from "./getSubsetFromObject.js";
import { getYoutubeId } from "./getYoutubeId.js";
import { hasAllLetters } from "./hasAllLetters.js";
import { hashCode } from "./hashCode.js";
import { isAbsoluteImport } from "./isAbsoluteImport.js";
import { isArrayEqual } from "./isArrayEqual.js";
import { isPhoneNumber } from "./isPhoneNumber.js";
import { isUrl } from "./isUrl.js";
import { mapAsync } from "./mapAsync.js";
import { mapMany } from "./mapMany.js";
import { mergeNestedObject } from "./mergeNestedObject.js";
import { mergeObjectsArray } from "./mergeObjectsArray.js";
import { mapValuesSync, mapKeys, objectMapAsync, objectMapSync, objectMapToArray, objectValuesMap,
// Add other object map functions
 } from "./object-maps.js";
import { mergeObjects } from "./object-merge.js";
import { omitUndefinedValues } from "./omitUndefinedValues.js";
import { pickArrayItemsRandomly } from "./pickArrayItemsRandomly.js";
import { pickRandomArrayItem } from "./pickRandomArrayItem.js";
import { pipelinify } from "./pipelinify.js";
import { promisifyValue } from "./promisifyValue.js";
import { queueThis } from "./queueThis.js";
import { removeOptionalKeysFromObject } from "./removeOptionalKeysFromObject.js";
import { replaceLastOccurence } from "./replaceLastOccurence.js";
import { runFunctionWithTimeout } from "./runFunctionWithTimeout.js";
import { simplifyOpenapi } from "./simplifyOpenapi.js";
import { sleep } from "./sleep.js";
import { splitObject } from "./splitObject.js";
import { trimSlashes } from "./trimSlashes.js";
import { tryJsonStringify } from "./tryJsonStringify.js";
import { tryParseJson } from "./tryParseJson.js";
import { uniqueSlug } from "./uniqueSlug.js";
import { unwrapJson } from "./unwrapJson.js";
// Import from other folders
import { allowedSearchContentExtensions, buildFolderName, cliFileExtension, codeExtensions, databaseFolderName, extensions, fileSystemConventions, fileTypes, folderNames, frontendOptionalFileSubExtensions, generatedFolders, getFileTypeFromPath, getWriterType, gitFolderName, hasSpecificSubExtension, ignorableFileAndFolderNames, ignorableFilenames, indexFolderName, isGeneratedOperation, isGeneratedOperationName, isIndexableFileId, jsonExtensions, jsonExtensionsConst, markdownExtensions, markdownExtensionsConst, movedFileSubextension, nextBuildFolderName, nodeModulesFolderName, operationUnindexableNamesOrSubExtensions, possibleSubExtensions, projectRelativeGeneratedOperationsFolder, sourceFolderName, subExtensions, temporaryConvertedSubextension, testFileExtension, turboFolderName, typescriptExtensions, typescriptExtensionsConst, unregulatedFolders, } from "./filename-conventions/index.js";
import { getExtension, getFileOrFolderName, getFolderJs, getSubExtension, isPathRelative, makeRelative, pathJoin, removeTrailingSlash, withoutExtension, withoutNumbersSuffix, withoutSubExtensions, } from "./fs-util-js/index.js";
import { cleanupTimer, generateUniqueId, getNewPerformance, } from "./measure-performance/index.js";
import { datasetConfig, datasetConfigKeys, datasetFilterOperatorConst, dbStorageMethods, dbStorageMethodsConst, downloadConfig, generateTime, getCreatedTimeObject, getFunctionExersize, getIsFunctionExposed, getTimeObject, getUpdatedTimeObject, indexDbModelFolders, indexDbModels, isEmail, languages, markdownParseToMarkdownModelType, mimeTypes, modelViews, openFileConfig, operationClassificationConst, operationConfig, ormStorageMethods, parseMarkdownModelTimestamp, queueConfig, runEveryPeriodReadonlyArray, runEveryPeriodStringArray, schemaItemConfig, testInterfaceConfig, tryParseDate, typescriptIndexModels, } from "./types/index.js";
import { getUrlParams } from "./edge/getUrlParams.js";
import { jsonGetter } from "./edge/jsonGetter.js";
import { jsonPost } from "./edge/jsonPost.js";
import { qStashCancelAllMessages } from "./edge/qStashCancelAllMessages.js";
import { qStashFanOut, qStashSend } from "./edge/qStashFanOut.js";
// Exports
export { findLastIndex, insertAt, putIndexAtIndex, removeIndexFromArray, byteCount, createMappedObject, destructureOptionalObject, oneByOne, camelCase, snakeCase, kebabCase, capitalCase, capitaliseFirstLetter, convertCase, fileSlugify, getDelimiter, humanCase, lowerCaseArray, pascalCase, earthDistance, pluralize, findNextId, apply, createEnum, getObjectFromParamsString, groupByKey, isAllTrue, makeArray, noEmptyString, notEmpty, onlyDuplicates, onlyUnique, onlyUnique2, sum, sumAllKeys, sumObjectParameters, takeFirst, generateDateId, generateRandomString, getCurrentDate, getDatesArray, getFirstEmoji, getHumanReadableAgoTime, getHumanReadableDatetime, getNumberOfLines, getObjectKeysArray, getParameterAtLocation, getQueryPath, getStringSizeSummary, getSubsetFromObject, getYoutubeId, hasAllLetters, hashCode, isAbsoluteImport, isArrayEqual, isPhoneNumber, isUrl, mapAsync, mapMany, mergeNestedObject, mergeObjectsArray, mapValuesSync, mapKeys, objectMapAsync, objectMapSync, objectMapToArray, objectValuesMap, mergeObjects, omitUndefinedValues, pickArrayItemsRandomly, pickRandomArrayItem, pipelinify, promisifyValue, queueThis, removeOptionalKeysFromObject, replaceLastOccurence, runFunctionWithTimeout, simplifyOpenapi, sleep, splitObject, trimSlashes, tryJsonStringify, tryParseJson, uniqueSlug, unwrapJson, allowedSearchContentExtensions, buildFolderName, cliFileExtension, codeExtensions, databaseFolderName, extensions, fileSystemConventions, fileTypes, folderNames, frontendOptionalFileSubExtensions, generatedFolders, getFileTypeFromPath, getWriterType, gitFolderName, hasSpecificSubExtension, ignorableFileAndFolderNames, ignorableFilenames, indexFolderName, isGeneratedOperation, isGeneratedOperationName, isIndexableFileId, jsonExtensions, jsonExtensionsConst, markdownExtensions, markdownExtensionsConst, movedFileSubextension, nextBuildFolderName, nodeModulesFolderName, operationUnindexableNamesOrSubExtensions, possibleSubExtensions, projectRelativeGeneratedOperationsFolder, sourceFolderName, subExtensions, temporaryConvertedSubextension, testFileExtension, turboFolderName, typescriptExtensions, typescriptExtensionsConst, unregulatedFolders, 
// From fs-util-js
getExtension, getFileOrFolderName, getFolderJs, getSubExtension, isPathRelative, makeRelative, pathJoin, removeTrailingSlash, withoutExtension, withoutNumbersSuffix, withoutSubExtensions, cleanupTimer, generateUniqueId, getNewPerformance, datasetConfig, datasetConfigKeys, datasetFilterOperatorConst, dbStorageMethods, dbStorageMethodsConst, downloadConfig, generateTime, getCreatedTimeObject, getFunctionExersize, getIsFunctionExposed, getTimeObject, getUpdatedTimeObject, indexDbModelFolders, indexDbModels, isEmail, languages, markdownParseToMarkdownModelType, mimeTypes, modelViews, openFileConfig, operationClassificationConst, operationConfig, ormStorageMethods, parseMarkdownModelTimestamp, queueConfig, runEveryPeriodReadonlyArray, runEveryPeriodStringArray, schemaItemConfig, testInterfaceConfig, tryParseDate, typescriptIndexModels, 
// From edge
getUrlParams, jsonGetter, jsonPost, qStashCancelAllMessages, qStashFanOut, qStashSend, };
//# sourceMappingURL=index.js.map