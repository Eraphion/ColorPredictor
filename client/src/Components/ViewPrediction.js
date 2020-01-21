import React from 'react'
import {API} from '../Api'

export class ViewPrediction extends React.Component {
    state = {
        requestInProgress: false,
        isErrored: false
    }
    render () {
        const {r,g,b,background} = this.props.match.params;
        const {history} = this.props
        const color = `rgb(${r},${g},${b})`
        const predictionData = {
            onApiStarted: () => this.setState({requestInProgress: true}),
            onApiEnded: () => this.setState({requestInProgress: false}),
            onError: () => this.setState({isErrored: true})  
        }
        const handleLike = () => {
            API.assessPrediction({
                ...predictionData,
                isUserLiked: true,
                onSuccess: () => history.push('/goodResult')
            })
        }
        const handleDislike = () => {
            API.assessPrediction({
                ...predictionData,
                isUserLiked: false,
                onSuccess: () => history.push('/badResult')
            })
        }
        if (this.state.isErrored) return (<h1 className="error-text">Error happenned! Check console for logs</h1>)
        return (
            <div className="view-prediction">
                <div className={`prediction-sample sample-${background}`} style={{backgroundColor: background, color}}>
                    Awesome Text
                </div>
                {!this.state.requestInProgress && (<div className="prediction-actions">
                    <button onClick={handleLike} className="btn">I LIKE it!</button>
                    <button onClick={handleDislike} className="btn red">I DISLIKE it!</button>
                </div>)}
            </div>
        );
    }
}