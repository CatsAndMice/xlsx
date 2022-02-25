const path = require("path");
const toArray = (value) => Array.from(value);
const bugStates = new Set(['已解决', '已关闭']);
const toStringify = (value) => JSON.stringify(value);
const resolve = (value) => path.join(__dirname, value);
module.exports = {
    toArray,
    bugStates,
    toStringify,
    resolve
} 