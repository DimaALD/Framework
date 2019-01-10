const path = require(`path`);
const EC = protractor.ExpectedConditions;
const pageSelector = require(path.resolve(`./test/e2e/utils/pageSelector.js`));
const logger = require(path.resolve(`./test/e2e/config/loggerConfig.js`)).logger;

const getWebElement = async (alias) => {
let pageObject = (await pageSelector.getCurrentPage())[alias];
if(pageObject[`isCollection`]){
    pageElement = await $$(pageObject.selector);
    return pageElement;
}else{
    pageElement = await $(pageObject.selector);
    return pageElement;
}
}

const getWebElementByText = async (alias, text) => {
let itemsLocator = (await pageSelector.getCurrentPage())[alias].items
let webElement = await getWebElement(alias)
let array = await webElement.$$(itemsLocator);
logger.debug(array.length)
for(let i = 0; i < array.length;i++){
    if(await array[i].getText() === text){
        return array[i]
    }
}
throw new Error(`Elemrnt with text ${text} wasn't found`)
}

const getTab = async (tab) => {
    let currentTab = browser.getWindowHandle();
    let allTabs = browser.getAllWindowHandles();
    let currentTabIndex = allTabs.indexOf(currentTab);
    switch(tab){
        case "next" : {
            tab = await allTabs[currentTabIndex + 1];
            break;
        }
        case "previos" :{
            tab = await allTabs[currentTabIndex - 1];
            break;
        }
    }
    return tab;
}

module.exports = {
    getWebElement,
    getWebElementByText,
    getTab
}