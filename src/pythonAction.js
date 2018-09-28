import axios from 'axios'

export default function makeRequest(table, color){
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000', {table, color}).then((response) => {
            resolve(response.data)
        }, (error) => {
            reject(error)
        })
    })
}