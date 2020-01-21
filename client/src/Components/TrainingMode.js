import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {API} from "../Api"


export const TrainingMode = () => {
    const [isServerOK, setServerOK] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [fontColor, setFontColor] = useState({color: "rgb(0,0,0)"})
    const [pickedCount, setPickedCount] = useState(0)
    const text = 'Awesome text'
    const generateColor = () => {
        const R = Math.floor(Math.random()*255)
        const G = Math.floor(Math.random()*255)
        const B = Math.floor(Math.random()*255)
        return {
            color: `rgb(${R},${G},${B})`,
            R,G,B
        }
    }
    useEffect(() => {
        setFontColor(generateColor())
    }, [pickedCount])

    const handleClick = (color) => {
        const {R,G,B} = fontColor
        API.addUserChoice({R,G,B, color, 
            onSuccess: () => setPickedCount(pickedCount + 1), 
            onError: (msg) => {
                console.log('ERROR: ', msg)
                setServerOK(false)
            },
            onApiStarted: () => setLoading(true),
            onApiEnded: () => setLoading(false)
        })
    }
    if (isLoading) return (<h1 className="info-text">Please stand by. Your request is processing...</h1>)
    if (!isServerOK) return (<h1 className="error-text">Error happenned! Check console for logs</h1>)
    return (
    <div className="training-mode">
        <div className="training-menu">
            <p className="count-info">You've already picked {pickedCount} backgrounds!</p>
            <Link className="btn" to="/">Go to usage mode</Link>
        </div>
        <h1 className="pick-title">Pick The Best!</h1>
        <div className="training-fonts">
            <div className="font left-font" style={{color: fontColor.color}} onClick={() => handleClick('white')}>
                {text}
            </div>
            <div className="font right-font" style={{color: fontColor.color}} onClick={() => handleClick('black')}>
                {text}
            </div>
        </div>
    </div>)
}