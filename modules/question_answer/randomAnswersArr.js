'use strict'

const randomAnswersArr = ({ rights, wrongs, choices }) => { // Figure out a better algorithm to better randomize the right answer
    if (!isArray(rights) && !isString(rights)) {
        console.error('"rights" requires array/string data type')
        return "randomAnswerArr() Error"
    }
    // For better code readability
    let rightsArr
    let rightsStr
    if (isArray(rights)) rightsArr = rights
    else rightsStr = rights

    if (!isArray(wrongs)) {
        console.error('"wrongs" requires array data type') 
        return "randomAnswerArr() Error"
    }
    // For better code readability
    let wrongsArr = wrongs

    if (!isNumber(choices)) {
        console.error('"choices" requires numberic data type') 
        return "randomAnswerArr() Error"
    }
    if (isArray(rights) && rights.length > choices) {
        console.error('"rights" array length must not be less than "choices" value')
        console.error('assigning "rights.length" value to "choices" ')
        choices = rights.length 
    }

    let arr = []
    shuffle(wrongs)
    if (isArray(rights)) {
        let rightsLen = rightsArr.length // Cached for performance
        for (let i = 0; i < rightsLen; i++) {
            arr.push({ str: rightsArr[i], bool: true })
        }
        
        if (choices > wrongsArr) choices = wrongsArr.length - rightsLen
        else choices = choices - rightsLen
        for (let i = 0; i < choices; i++) {
            arr.push({ str: wrongsArr[i], bool: false })
        }
    }
    else {
        arr.push({ str: rightsStr, bool: true })
        
        if (choices > wrongsArr) choices = wrongsArr.length - 1
        else choices = choices - 1
        for (let i = 0; i < choices; i++) {
            arr.push({ str: wrongsArr[i], bool: false })
        }
    }

    return shuffle(arr)
}