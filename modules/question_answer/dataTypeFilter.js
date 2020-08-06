'use strict'

// Filter array of flat objects
// Filter can choose objects with same key
// Filter can choose a single object

const dataTypeFilter = ({ arr, filter }) => {
    if (!isArray(arr)) {
        console.error('"arr" requires array data type') 
        return "dataTypeFilter() Error"
    }
    else if (!isArray(filter) && !isString(filter) && !isNumber(filter)) {
        console.error('"filter" requires array/string/number data type') 
        return "dataTypeFilter() Error"
    }

    // If filter is an array return array of values of requested object keys
    let arrLen = arr.length // Cached for performance
    let arrNew = [...arr] // Avoid reference
    if (isString(filter)) {
        for (let i = 0; i < arrLen; i++) {
            arrNew[i] = arrNew[i][filter]
        }
    }

    // If filter is a string return array of values of requested object key
    else if (isArray(filter)) {
        let arr1 = []
        let filterLen = filter.length // Cached for performance
        for (let i = 0; i <filterLen; i++) {
            for (let j = 0; j < arrLen; j++) {
                arr1.push(arrNew[j][filter[i]])
            }
        }
        arrNew = arr1
    }

    // If filter is a number return indexed object of array
    else if (isNumber(filter)) {
        arrNew = Object.values(arrNew[filter])
    }
    return arrNew
}