const { isEmpty, eq } = require("medash");
const { toArray, bugStates } = require('./utiles');
const resolutionRate = require('./resolutionRate');
const getMaster = require('./getMaster');

const setValue = (maps, { owned, bugId, isResolve }) => {
    if (maps.has(owned)) {
        const value = maps.get(owned);
        value.counts++;
        value.bugIds.push(bugId);
        if (isResolve) {
            //已解决
            value.resolveBugCount++;
        }
        //重新计算解决率
        value.resolutionRate = resolutionRate(value.resolveBugCount, value.counts)
        return
    }
    const resolveBugCount = isResolve ? 1 : 0;
    const curVersionUserBugInfo = {
        counts: 1,
        owned,
        bugIds: [bugId],
        resolveBugCount,
        resolutionRate: resolutionRate(resolveBugCount, 1)
    }
    maps.set(owned, curVersionUserBugInfo);
}



const getVersions = (versionsMap, ...rest) => {
    let master = [];
    //各个版本信息
    const versionInfo = new Map();
    const keys = toArray(versionsMap.keys());
    const [{ ownedIndex, bugIdIndex, assignedIndex, bugStateIndex, allBugCounts, assignIndex, resolutionIndex, createIndex, precedenceIndex }] = rest;
    const counts = { '全部': allBugCounts };
    keys.forEach((key) => {
        const values = versionsMap.get(key);
        //当前版本的bug数
        counts[key] = values.length;
        const userMap = new Map();
        values.forEach(value => {
            const owned = value[ownedIndex];
            const bugId = value[bugIdIndex];
            const assigned = value[assignedIndex];
            const isResolve = bugStates.has(value[bugStateIndex]);
            const query = { owned, bugId, isResolve };
            if (isEmpty(owned)) {
                query.owned = assigned;
            }
            setValue(userMap, { owned, bugId, isResolve });
            if (eq(key, '生产环境')) {
                //无确认bug日期  ,bug解决时长 = 解决日期-指派日期
                master = getMaster({
                    owned,
                    bugId,
                    isResolve,
                    assignDate: value[assignIndex],
                    createDate: value[createIndex],
                    resolutionDate: value[resolutionIndex],
                    precedence: value[precedenceIndex]
                });
            }
        })
        versionInfo.set(key, {
            version: key,
            counsts: counts[key],
            user: toArray(userMap.values())
        })


    })
    return { versions: toArray(versionInfo.values()), versionCounst: counts, master };
}

module.exports = async (data = [], { ownedIndex, bugIdIndex, bugStateIndex, assignedIndex, effectVersionIndex, assignIndex, precedenceIndex, resolutionIndex, createIndex }) => {
    const versionsMap = new Map();
    const allBugCounts = data.length;
    data.slice(1).forEach(val => {
        const effectVersion = val[effectVersionIndex].replace(/\(.+\)/g, '');
        if (versionsMap.has(effectVersion)) {
            const value = versionsMap.get(effectVersion);
            value.push(val)
        } else {
            versionsMap.set(effectVersion, [val]);
        }
    })

    return getVersions(versionsMap, { ownedIndex, bugIdIndex, bugStateIndex, assignedIndex, precedenceIndex, allBugCounts, assignIndex, resolutionIndex, createIndex });
}


//分组
