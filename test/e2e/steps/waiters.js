let { Then, When, Given } = require(`cucumber`);
const logger = require('../config/loggerConfig').logger
const path = require(`path`);
const stepFunctions = require(path.resolve(`./test/e2e/steps/stepFunctions.js`));
When(/^I wait until "([^"]*)" tab appears$/, async (number) => { // next, previous
    logger.info(`I wait until ${number} tab appears`);
    logger.debug(await stepFunctions.tabCondition(number));
    return browser.wait(await stepFunctions.tabCondition(number), 5000);
  });