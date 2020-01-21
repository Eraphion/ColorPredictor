import axios from 'axios'

const url = 'http://192.168.2.42:5000/api'

export const API = {
    addUserChoice: ({R,G,B,color, onApiStarted, onApiEnded, onSuccess, onError}) => {
        onApiStarted();
        axios({
            method: 'post',
            url: url + '/addChoice',
            data: {"R": R, "G": G, "B": B, "color": color}
        })
        .then(response => {onApiEnded(); onSuccess(response)})
        .catch(e => {onApiEnded(); onError(e)})
    },
    pickForUser: ({r,g,b, onApiStarted, onApiEnded, onSuccess, onError}) => {
        onApiStarted();
        axios({
            method: 'get',
            url: url + '/pickColor',
            params: {"R": r, "G": g, "B": b}
        })
        .then(response => {onApiEnded(); onSuccess(response.data)})
        .catch(e => {onApiEnded(); onError(e)})
    }
}