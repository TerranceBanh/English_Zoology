'use strict'

const multiAnswer = ({ question, answers, qNum, qTotal })  => {
    // for (let i = 0, answersLen = answers.length, arr = []; i < answersLen; i++) {
    //     arr.push(answers[i].bool)
    //     if (i >= answersLen - 1) console.log(arr)
    // }
    return new Promise((resolve, reject) => {
        let success = false
        let answersLength = answers.length // Caching to improve performance
        // Error Handling
        if (!isNumber(qNum)) reject('"qNum" requires numeric data type')
        else if (!isArray(answers)) reject('"answers" requires array data type')
        else if (!isString(question)) reject('"question" requires string data type')
        else if (answersLength < 2) reject('"answers" requires more than 1 element')
        else for (let i = 0; i < answersLength; i++) {
            if (!isObject(answers[i])) reject('"answers" array elements are required to be objects')
            if (!isString(answers[i].str)) reject('"answers" array elements are required have objects with a "str" property')
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
                        questionsArr[${qNum - 1}].data.score.correct = 0;
                        questionsArr[${qNum - 1}].data.score.incorrect = 0;
                        ${(() => {// Generates a value to outputs array index per question
                            let str = ''
                            for (let i = 0; i < answersLength; i++) {
                                str += ` ${(() => {
                                    if (answers[i].bool) return `
                                        if (q${qNum}a${i+1}.checked) {questionsArr[${qNum - 1}].data.score.correct++;}
                                    `
                                    else return `
                                        if (q${qNum}a${i+1}.checked) {questionsArr[${qNum - 1}].data.score.incorrect++;}
                                    `
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
                                        <label onclick="
                                            if (q${qNum}a${i+1}.checked === true && q${qNum}a${i+1}.disabled === false) this.style.backgroundColor = 'rgba(0, 255, 255, 0.3)';
                                            else if (q${qNum}a${i+1}.checked === false && q${qNum}a${i+1}.disabled === false) this.style.backgroundColor = 'white';     
                                        ">
                                            <input type="checkbox" name="q${qNum}" id="q${qNum}a${i+1}">
                                            <span for="q${qNum}a${i+1}">${answers[i].str}</span>
                                        </label>
                                    `
                                }
                                else {
                                    str += `
                                        <label onclick="
                                            if (q${qNum}a${i+1}.checked === true && q${qNum}a${i+1}.disabled === false) this.style.backgroundColor = 'rgba(0, 255, 255, 0.3)';
                                            else if (q${qNum}a${i+1}.checked === false && q${qNum}a${i+1}.disabled === false) this.style.backgroundColor = 'white';     
                                        ">
                                            <input type="checkbox" name="q${qNum}" id="q${qNum}a${i+1}">
                                            <span for="q${qNum}a${i+1}">${answers[i].str}</span>
                                        </label>
                                    `
                                }
                            }
                            return str
                        })()}
                        <button type="button" class="submit" onclick="
                            ${(() => {
                                let str = ''
                                for (let i = 0; i < answersLength; i++) {
                                    if (answers[i].bool) str += `
                                        if (q${qNum}a${i+1}.checked) q${qNum}a${i+1}.parentElement.style.backgroundColor = 'rgba(0, 255, 0, 0.4)';
                                        else q${qNum}a${i+1}.parentElement.style.backgroundColor = 'rgba(255, 255, 0, 0.5)';
                                        q${qNum}a${i+1}.disabled = true;
                                    `
                                    else str += `
                                        if (q${qNum}a${i+1}.checked) q${qNum}a${i+1}.parentElement.style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
                                        q${qNum}a${i+1}.disabled = true;
                                    `
                                }
                                return str
                            })()}
                            this.disabled = true;
                            if (
                                questionsArr[${qNum - 1}].data.score.incorrect <= 0 &&
                                questionsArr[${qNum - 1}].data.score.correct >= ${((arr = [])=>{
                                    for (let i = 0; i < answersLength; i++) {
                                        if (answers[i].bool === true) arr.push(true)
                                    }
                                    return arr
                                })().length}
                            ) new Audio('./correct.wav').play(), qNum${qNum}.parentElement.style.backgroundColor = 'rgba(0, 255, 0, 0.4)';
                            else new Audio('./incorrect.wav').play(), qNum${qNum}.parentElement.style.backgroundColor = 'rgba(255, 0, 0, 0.4)';
                        " id="sub${qNum}"> SUBMIT ANSWERS HERE </button>

                        

                    </fieldset>
                `)})}
            })
        } // if (success) END

    }) // Promise END

} // multiChoice END
