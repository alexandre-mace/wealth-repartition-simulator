export default function getWordCount(text) {
    const regex = /\s+/gi;
    return text.trim().replace(regex, ' ').split(' ').length;
}