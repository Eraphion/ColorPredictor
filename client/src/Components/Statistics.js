import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {API} from '../Api'

export const Statistics = () => {
    const [isServerOK, setServerOK] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [stats, setStats] = useState({})
    const history = useHistory()
    useEffect(() => {
        API.getStatistics({
            onApiStarted: () => {setLoading(true)},
            onApiEnded: () => {setLoading(false)},
            onSuccess: (data) => {setStats(data)},
            onError: (err) => {console.log(err); setServerOK(false)}
        })
    }, [])
    if (isLoading) return (<h1 className="info-text">Please stand by. Your request is processing...</h1>)
    if (!isServerOK) return (<h1 className="error-text">Error happenned! Check console for logs</h1>)
    const {liked_count, disliked_count, used_total_count} = stats
    const happyPercent = Math.round(100*liked_count/(liked_count + disliked_count))
    return (
        <div className="card statistics">
            <div className="card-content">
                <p>Users request background for custom text color {used_total_count} times</p>
                <p>Users were satisfied with predication results {liked_count} times ({happyPercent}%)</p>
                <p>Users were not happy with predication results {disliked_count} times</p>
            </div>
            <div className="card-action">
                <button className="btn large" onClick={() => history.push("/")}>Back to dashboard</button>
            </div>
        </div>
    );
}