const { eq } = require('medash');
const isArray = (value) => Array.isArray(value);
module.exports = (data, value) => {
    if (!isArray(data)) return;
    return data.findIndex(val => {
        return eq(val, value);
    })
}