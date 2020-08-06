'use strict'

const promiseProcessing = (arr) => {
    Promise
        .all(arr)
        .then(res => {// Runs function html method and replaces method with a promise
            for (let i = 0; i < res.length; i++) {
                res[i].html = res[i].html()
            }
            return res
        })
        .then(res =>　{// Replace promises with promise output data
            for (let i = 0; i < res.length; i++) {
                arr[i].data = res[i].data
                Promise
                    .resolve(res[i].html)
                    .then(res1 => {
                        arr[i].html = () => res1
                    })
            }
            return res
        })
        .then((res) => {
            for (let i = 0; i < arr.length; i++) {
                document.write(
                    arr[i]
                        .html()
                        .replace(/>\s{2,}|\n</gi, '>')
                )        
            }
            return res
        })
        .then((res) => {
            questionsArr = res
        })
        .catch((err) => {console.log(err)})
}