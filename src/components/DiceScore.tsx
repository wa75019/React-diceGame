import React from 'react';
import './DiceScore.css';

interface Props {
    id : number
    score: number
    }

const DiceScore : React.FC<Props> = ({id, score}) => {
    return (
        <div className="currentScore">
            <h2 className="ion-text-center ion-text-uppercase ion-padding-top">Current</h2>
            <p className="ion-text-center ion-padding-top" tabIndex={id}>{score}</p>
            
        </div>
    )
}
export default DiceScore
