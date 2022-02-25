const { toArray } = require('./utiles');
const owneds = new Map();
module.exports = ({ owned, bugId, isResolve, resolutionDate,precedence, assignDate, createDate }) => {
    //出现,解决日期比指派日期(关闭时间)更小的情况
    const start = new Date(createDate).getTime(); //assignDate
    const end = new Date(resolutionDate).getTime();
    const item = {
        bugId,
        resolutionTime: isResolve ? Math.floor(Math.abs(end - start) / 1000 / 60) : null,
        isResolve:+isResolve,
        precedence,
        createDate
    }
    item.resolutionDate = isResolve ? resolutionDate : null;
    if (owneds.has(owned)) {
        const value = owneds.get(owned);
        value.bugIds.push(item);
    } else {
        owneds.set(owned, { owned, bugIds: [item] });
    }
    return toArray(owneds.values());
}