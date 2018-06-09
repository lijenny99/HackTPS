import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet, Image, TextInput, KeyboardAvoidingView} from 'react-native';

const Icon = (props) => (
    <View style={styles.view}>
        <Image source={props.source} style={styles.img}/>
        <Text style={{width: 100, height: 20, fontWeight: 'bold', paddingTop: '3%', textAlign: 'center'}}>{props.title}</Text>
    </View>
)

const styles = StyleSheet.create({
    img: {
        width: 100,
        height: 100
    },
    view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Icon;
