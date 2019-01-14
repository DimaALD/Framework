let f1 = (tab)=>{
    let result;
    switch(tab){
        case "next":{
            result = "NEXT TAB"
            break;
        }
        case "previos":{
            result = "PREVIOS TAB"
            break;
        }
    }
    return result
}

let f2 = f1.bind(null,"previos")
console.log(f2())