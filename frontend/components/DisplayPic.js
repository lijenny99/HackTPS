import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const DisplayPic = (props) => (
  <View>
    <Image style={styles.img} source={require('../assets/pic.png')} />
    </View>
)

const styles = StyleSheet.create({
    img: {
      borderRadius: 25,
      width: 50,
      height: 50

    }
})

export default DisplayPic;
