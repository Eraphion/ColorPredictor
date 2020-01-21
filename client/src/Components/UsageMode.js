import React, {useState} from 'react'
import {SketchPicker} from 'react-color'
import {API} from '../Api'
import {useHistory} from 'react-router-dom'

export const UsageMode = () => {
    const history = useHistory()
    const [isLoading, setLoading] = useState(false)
    const [isServerOK, setServerOK] = useState(true)
    const [color, setColor] = useState({
        r: 0, g: 0, b: 0
    })

    const handleClick = () => {
        API.pickForUser({
            ...color,
            onApiStarted: () => setLoading(true),
            onApiEnded: () => setLoading(false),
            onError: () => setServerOK(false),
            onSuccess: ({backgroundColor}) => 
                history.push(`/viewPrediction/${color.r}/${color.g}/${color.b}/${backgroundColor}`)
        })
    }
    if (isLoading) return (<h1 className="info-text">Please stand by. Your request is processing...</h1>)
    if (!isServerOK) return (<h1 className="error-text">Error happenned! Check console for logs</h1>)
    return (
        <div className="usage-mode card darken-1">
        <div className="card-content">
            <h2>Please select your color using color picker tool</h2>
            <div style={{display: "flex", justifyContent: "center"}}>
                <SketchPicker color={color} onChangeComplete={color => setColor(color.rgb)}/>
            </div>
        </div>
        <div className="card-action">
            <button onClick={handleClick} className="btn large indigo">Pick for me!</button>
        </div>
        </div>
    )
}