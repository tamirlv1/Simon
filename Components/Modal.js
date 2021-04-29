import React from 'react';
import { Button, Modal, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

    const Modal1 = () => {
        const [value, onChangeText] = React.useState('Useless Placeholder');
    
        return (
            <Modal>
                <TextInput
                    // placeholder="Your Name"
                    style={{ height: 40, borderColor: 'black', borderWidth: 5 }}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
                <Button title="Submit"></Button>
            
            </Modal>
        );
    }

export default Modal1;