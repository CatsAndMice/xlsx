const fs = require('fs/promises');
const nodeXlsx = require('node-xlsx');
const path = require("path");
const getIndex = require("./getIndex");
const createObject = require('./createObject');
const name = 'w2'
const resolve = (value) => path.join(__dirname, value);
const workSheetsFromFile = nodeXlsx.parse(resolve(`../xlsx/${name}.xlsx`));
const bugs = workSheetsFromFile[0].data;
const titles = bugs[0];
console.log(titles);
console.log( getIndex(titles, "指派日期"));
const { versions, versionCounst, master } = createObject(bugs, {
    ownedIndex: getIndex(titles, "解决者"),
    bugIdIndex: getIndex(titles, "Bug编号"),
    bugStateIndex: getIndex(titles, "Bug状态"),
    assignedIndex: getIndex(titles, "指派给"),
    effectVersionIndex: getIndex(titles, "影响版本"),
    createIndex: getIndex(titles, "创建日期"),
    assignIndex: getIndex(titles, "指派日期"),
    resolutionIndex: getIndex(titles, "解决日期"),
    precedenceIndex: getIndex(titles, "优先级")
});
fs.writeFile(resolve(`../json/${name}-versions.json`), JSON.stringify(versions));
fs.writeFile(resolve(`../json/${name}-version-count.json`), JSON.stringify(versionCounst));
fs.writeFile(resolve(`../json/${name}-master.json`), JSON.stringify(master));