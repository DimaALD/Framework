let obj = {
    x : 10,
    getX : () => {
        this.x = 49;
        return this.x;
    }
}

var x = 540;

let fun = function (a, b , c) {
    return a + b + c + this.x;
}
let sum = fun.bind(obj)

console.log(sum(12,2,3))