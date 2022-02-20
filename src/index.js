const fs = require('fs/promises');
const nodeXlsx = require('node-xlsx');
const path = require("path");
const getIndex = require("./getIndex");
const createObject = require('./createObject');
const name = 'w1'
const resolve = (value) => path.join(__dirname, value);
const workSheetsFromFile = nodeXlsx.parse(resolve(`../xlsx/${name}.xlsx`));
const bugs = workSheetsFromFile[0].data;
const titles = bugs[0];
const data = createObject(bugs, {
    resolverIndex: getIndex(titles, "解决者"),
    bugIdIndex: getIndex(titles, "Bug编号"),
    bugStateIndex: getIndex(titles, "Bug状态"),
    assignedIndex: getIndex(titles, "指派给")
});
fs.writeFile(resolve(`../json/${name}.json`), JSON.stringify(data));
