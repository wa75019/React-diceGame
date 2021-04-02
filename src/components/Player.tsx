import { IonIcon } from '@ionic/react';
import React from 'react'
import './Player.css';

interface Props {
    id : string
    score: any
    icon: any
    }

const Player : React.FC<Props> = ({id, score, icon}) => {
    return (
        <div>
            <h1 className='player ion-text-center ion-text-uppercase '>player {id}<IonIcon slot="start" icon={icon} className='icons iconP1 ion-padding-start' /></h1>
            <p className="score ion-text-center ion-padding-top">{score}</p>
        </div>
    )
}

export default Player
