import axios from 'axios'

export function makeRequest(table, color){
    console.log(table)
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/get_possibilidades', {table, color}, { crossdomain: true }).then((response) => {
            resolve(response.data)
        }, (error) => {
            reject(error)
        })
    })
}

export function getIAPlay(table, color){
    console.log(table,color)
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/get_jogada_ia', {table, color}, { crossdomain: true }).then((response) => {
            console.log(response.data)
        }, (error) => {
            console.log(error)
            reject(error)
        })
    })
}