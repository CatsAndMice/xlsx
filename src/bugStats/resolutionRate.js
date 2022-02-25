const { eq, isEmpty } = require("medash");
//计算解决率:已解决bug数/本人总共的bug数
module.exports = (resolveBugCount, selfBugCount) => {
    if (isEmpty(resolveBugCount)) return 0;
    if (eq(resolveBugCount, selfBugCount)) return 1;
    return Number((resolveBugCount / selfBugCount).toFixed(2));
}
