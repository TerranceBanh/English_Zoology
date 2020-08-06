'use strict'

const randomAnswer = ({arr, a}) => {
    if (!isArray(arr)) {
        console.error('"arr" requires array data type')        
        return
    }
    if (!isArray(a) && !isString(a)) {
        console.error('"a" requires array or string data type')        
        return
    }
    let num = Math.floor(Math.random() * arr.length)
    if (isArray(a)) {// Algorithm for "a" as an array
        for (;!a.every(e => e.str !== arr[num]) ;) {
            num = Math.floor(Math.random() * arr.length)
        }
    }
    else {// Algorithm for "a" as string
        for (;arr[num] === a;) {
            num = Math.floor(Math.random() * arr.length)
        }        
    }
    let propArr = []
    for (const prop in arr[num]) {
        propArr.push(prop)
    }
    let prop = Math.floor(Math.random() * propArr.length)
    return arr[num][propArr[prop]]
}
