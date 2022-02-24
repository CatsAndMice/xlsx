const toArray = (value) => Array.from(value);
const bugStates = new Set(['已解决', '已关闭']);
module.exports = {
    toArray,
    bugStates
} 