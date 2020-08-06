'use strict'

const multiChoice = ({ question, answers, qNum, qTotal })  => {
    return new Promise((resolve, reject) => {
        let success = true
        let answersLength = answers.length // Caching to improve performance
        // Error Handling
        if (!isNumber(qNum)) reject('"qNum" requires numeric data type')
        else if (!isArray(answers)) reject('"answers" requires array data type')
        else if (!isString(question)) reject('"question" requires string data type')
        else if (answersLength < 2) reject('"answers" requires more than 1 element')
        else for (let i = 0; i < answersLength; i++) {
            if (!isObject(answers[i])) reject('"answers" array elements are required to be objects')
            if (!isString(answers[i].str)) reject('"answers" array elements are required to have objects with a "str" property')
            if (typeof answers[i].bool === undefined) reject('"answers" array elements are required have objects with a "bool" property')
            if (answers[i].bool) success = true
        }
        if (!success) reject('"answers" array is required to have at least 1 object with a "bool" property storing the value of true')

        // Resolve
        if (success) {
            resolve({
                data: {
                    score:{
                        correct: 0,
                        incorrect: 0,
                    }
                },
                html() { 
                    return new Promise((resolve) => { resolve(`
                    <fieldset class="question" id="q${qNum}" oninput="(() => {
                        ${(() => {// Generates a value to outputs array index per question
                            let str = ''
                            for (let i = 0; i < answersLength; i++) {
                                str += `if (q${qNum}a${i+1}.checked) ${(() => {
                                    if (answers[i].bool) return `{
                                        questionsArr[${qNum - 1}].data.score.correct = 1;
                                        questionsArr[${qNum - 1}].data.score.incorrect = 0;
                                    }`
                                    else return `{
                                        questionsArr[${qNum - 1}].data.score.correct = 0;
                                        questionsArr[${qNum - 1}].data.score.incorrect = 1;
                                    }`
                                })()}`
                            }
                            return str
                        })()}
                    })()">
                        <legend>Question <span id="qNum${qNum}">${qNum}</span> / <span name="total">${qTotal}</span></legend>
                        <p>${question}</p>
                        ${(() => {// Generates radio inputs
                            let str = '' 
                            for (let i = 0; i < answersLength; i++) {
                                if (answers[i].bool === true) {
                                    str += `
                                        <div>
                                            <input type="radio" name="q${qNum}" id="q${qNum}a${i+1}">
                                            <label for="q${qNum}a${i+1}">${answers[i].str}</label><br>
                                        </div>
                                    `
                                }
                                else {
                                    str += `
                                        <div>
                                            <input type="radio" name="q${qNum}" id="q${qNum}a${i+1}">
                                            <label for="q${qNum}a${i+1}">${answers[i].str}</label><br>
                                        </div>
                                    `
                                }
                            }
                            return str
                        })()}
                    </fieldset>
                `)})}
            })
        } // if (success) END

    }) // Promise END

} // multiChoice END
