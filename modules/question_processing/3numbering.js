'use strict'

const numbering = (arr) => {
    let length = arr.length
    for (let i = 0; i < length; i++) {
        arr[i].question.num = i + 1
    }
}