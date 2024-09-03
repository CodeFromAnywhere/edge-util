export const getYoutubeId = (url) => {
    if (!url)
        return;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    }
    return;
};
//# sourceMappingURL=getYoutubeId.js.map