import { IonButton, IonIcon } from '@ionic/react';
import React, { useState } from 'react';
import './Button.css';

interface Props {
  handleClick : any
  label : string
  icon: string
  }
const Button: React.FC<Props> = ({ label, icon, handleClick }) => {

  return (
          <div className="FexButton ion-justify-content-center">
            <IonButton className="Buttonclass ion-align-items-center" fill="clear" onClick={handleClick}>
              <IonIcon slot="start" icon={icon} className='icons'/>
              <h2>{label}</h2>
            </IonButton>
          </div>
  )
}


export default Button

