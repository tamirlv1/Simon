import React from 'react';
import { View } from 'react-native';
import Simon from './Components/Simon'
import ScoreBoard from './Components/scoreBoard'
import configureStore from './SimonStore/store';
import { Provider } from 'react-redux'
import computerUpdateColor from './SimonReducer/reducer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Modal1 from './Components/Modal';
import { useState } from 'react';


const store = configureStore();
// store.dispatch(computerUpdateColor());
const Stack = createStackNavigator();

const HelloWorldApp = (props) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Game"
            component={Simon}
            options={{ title: 'Simon Says' }}
          />
          <Stack.Screen
            name="Score Board"
            component={ScoreBoard}
            options={{ title: 'Score board' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
export default HelloWorldApp;