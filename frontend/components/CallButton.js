import React from 'react';
import {Text, View, StyleSheet, Image, TouchableHighlight} from 'react-native';

const CallButton = (props) => (
  <TouchableHighlight onPress={props.call}>
    <Image style={styles.img} source={require('../assets/phone.png')} />
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    img: {
      width: 50,
      height: 50

    }
})


export default CallButton;
