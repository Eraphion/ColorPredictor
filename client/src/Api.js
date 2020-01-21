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
    }
}