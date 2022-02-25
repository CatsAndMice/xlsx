const nodeXlsx = require('node-xlsx');
const getIndex = require("./getIndex");
const createObject = require('./createObject');
const createJson = require('./createJson');
const { resolve } = require('./utiles');
const name = 'w2'
const workSheetsFromFile = nodeXlsx.parse(resolve(`../../xlsx/${name}.xlsx`));
const bugs = workSheetsFromFile[0].data;
const titles = bugs[0];
createObject(bugs, {
    ownedIndex: getIndex(titles, "解决者"),
    bugIdIndex: getIndex(titles, "Bug编号"),
    bugStateIndex: getIndex(titles, "Bug状态"),
    assignedIndex: getIndex(titles, "指派给"),
    effectVersionIndex: getIndex(titles, "影响版本"),
    createIndex: getIndex(titles, "创建日期"),
    assignIndex: getIndex(titles, "指派日期"),
    resolutionIndex: getIndex(titles, "解决日期"),
    precedenceIndex: getIndex(titles, "优先级")
}).then(result => createJson(name, result))
