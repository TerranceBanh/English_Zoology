'use strict'

const duplicateAudit = (arr) => {// Take array of objects with property str and replaces matching string value
    // YOU MIGHT HAVE A BUG HERE
    let questionsLen = arr.length   // Cached for performance
    let filterArr = []

    // Replaces duplicate answers with placeholder text
    for (let i = 0; i < questionsLen; i++) {
        let answersArr = arr[i].answers // Cached for performance
        let answersLen = answersArr.length // Cached for performance
        let library = arr[i].library 
        for (let j = 0; j < answersLen; j++) {
            let answer1 = answersArr[j].str // Cached for performance
            for (let i = 0; i < 4; i++) { // PROCESS IS TEMPORARILY DUPLICATED TO DEAL WITH BUG
                for (let k = 0; k < answersLen; k++) {
                    let answer2 = answersArr[k].str
                    if (answer1 === answer2 && j !== k) {
                        // TESTING CODE
                        // To ensure removal of a duplicate correct answer1 that indicates as wrong
                        let index
                        if (answersArr[k].bool === false) index = k
                        else index = j
                        // TESTING CODE
                        answersArr.splice(index, 1, { str: 'DUPLICATE ANSWER', bool: false })
                    }
                }
                
            }


        }
        for (let j = 0; j < answersLen; j++) {
            if (answersArr[j].str !== 'DUPLICATE ANSWER') filterArr.push(answersArr[j])
        }
        for (let j = 0; j < answersLen; j++) {
            if (answersArr[j].str === 'DUPLICATE ANSWER')            
                answersArr.splice(j, 1, { str: randomAnswer({ arr: answers[library], a: filterArr, }), bool: false }),
                filterArr.push(answersArr[j])
        }
        filterArr = []
        // console.log(arr[i].answers)
    }
    return arr
}