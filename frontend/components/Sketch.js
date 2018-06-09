import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet, Image} from 'react-native';

const Sketch = (props) => (
    <View style={styles.container}>
        <Text style={styles.h1}>There Is Someone Sketchy Outside My House, What Can I Do?</Text>
        <Text style={styles.smallText}>
            If there is a party near you and you would like to file a noise complaint, please consider speaking directly 
            blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.
        </Text>
        <TouchableHighlight style={styles.button} onPress={props.goBack} >
            <Text style={styles.text}>Go Back</Text>
        </TouchableHighlight>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2fffd',
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    h1: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
        paddingLeft: '3%',
        paddingRight: '3%'
    },
    button: {
        width: 300,
        backgroundColor: '#108787',
        marginTop: '10%',
        borderRadius: 40
    },
    text: {
        color: 'white',
        fontSize: 30,
        padding: 20,
        textAlign: 'center',
        justifyContent: 'center',
        opacity: 1
    },
    smallText: {
        fontSize: 15,
        color: 'grey',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '5%'
    },
})

export default Sketch;