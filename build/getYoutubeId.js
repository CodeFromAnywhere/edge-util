"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYoutubeId = void 0;
var getYoutubeId = function (url) {
    if (!url)
        return;
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    }
    return;
};
exports.getYoutubeId = getYoutubeId;
//# sourceMappingURL=getYoutubeId.js.map