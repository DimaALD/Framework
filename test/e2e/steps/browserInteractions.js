"use strict";
let { Then, When, Given } = require(`cucumber`);

const path = require(`path`);
const logger = require(path.resolve(`./test/e2e/config/loggerConfig.js`)).logger;

When(/^I open "([^"]*)" url$/, (url) => {
  logger.info(`I open ${url} url`);
  return browser.get(url);
});

When(/^I switch to "([^"]*)" tab$/, async (number) => { // next, previous, any number
  logger.info(`I switch to ${number} tab`);
  const tab = await stepFunctions.getTab(number);
  browser.switchTo().window(tab);
  angularManager.manage();
return browser.refresh(1000);
});