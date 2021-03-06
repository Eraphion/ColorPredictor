import React from 'react'
import {Link} from "react-router-dom"

export const ModePicker = () => (
    <div className='mode-picker'>
        <h1>Welcome to Color Predictor App!</h1>
        <h2>Select the mode!</h2>
        <div className="select-mode-buttons">
            <Link className="btn" to="/training">Training mode</Link>
            <Link className="btn" to="/usage">Usage Mode</Link>
            <Link className="btn indigo" to="/statistics">Statistics...</Link>
        </div>
    </div>
)