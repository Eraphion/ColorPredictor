import React from 'react'
import {useHistory} from 'react-router-dom'

export const BadResult = () => {
    const history = useHistory()
    return (
        <div className="prediction-result">
            <h2>We are  terribly sorry but it's just a machine...</h2>
            <div className="sad-image"/>
            <button className="btn result-back-btn" onClick={() => history.push("/")}>Back to dashboard</button>
        </div>
    );
}