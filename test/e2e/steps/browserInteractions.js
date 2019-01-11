"use strict";
let { Then, When, Given ,setDefaultTimeout} = require(`cucumber`);

const path = require(`path`);
const logger = require(path.resolve(`./test/e2e/config/loggerConfig.js`)).logger;
const stepFunctions = require(path.resolve(`./test/e2e/steps/stepFunctions.js`));
const isAngular = require(path.resolve(`./test/e2e/utils/angularChecker.js`)).isAngular;
setDefaultTimeout(60 * 1000);

When(/^I open "([^"]*)" url$/, (url) => {
  logger.info(`I open ${url} url`);
  return browser.get(url);
});

When(/^I switch to "([^"]*)" tab$/, async (number) => { // next, previous
  logger.info(`I switch to ${number} tab`);
  let tab = await stepFunctions.getTab(number);
  browser.switchTo().window(tab);
  browser.ignoreSynchronization = await isAngular;
  return browser.refresh(1000);
});