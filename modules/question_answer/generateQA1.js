'use strict'

// question will take either an array of strings or a string
// question will use answers array to generate question with it's a generic strings
// choices will limit the number of answers for each question
// ADD OPTION TO RANDOMIZE QUESTION TYPES PER GENERIC QUESTION USING 2D ARRAY FOR QUESTION TYPES PARAMETER

// Seperate Array of strings that will be added on to question strings
// Seperate Array of strings that will be added to answers array per question
// Each questiontringAddon can be cross referenced based on index number

// A function that would automate the use of randomQA for more instances
const generateQA1 = ({ question, answers, choices, library }) => { // Requires multiple choice
    if (typeof question.text === undefined) {
        console.error('"question.text" is undefined')
        return "randomQA() Error"
    }
    else if (!isString(question.text)) {
        console.error('"question.text" requires string data type')
        return "randomQA() Error"
    }

    if (typeof question.type === undefined) {
        console.error('"question.type" is undefined')
        return "randomQA() Error"
    }
    else if (!isString(question.type)) {
        console.error('"question.type" requires string data type')
        return "randomQA() Error"
    }

    for (let i = 0,
        types = [
            'multiChoice','multiAnswer','fillInTheBlank',
            'labelImage','match','trueFalse',
        ],
        length = types.length; 
        i < length; 
        i++
    ) {
        if (question.type === types[i]) break 
        else if (i === length - 1) {
            console.error(`"question.type" requires one of the following strings: ${types}`)
            return "randomQA() Error"
        }
    }

    if (typeof question.addon === undefined) {
        console.error('"question.addon" is undefined')
        return "randomQA() Error"
    }
    else if (!isArray(question.addon)) {
        console.error('"question.addon" requires an array data type')
        return "randomQA() Error"
    }
    
    for (let i = 0, length = question.addon.length; i < length; i++) {
        if (!isNumber(question.addon[i]) && !isString(question.addon[i])) {
            console.error(`"question.addon[${i}]" requires string/number data type`)
            return "randomQA() Error"
        }
    }
    
    if (!isArray(answers)) {
        console.error('"answers" requires array data type') 
        return "randomQA() Error"
    }

    if (
        ((
            allTrue = x => x.reduce((e1, e2) => e1 === false ? false :e1 === e2),
            boolArr1 = [],
            boolArr2 = [],
            boolArr3 = [],
            bool = true,
            length = answers.length
        ) => {
            for (let i = 0; i < length; i++) {
                if (isArray(answers[i])) {
                    boolArr1[i] = true
                    for (let j = 0, length = answers[i].length; j < length; j++) {
                        if (isString(answers[i][j]) || isNumber(answers[i][j])) boolArr3[j] = true
                        else boolArr3[j] = false
                    }
                }
                else boolArr1[i] = false
            }
            for (let i = 0; i < length; i++) {
                if (isString(answers[i]) || isNumber(answers[i])) boolArr2[i] = true
                else boolArr2[i] = false
            }

            if (allTrue(boolArr1) || allTrue(boolArr2)) bool = false

            if (!allTrue(boolArr1) && bool) {
                console.error('"answers" elements requires either array or string/number data type') 
                return !bool
            }

            if (!allTrue(boolArr2) && bool) {
                console.error('"answers" elements requires either array or string/number data type') 
                return !bool
            }
            if (boolArr3.length !== 0 && !allTrue(boolArr3)) {
                console.error('"answers" nested array elements requires string/number data type') 
                return !bool
            }


            if (boolArr3.length !== 0 && !answers.every((e, i, arr) => {
                if (i === arr.length - 1) return true
                else if (i !== arr[i].length - 1) return arr[i].length === arr[i+1].length
                else return true
            })) {
                console.error('"answers" nested arrays requires the same number of elements') 
                return !bool
            }

            return bool
        })()
    ) {return "randomQA() Error"}

    if (!isNumber(choices)) {
        console.error('"choices" requires number data type')
        return "randomQA() Error"
    }

    if (!isString(library)) {
        console.error('"library" requires string data type')
        return "randomQA() Error"
    }

    const arr1 = []
    for (let i = 0, length = question.addon.length; i < length; i++) {
        const obj = {}
        obj.question = {}
        obj.question.text = question.text.replace('"..."', question.addon[i])
        obj.question.type = question.type
        obj.answers = []
        switch(question.type) {

            case 'multiChoice':
                for (let length = answers.length, arr2 = [], j = choices - 1; 0 < j;) {
                    
                    const random = ((num = Math.floor(Math.random() * length)) => {
                        for (let k = 0, arr2Len = arr2.length; k < arr2Len; k++) {
                            if (num === arr2[k]) {
                                num = Math.floor(Math.random() * length)
                                k = 0
                            }
                        }
                        return num
                    })()

                    if (j === random) continue // if same answer as correct answer then loop
                    else obj.answers.push({ str: answers[random], bool: false }), j--, arr2.push(random) // else a
                }
                obj.answers.push({ str: answers[i], bool: true })
                break
                
            case 'multiAnswer':
                 ;((arr2 = []) => {
                    for (let j = 0, length1 = answers.length; j < length1; j++) {
                        arr2.push([])
                    }
                    
                    for (let length1 = answers.length, j = choices; 0 < j;) {
                        const random1 = Math.floor(Math.random() * (length1))
    
                        const random2 = ((num2 = Math.floor(Math.random() * answers[random1].length)) => {
                            for (let k = 0, arr2Len = arr2.length; k < arr2Len; k++) {
                                if (arr2[random1] === arr2[random1][k]) {
                                    num2 = Math.floor(Math.random() * length2)
                                    k = 0
                                }
                            }
                            return num2
                        })()
    
    
                        if (answers[random1].includes(question.addon[i])) continue // if same answer as correct answer then loop
                        else obj.answers.push({ str: answers[random1][random2], bool: false }), j--, arr2[random1].push(random2) // else a
                    }
                })()
                for (let j = 0; j < length; j++) {
                    if (question.addon[i] === question.addon[j]) continue
                    else obj.answers.push({ str: question.addon[j], bool: true })
                }
                break   
            case 'labelImage':
                break
                
            case 'fillInTheBlank':
                break

            case 'match':
                break

            case 'trueFalse':
                break
        }
        shuffle(obj.answers)
        obj.library = library
        arr1.push(obj)
    }
    return arr1
}

// question Array Element Template
/*
...generateMultiQA({
    question: {
        text: 'Question',
        type: 'TYPE',
        addon: dataTypeFilter({
            arr: answer.PROPERTY,
            filter: 'PROPERTY',
        })
    },
    answers: dataTypeFilter({
        arr: answer.Property,
        filter: 'PROPERTY',
    }),
    choices: 6,
    library: 'LIBRARY'
})

...generateMultiQA({
    question: {
        text: 'Question',
        type: 'TYPE',
        addon: dataTypeFilter({
            arr: answer.PROPERTY,
            filter: 'NUMBER',
        })
    },
    answers: [
        dataTypeFilter({
            arr: answer.Property,
            filter: 'PROPERTY1',
        }),
        dataTypeFilter({
            arr: answer.Property,
            filter: 'PROPERTY2',
        }),
        dataTypeFilter({
            arr: answer.Property,
            filter: 'PROPERTY3',
        }),
        dataTypeFilter({
            arr: answer.Property,
            filter: 'PROPERTY3',
        }),
    ],
    choices: 6,
    library: 'LIBRARY'
})


*/