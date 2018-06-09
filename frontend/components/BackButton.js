import React from 'react';
import {TouchableHighlight, View, Text, StyleSheet, Image} from 'react-native';

const BackButton = (props) => (
  <TouchableHighlight onPress={props.goBack} >
      <Image style={styles.img} source={require('../assets/back-arrow.png')} />
  </TouchableHighlight>
)

const styles = StyleSheet.create({
img: {
    position:'absolute',
    alignSelf:'flex-end',
    height: 25,
    resizeMode: 'contain',
    paddingRight: 300,
    top: 15
  }
})

export default BackButton;
