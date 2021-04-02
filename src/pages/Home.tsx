import { IonContent, IonHeader, IonPage, IonTitle, IonRow, IonCol, IonToolbar, IonButtons, IonButton, IonIcon, IonModal } from '@ionic/react';
import Button from '../components/Button';
import Player from '../components/Player';
//import Modal from 'react-modal';
import DiceScore from '../components/DiceScore';
import Canvas from '../components/Canvas';
import { addCircleOutline } from 'ionicons/icons';
import { ellipse } from 'ionicons/icons';
import { sync } from 'ionicons/icons';
import { downloadOutline } from 'ionicons/icons';
import React, { useState, ChangeEvent } from 'react';
import './Home.css';


const Home: React.FC = () => {

  const [P1Score, setP1Score] = useState(0);
  const [P2Score, setP2Score] = useState(0);
  const [P1Current, setP1Current] = useState(0);
  const [P2Current, setP2Current] = useState(0);
  const [P1Icon, setP1Icon] = useState('null');
  const [P2Icon, setP2Icon] = useState('null');
  const [OKToRoll, setOkToRoll] = useState(0);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [scoreToWin, setScoreToWin] = useState<number>(100);
  
  function closeModal(){
    setIsOpen(false);
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setScoreToWin(Number(e.target.value));
  } 
  var winningScore = scoreToWin;
  const logValue = () => {
      closeModal();
  }

//////NEW GAME Button
    const newGame = () => {
      setP1Score(0);
      setP2Score(0);
      setP1Current(0);
      setP2Current(0);
      setCurrentPlayer('p1');
      setP1Icon(ellipse);
      setP2Icon('null');
      setOkToRoll(1);
      setIsOpen(true)
      setScoreToWin(100)
    }
    const modalStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        width                 : '60vw',
        height                : '60vh',
        overflow              : 'hidden',
        transform             : 'translate(-50%, -50%)'
      }
    };
    
//////ROLL DICE Button
    //Debounce the roll button
    const debounce = (fn: Function, ms = 500) => {
      let timeoutId: ReturnType<typeof setTimeout>;
      return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
     };
    };
    ////Function triggered by button
    const rollDice = debounce(() => rollingDice());
    const rollingDice = () => {
     if (OKToRoll == 0){
        alert('In order to keep the planet aligned and to start a new game, please click on new game first ! ;)')
      }
      else{
        shuffleDice();
      }
    }
    //function to roll the dice during x times
    const [diceResult, setDiceResult] = useState(1);    
    const TURN_COUNT = Math.floor(Math.random() * 10) + 3;

    const shuffleDice = () => {
      setDiceResult(Math.floor(Math.random() * 6) + 1);

      for (let i = 1; i < TURN_COUNT; i++) {
        setTimeout(() => {     
          const newVal = Math.floor(Math.random() * 6) + 1;
          setDiceResult(newVal);
          if (i === TURN_COUNT - 1) {
            endTurn(newVal)
          }
        }, i * 300)
      }
    }
    //Adding scores
    const [currentPlayer, setCurrentPlayer] = useState('p1');    
    const endTurn = (newVal:number) => {
      switch (currentPlayer){
        case 'p1' :
          if (newVal != 1){
            setP1Current(P1Current + newVal) ;
          }
          else if (newVal === 1){
            setP2Icon(ellipse);
            setP1Icon('null');
            setP1Current(0);
            setCurrentPlayer('p2');
          }
          break;
        case 'p2' :
          if (newVal != 1){
            setP2Current(P2Current + newVal)
          }
          else if (newVal === 1){
            setP1Icon(ellipse);
            setP2Icon('null');
            setP2Current(0);
            setCurrentPlayer('p1');
          }
          break;
      }
    }

  //////HOLD Button
    const hold = () => {
      switch (currentPlayer){
        case 'p1' :
          setP1Score(P1Score + P1Current)
          setP2Icon(ellipse);
          setP1Icon('null');
          setP1Current(0);
          setCurrentPlayer('p2');
          //Check if P1 win
          const valP1 = P1Score + P1Current;
            if (valP1 >= winningScore){
              setP1Score(0);
              setP2Score(0);
              setOkToRoll(0);
              setP2Icon('null');
              alert('Player 1 win and saved the world, congrats !!!')  
            }
          break;
        case 'p2' :
          setP2Score(P2Score + P2Current)
          setP1Icon(ellipse);
          setP2Icon('null');
          setP2Current(0);
          setCurrentPlayer('p1'); 
          //Check if P2 win
          const valP2 = P2Score + P2Current;
            if (valP2 >= winningScore){
              setP1Score(0);
              setP2Score(0);
              setOkToRoll(0); 
              setP1Icon('null');  
              alert('Player 2 win and saved the world, congrats !!!')
            } 
          break;
      }
    } 

  return (
    <IonPage>
      <IonHeader>
        <div className="headerButton">
          <Button
            handleClick={newGame}
            icon={addCircleOutline}
            label="new game" 
          />   
          <IonModal 
            isOpen={modalIsOpen}
            cssClass='modalStyles'
            >
            <IonHeader>
                <IonToolbar>
                  <IonTitle class='ion-text-center modal-title'>Game rules</IonTitle>
                  <IonButtons slot="primary">
                    <IonButton onClick={closeModal}>
                      <IonIcon slot="icon-only" name="close"></IonIcon>
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding ion-text-center">
              <p className='ion-padding-bottom'>First player: click on "Roll dice" and don't get a "1". If so, you'll lose your "current score" and skip your turn.</p>
              <p className='ion-padding-bottom'>Click on hold when you want to skip and capitalize your current score.</p>
              <p className='ion-padding-bottom'>First to 100 win and save the world ! hourra</p>
              <div className='input-btn'>
              <input type='number' className='input-score' onChange={handleChange} placeholder='Define new winning score'/>
              <IonButton className='button-score' onClick={logValue}>Play !</IonButton>
              </div>
            </IonContent>

        </IonModal>
        </div>
      </IonHeader>
      <IonContent fullscreen> 
        <IonRow className="score ion-align-items-center">
          <IonCol size='5'>
            <Player
              id="1"
              score={P1Score}
              icon={P1Icon}
            />
          </IonCol>
          <IonCol size='2' className="colFlex ion-justify-content-center">
            <Canvas
              dice= {diceResult}
            />
          </IonCol>
          <IonCol size='5'>
            <Player 
                id="2"
                score={P2Score}
                icon={P2Icon}
              />
          </IonCol>
        </IonRow>  
        <IonRow className="diceScore ion-align-items-center">
          <IonCol size='4' size-md='5' className="colFlex ion-justify-content-center">
            <DiceScore
              id={1}
              score={P1Current}
            />
          </IonCol>
          <IonCol size='4' size-md='2'>
            <Button 
              handleClick={rollDice}
              icon={sync}
              label="Roll Dice" 
            />
            <Button 
              handleClick={hold}
              icon={downloadOutline}
              label="Hold" 
            />
          </IonCol>
          <IonCol size='4' size-md='5' className="colFlex ion-justify-content-center">
            <DiceScore
              id={2}
              score={P2Current}
            />
          </IonCol>
        </IonRow>  
      </IonContent>
      
    </IonPage>

  );
};

export default Home;
