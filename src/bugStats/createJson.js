const fs = require('fs/promises');
const { toStringify,resolve } = require('./utiles');
module.exports = (name, data) => {
    const { versions, versionCounst, master } = data;
    fs.writeFile(resolve(`../../json/${name}-versions.json`), toStringify(versions));
    fs.writeFile(resolve(`../../json/${name}-version-count.json`), toStringify(versionCounst));
    fs.writeFile(resolve(`../../json/${name}-master.json`), toStringify(master));
}