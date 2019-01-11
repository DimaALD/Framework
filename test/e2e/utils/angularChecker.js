let isAngular = async () => {
    let isAngular = browser.executeScript("return window.angular");
    if(isAngular){
        return true;
    }else{
        return false;
    }
}
module.exports = {
    isAngular
}