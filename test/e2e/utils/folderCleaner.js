const fs = require(`fs-extra`);
const path = require(`path`);

function cleanFolder () {
  if (!fs.emptyDirSync(`./reports/`) || !fs.emptyDirSync(`./logs/`)) {
    fs.emptyDirSync(path.resolve(`./reports/`));
    fs.emptyDirSync(path.resolve(`./logs/`));
  }
}

cleanFolder();

module.exports = {
  cleanFolder
}