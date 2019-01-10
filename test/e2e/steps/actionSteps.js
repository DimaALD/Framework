let { Then, When, Given } = require(`cucumber`);
const path = require(`path`);
const logger = require(path.resolve(`./test/e2e/config/loggerConfig.js`)).logger;
const stepFunctions = require(path.resolve(`./test/e2e/steps/stepFunctions.js`));
// const angularManager = require(path.resolve(`./test/e2e/utils/angularManager.js`));

When(/^I click "([^"]*)" in "([^"]*)"$/, async (text, alias) => {
    logger.info(`I click ${alias}`);
    return (await stepFunctions.getWebElementByText(alias, text)).click();
  });