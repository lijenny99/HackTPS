import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet, Image} from 'react-native';
import ResponseButtons from './ResponseButtons';

const Sketch = (props) => (
    <View style={styles.container}>
        <View style={styles.img}>
            <Image source={require('../assets/DidYouKnow.png')} style={{width: 130, height: 100}} />
        </View>
        <Text style={styles.smallText}>
            If there is a party near you and you would like to file a noise complaint, please consider speaking directly
            blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.
        </Text>
        <ResponseButtons goBack={props.goBack} contact={props.handleContact}/>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    img: {
        width: 150,
        height: 80,
        alignItems:'center',
        justifyContent: 'center'
    },
})

export default Sketch;
