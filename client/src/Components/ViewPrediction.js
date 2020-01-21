import React from 'react'

export class ViewPrediction extends React.Component {
    render () {
        const {r,g,b,background} = this.props.match.params;
        const {history} = this.props
        const color = `rgb(${r},${g},${b})`
        const handleLike = () => {
            history.push('/goodResult')
        }
        const handleDislike = () => {
            history.push('/badResult')
        }
        return (
            <div className="view-prediction">
                <div className={`prediction-sample sample-${background}`} style={{backgroundColor: background, color}}>
                    Awesome Text
                </div>
                <div className="prediction-actions">
                    <button onClick={handleLike} className="btn">I LIKE it!</button>
                    <button onClick={handleDislike} className="btn red">I DISLIKE it!</button>
                </div>
            </div>
        );
    }
}