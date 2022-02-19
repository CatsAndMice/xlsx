const { eq } = require("medash");
const bugStates = new Set(['已解决', '已关闭']);
//计算解决率:已解决bug数/本人总共的bug数
const resolutionRate = (resolveBugCount, selfBugCount) => {
    if (eq(resolveBugCount, selfBugCount)) return 1;
    return Number((resolveBugCount / selfBugCount).toFixed(2));
}

module.exports = (data = [], { resolverIndex, bugIdIndex, bugStateIndex }) => {
    const maps = new Map();
    const allBugCount = data.length - 1;
    data.slice(1).forEach(val => {
        const resolver = val[resolverIndex];
        const bugId = val[bugIdIndex];
        const isResolve = bugStates.has(val[bugStateIndex]);
        if (maps.has(resolver)) {
            const value = maps.get(resolver);
            value.selfBugCount++;
            value.bugIds.push(bugId);
            if (isResolve) {
                //已解决
                value.resolveBugCount++;
            } else {
                //未解决
                value.noResolveBugCount++;
            }

            //重新计算解决率
            value.resolutionRate = resolutionRate(value.resolveBugCount, value.selfBugCount)
            return
        }
        maps.set(resolver, {
            selfBugCount: 1,
            allBugCount,
            resolver,
            bugIds: [bugId],
            resolveBugCount: isResolve ? 1 : 0,
            noResolveBugCount: isResolve ? 0 : 1,
            resolutionRate: resolutionRate(this.resolveBugCount, this.selfBugCount)
        })
    })
    return Array.from(maps.values());
}