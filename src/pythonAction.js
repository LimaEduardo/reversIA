import axios from 'axios'

export default function makeRequest(table){
    axios.post('http://localhost:5000', {table}).then((response) => {
        console.log(response)
    }, (error) => {
        console.log(error)
    })
}