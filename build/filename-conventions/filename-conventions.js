"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileSystemConventions = exports.possibleSubExtensions = exports.subExtensions = exports.operationUnindexableNamesOrSubExtensions = exports.testFileExtension = exports.cliFileExtension = exports.frontendOptionalFileSubExtensions = exports.projectRelativeGeneratedOperationsFolder = exports.temporaryConvertedSubextension = exports.movedFileSubextension = exports.ignorableFileAndFolderNames = exports.folderNames = exports.ignorableFilenames = exports.generatedFolders = exports.turboFolderName = exports.gitFolderName = exports.nextBuildFolderName = exports.nodeModulesFolderName = exports.indexFolderName = exports.sourceFolderName = exports.databaseFolderName = exports.buildFolderName = exports.unregulatedFolders = void 0;
/**
 * Not regulated regarding file naming conventions
 */
exports.unregulatedFolders = [
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
    ".index",
];
exports.buildFolderName = "build";
exports.databaseFolderName = "db";
exports.sourceFolderName = "src";
// NB: not included in generated
exports.indexFolderName = ".index";
exports.nodeModulesFolderName = "node_modules";
exports.nextBuildFolderName = ".next";
exports.gitFolderName = ".git";
exports.turboFolderName = ".turbo";
exports.generatedFolders = [
    exports.buildFolderName,
    exports.nodeModulesFolderName,
    exports.nextBuildFolderName,
    exports.gitFolderName,
    exports.turboFolderName,
];
exports.ignorableFilenames = {
    dsStore: ".DS_Store",
    htaccess: ".htaccess",
    iconFile: "Icon\r",
};
exports.folderNames = {
    buildFolderName: exports.buildFolderName,
    databaseFolderName: exports.databaseFolderName,
    sourceFolderName: exports.sourceFolderName,
    nodeModulesFolderName: exports.nodeModulesFolderName,
    nextBuildFolderName: exports.nextBuildFolderName,
    gitFolderName: exports.gitFolderName,
    turboFolderName: exports.turboFolderName,
};
var projectRelativeToolsPath = "packages";
exports.ignorableFileAndFolderNames = Object.values(exports.ignorableFilenames).concat(exports.generatedFolders);
/**
 * subextension indicating that a file has been moved to another location
 *
 * For example, used in `watchAppleMemos`
 */
exports.movedFileSubextension = "moved";
/**
 * This is a temporary file for conversion with ffmpeg (see ffmpeg-util)
 */
exports.temporaryConvertedSubextension = "converted";
exports.projectRelativeGeneratedOperationsFolder = "".concat(projectRelativeToolsPath, "/generated");
/**
 * these special operations are generated, so should not be copied, but should be generated in the bundle after everything is copied
 */
exports.frontendOptionalFileSubExtensions = [
    "native",
    "ios",
    "android",
    "web",
];
exports.cliFileExtension = "cli";
exports.testFileExtension = "test";
exports.operationUnindexableNamesOrSubExtensions = ["cli", "test"];
exports.subExtensions = {
    cliFileExtension: exports.cliFileExtension,
    testFileExtension: exports.testFileExtension,
};
exports.possibleSubExtensions = [
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
    "schema", //used for .schema.json files
    "template", //used for templates
    // deprecated
    "wav",
    "clean",
    "todo",
    "index", //replaced with MarkdownIndex
];
/**
 * All filesystem conventions in a single object for easy access
 */
exports.fileSystemConventions = {
    folderNames: exports.folderNames,
    subExtensions: exports.subExtensions,
};
//# sourceMappingURL=filename-conventions.js.map