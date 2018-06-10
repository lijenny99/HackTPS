import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, ImageBackground, Picker, ScrollView } from 'react-native';

export default class FileComplaint extends React.Component {
    static navigationOptions = {
        title: 'File A Complaint'
    }

    render() {
        return (
            <ScrollView>
                <Text>Name: </Text>
                <TextInput style={styles.input} onChange={this.handleText} />
                <Text>Date/Time Filed: </Text>
                <Text>Event Location: </Text>
                <Text>Event Category: </Text>
                <Picker>
                  <Picker.Item label="loud" value="Loud Noise"/>
                  <Picker.Item label="suspicious" value="Suspicious Activity"/>
                  <Picker.Item label="animal" value="Wild Animal"/>

                </Picker>
                <Text>Event Duration: </Text>
                <TextInput style={styles.input} onChange={this.handleText} />
                <Text>Event Details: </Text>
                <TextInput style={styles.inputlong} onChange={this.handleText} />

                <Text>Actions Taken: </Text>
                <TextInput style={styles.inputlong} onChange={this.handleText} />
                <Text>Impact on individuals/others: </Text>
                <TextInput style={styles.inputlong} onChange={this.handleText} />



            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({

      input: {
        width: 300,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'grey',
        marginBottom: '5%',
        backgroundColor: '#fcfdff'
      },

      inputlong: {
        flex:1,
        flexWrap: 'wrap',
        width: 300,
        height: 200,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'grey',
        marginBottom: '5%',
        backgroundColor: '#fcfdff'
      },

})
