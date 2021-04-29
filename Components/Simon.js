import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import Header from './Header';
import Square from './Square';
import Start from './Start';
import ScoreBoard from './scoreBoard';
import Modal1 from './Modal';
import { Text, View, TouchableOpacity, Modal } from 'react-native';
import { Provider } from 'react-redux';
import colorReducer from '../SimonReducer/reducer';
import { connect } from 'react-redux';
import store from '../SimonStore/store';
import { computerUpdateColor, incrementIndex, newGame, resetColors, resetGame, resetIndex, turnOverAction, setBlinking, addScore, setScores } from '../SimonActions/actions';
import Sound from 'react-native-sound';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { set } from 'react-native-reanimated';

const Simon = (props) => {

  const [computerColors, setComputerColors] = useState([]);  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trig, setTrig] = useState(false);
  const [lock, setLock] = useState(true);
  const [gamesPlaying, setGamesPlaying] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('scores').then(data => {
      if (!data) {
        props.dispatch(setScores([]));
        return;
      }
      props.dispatch(setScores(JSON.parse(data)));
    });
    console.log('used effect');
  }, []);

  const score = () => {
    if (computerColors.length === 0) 
      return 0;
      return computerColors.length - 1
    
  };
  const startButton = () => {
    if (computerColors.length > 0)
      return 'Good Luck !';
    return 'Start Game';
  };

  useEffect(() => {
    // if(trig)
      play();
  }, [trig]);

  const disStartButton = () => {
     return computerColors.length > 0
  }
  const play = () => {
    if (!computerColors.length)
      return;
    
    setGamesPlaying(true);
    computerColors.forEach((color, index) => {
      const gameObject = props.gameObjects.find(t => t.color === color);

      setTimeout(() => {
        gameObject.sound.play();
        props.dispatch(setBlinking(gameObject.index, true));
      }, 750 * (index + 1));
    });    

    setTimeout(() => {
      console.log('unlocking');
      setLock(false);
    }, 750 * (computerColors.length + 1));
  }

  const resetGame = () => {
    setComputerColors([]);
    setCurrentIndex(0);
    setLock(true);
  }


  const startGame = () => {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomColor = props.gameObjects[randomNumber].color;
    setComputerColors([randomColor]);
    setCurrentIndex(0);
    setLock(true);
    setTrig(!trig);
  }
  const turnOver = () => {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomColor = props.gameObjects[randomNumber].color;
    setComputerColors([...computerColors, randomColor]);
    setCurrentIndex(0);

    // Lock
    setLock(true);
    setTrig(!trig);
  };

  const clickValidated = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const userFailed = () => {
    const score = computerColors.length - 1;
    resetGame();
    props.navigation.navigate('Score Board', { score })
  };

  const onUserClickedOnColor = (index) => {
    props.gameObjects[index].sound.play();
    // Get color
    const color = props.gameObjects[index].color;

    // Check if click success
    if (color === computerColors[currentIndex]) {
      // Turn over? (is it the last click on the turn)
      if (currentIndex === computerColors.length - 1) {
        turnOver();
        return;
      }
      // +1 to current index
      clickValidated();
      return;
    }

    // If we are here - we failed
    userFailed();
  }

  const onStartGame = () => {
    // Reset game if got any
    // Go to first turn
    startGame(); 
  }

  return (
    
    <View style={{
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'space-between',
      height: '100%',
      backgroundColor:'gray'
    }}>
      <Text style={{
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        padding: 10
      }}>Score: {score()}</Text>
      <View style={{
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      flex: 1
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 250,
        height: 250,
        alignSelf: 'center',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        borderRadius: 250,
        borderColor: 'black',
        borderWidth: 5
      }}>
        {props.gameObjects.map(t =>
          <View style={{
            width: '50%',
            key: t.index
          }}>
            <Square
              {...t} key={t.index}
              dis={lock}
              onUserClickedOnColor={onUserClickedOnColor}
            />
          </View>
        )}
          
        </View>
      </View>
      <Start onStartGame={onStartGame}
        val={startButton()}
        dis={disStartButton()}/>
      </View>
      
  )
}


const mapStateToProps = (state, props) => {
  return state;
};

export default connect(mapStateToProps)(Simon);
