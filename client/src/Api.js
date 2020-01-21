import axios from 'axios'

const url = 'http://192.168.2.42:5000/api'

export const API = {
    addUserChoice: () => {
        //fetch(`${url}/addChoice`)
        axios({
            method: 'post',
            url: url + '/addChoice',
            data: {
                "number": 42
            }
        })
    }
}