'use strict'
// Create randomQA
let questionsArr = (async () => {
    return [// Question creation
        ...generateQA2('zoology'),
    ]
})()
    .then(res => 
        duplicateAudit(res) // Duplicate answer error handling
    )
    .then(res => 
        shuffle(res)// Shuffles questionsArr array
    )
    .then(res => {
        numbering(res) // Add property num with value of current question number
        return res
    })
    .then(res => {
        transformData(res) // Convert to HTML in the form of text
        return res
    })
    .then(res => {
        promiseProcessing(res) // Process promises and render HTML
    })
