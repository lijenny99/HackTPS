import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, ImageBackground } from 'react-native';

export default class FileComplaint extends React.Component {
    static navigationOptions = {
        title: 'File A Complaint'
    }

    render() {
        return (
            <View>
                <Text>This is the file complaint page!</Text>
            </View>
        )
    }
} 