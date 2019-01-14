const path = require(`path`);
const EC = protractor.ExpectedConditions;
const pageSelector = require(path.resolve(`./test/e2e/utils/pageSelector.js`));
const logger = require(path.resolve(`./test/e2e/config/loggerConfig.js`)).logger;

let getPageObjectElement = async (alias) => {
    let pageElement = (await pageSelector.getPage())[alias];
    if (alias.includes(`>`)) {
      const elements = alias.split(` > `);
      const firstPO = (await pageSelector.getPage())[elements.shift()];
      const firstElement = await getElement(firstPO);
      return getNestedElement(firstPO, firstElement, elements);
    } else {
      return getElement(pageElement);
    }
  };

  let getNestedElement = async (parentPO, currElement, nestedPO) => {
    if (nestedPO.length === 0) {
      return currElement;
    } else {
      let result = [];
      let currPageElement = parentPO.children[nestedPO.shift()];
      if (!Array.isArray(currElement)) {
        if (currPageElement[`isCollection`]) {
          result = await currElement.$$(currPageElement.selector);
        } else {
          result = await currElement.$(currPageElement.selector);
        }
        return getNestedElement(currPageElement, result, nestedPO);
      } else {
        for (let i = 0; i < currElement.length; i++) {
          if (currPageElement[`isCollection`]) {
            result.concat(await currElement[i].$$(currPageElement.selector));
          } else {
            result.push(await currElement[i].$(currPageElement.selector));
          }
        };
        return getNestedElement(currPageElement, result, nestedPO);
      }
    }
  };

let getWebElement = async (alias) => {
let pageObject = (await pageSelector.getCurrentPage())[alias];
if(pageObject[`isCollection`]){
    pageElement = await $$(pageObject.selector);
    return pageElement;
}else{
    pageElement = await $(pageObject.selector);
    return pageElement;
}
}

let getWebElementByText = async (alias, text) => {
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

let expectedCondition = async (condition) => {
    let expectedConditionFunction;
    switch(condition){
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

let getTab = async function (tab) {
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
        default:
        logger.error(`Wrong tab position provided: [${tab}]`);
        throw new Error(`Wrong tab position provided.`);
    }
    return await tab;
}

let tabCondition = async function (condition) {
    let expectedConditionFunction;
    expectedConditionFunction = getTab.bind(null, condition);
    return expectedConditionFunction;
}

module.exports = {
    getWebElement,
    getWebElementByText,
    getTab,
    expectedCondition,
    tabCondition
}