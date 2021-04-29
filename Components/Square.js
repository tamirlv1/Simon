import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { computerUpdateColor, setBlinking, validateUserClick } from '../SimonActions/actions';
import store from '../SimonStore/store';
import { connect } from 'react-redux';
import { useEffect } from 'react';


const Square = (props) => {

  useEffect(() => {
    if (props.blinking)
      setTimeout(() => {
        props.dispatch(setBlinking(props.index, false));
      }, 300);
  }, [props.blinking])

  // console.log('here', props.blinking);
  const borderRadiuses = {
    borderTopLeftRadius: props.index === 0 ? 200 : 0,
    borderTopRightRadius: props.index === 1 ? 200 : 0,
    borderBottomLeftRadius: props.index === 2 ? 200 : 0,
    borderBottomRightRadius: props.index === 3 ? 200 : 0
  }
  return (
    <View>
      <TouchableOpacity
        disabled={props.dis}

        style={{
          ...borderRadiuses,
        width: 120,
        height: 120,
        borderColor: 'black',
        borderWidth: 5,
        backgroundColor: props.blinking ? 'white' : props.color
      }}
        onPress={() => {
          props.onUserClickedOnColor(props.index);
          // props.playLocalSoundFile();
        }}  
        title="hello"
      />
    </View>
  );  

};

const mapStateToProps = (state, props) => {
  return {
    ...state
  };
};
export default connect(mapStateToProps)(Square);