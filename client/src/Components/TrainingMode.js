import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {API} from "../Api"

export const TrainingMode = () => {
    const [fontColor, setFontColor] = useState("rgb(0,0,0)")
    const [pickedCount, setPickedCount] = useState(0)
    const text = 'Awesome text'
    const generateColor = () => {
        const R = Math.floor(Math.random()*255)
        const G = Math.floor(Math.random()*255)
        const B = Math.floor(Math.random()*255)
        return `rgb(${R},${G},${B})`
    }
    useEffect(() => {
        setFontColor(generateColor())
    }, [pickedCount])

    const handleClick = () => {
        API.addUserChoice()
        setPickedCount(pickedCount + 1)
    }

    return (
    <div className="training-mode">
        <div className="training-menu">
            <p className="count-info">You've already picked {pickedCount} backgrounds!</p>
            <Link className="btn" to="/">Go to usage mode</Link>
        </div>
        <h1 className="pick-title">Pick The Best!</h1>
        <div className="training-fonts">
            <div className="font left-font" style={{color: fontColor}} onClick={handleClick}>
                {text}
            </div>
            <div className="font right-font" style={{color: fontColor}} onClick={handleClick}>
                {text}
            </div>
        </div>
    </div>)
}