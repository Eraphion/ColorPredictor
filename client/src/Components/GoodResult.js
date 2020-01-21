import React from 'react'
import {useHistory} from 'react-router-dom'

export const GoodResult = () => {
    const history = useHistory()
    return (
        <div className="prediction-result">
            <h2>We are so glad that we were able to help you!</h2>
            <div className="happy-image"/>
            <button className="btn result-back-btn" onClick={() => history.push("/")}>Back to dashboard</button>
        </div>
    );
}