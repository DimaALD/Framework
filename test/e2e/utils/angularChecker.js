let isAngularPresent = async () => {
    let isAngularPresent = browser.executeScript("return window.angular");
    if(isAngularPresent){
        return true;
    }else{
        return false;
    }
}
module.exports = {
    isAngularPresent
}