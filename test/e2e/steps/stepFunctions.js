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
for(let i = 0; i < array.length;i++){
    if(await array[i].getText() === text){
        return array[i]
    }
}
throw new Error(`Element with text ${text} wasn't found`)
}

let expectedCondition = async (conditon) => {
    let expectedConditionFunction;
    switch(conditon){
            case "present":
                expectedConditionFunction = EC.presenceOf.bind(EC);
                break;
            case "clickable":
                expectedConditionFunction = EC.elementToBeClickable.bind(EC);
                break;
            case "visible":
                expectedConditionFunction = EC.visibilityOf.bind(EC);
                break;
            case "invisible":
                expectedConditionFunction = EC.invisibilityOf.bind(EC);
                break;
            case "selected":
                expectedConditionFunction = EC.elementToBeSelected.bind(EC);
                break;
            case "gone":
                expectedConditionFunction = EC.stalenessOf.bind(EC);
                break;
            default:
                logger.error(`Wrong expected condition provided: [${shouldBe}]`);
                throw new Error('Wrong expected condition provided.');
        }
        return expectedConditionFunction;
    }


    
const getTab = async (tab) => {
    let currentTab = await browser.getWindowHandle();
    let allTabs = await browser.getAllWindowHandles();
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
    getTab,
    expectedCondition
}