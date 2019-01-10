/* eslint-disable no-undef */
const path = require(`path`);
const logger = require(path.resolve(`./test/e2e/config/loggerConfig.js`)).logger;

const PageObjects = {
    "MAIN": {
      po: require(path.resolve(`./test/e2e/pages/mainPage.json`)),
      symptomes: [/^https:\/\/www\.sandisk\.com\/$/, /home\/extreme-team$/]
    }
};

async function getCurrentPage () {
  const currUrl = await browser.getCurrentUrl();
  logger.debug(`currurl - ${currUrl}`);
  for (const key in PageObjects) { // It checks every ENUM page
    for (let i = 0; i < PageObjects[key].symptomes.length; i++) {
      if (PageObjects[key].symptomes[i].test(currUrl)) {
        logger.debug(`PageObject - ${key}`);
        return PageObjects[key].po;
      }
    };
  }
}

module.exports = {
  getCurrentPage
};