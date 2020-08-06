'use strict'

const generateQA2 = (category) => {// Change code to automate between question types
    let questions = []
    for (let i = 0, iLength = answers[category].length; i < iLength; i++) {
        let questionsBatch = generateQA1({
            question: {
                text: '"..."',
                type: 'multiAnswer',
                addon: dataTypeFilter({
                    arr: answers[category],
                    filter: i,
                })
            },
            answers: [
                    dataTypeFilter({
                    arr: answers[category],
                    filter: 'ch',
                }),
                // dataTypeFilter({
                //     arr: answers[category],
                //     filter: 'pinyin',
                // }),
                dataTypeFilter({
                    arr: answers[category],
                    filter: 'en',
                }),
                dataTypeFilter({
                    arr: answers[category],
                    filter: 'audio',
                }),
            ],
            choices: 6,
            library: category
        })
        for (let j = 0, jLength = questionsBatch.length; j < jLength; j++) {
            questions.push(questionsBatch[j])                
        }
        
    }
    return questions
}
