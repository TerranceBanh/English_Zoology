'use strict'

const transformData = (arr) => {
    let length = arr.length
    for (let i = 0; i < length; i++) {
        switch(arr[i].question.type) {
            
            case 'multiChoice':
                arr[i] = multiChoice({
                    question: arr[i].question.text,
                    answers: arr[i].answers,
                    qNum: arr[i].question.num,
                    qTotal: arr.length,
                })
                break

            case 'multiAnswer':
                arr[i] = multiAnswer({
                    question: arr[i].question.text,
                    answers: arr[i].answers,
                    qNum: arr[i].question.num,
                    qTotal: arr.length,
                })
                break

        }
    }
}