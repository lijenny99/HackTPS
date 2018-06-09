import React from 'react';
import {TouchableHighlight, View, Text, StyleSheet} from 'react-native';

const ResponseButtons = (props) => (
    <View>
        <Text style={styles.h1}>Was This Helpful?</Text>
        <View style={{borderBottomColor: '#023d75', borderBottomWidth: 1, marginTop:'3%' }}/>
        <View style={{flexDirection: 'row', marginTop: '5%'}}>
            <TouchableHighlight style={styles.noButton} onPress={props.contact} >
                <Text style={{color: '#023d75'}}>No, I want to speak to someone</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.doneButton} onPress={props.goBack} >
                <Text style={styles.text}>Yes, thank you!</Text>
            </TouchableHighlight>
        </View>
    </View>
)

const styles = StyleSheet.create({
    h1: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: '10%'
    },
    doneButton: {
        width: 170,
        height: 50,
        backgroundColor: '#023d75',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noButton: {
        width: 170,
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#023d75',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '3%'
    },
    text: {
        color: 'white',
    }
})

export default ResponseButtons;