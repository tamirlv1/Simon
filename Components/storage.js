import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Storage extends React.Component {
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.saveData}>
                    <Text>
                        click me to save data
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.displayData}>
                    <Text>Click me to display data</Text>
                </TouchableOpacity>
            </View>
        )
    }
    saveData() {
        let user = 'Tamir King';
        AsyncStorage.setItem('user', user);
    };

    displayData = async () => {
        try {
            let user = await AsyncStorage.getItem('user');
            alert(user);

        } catch (error) {
            alert(error);
        }
    }
    
}

export default Storage;

