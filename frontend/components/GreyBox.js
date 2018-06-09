import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const GreyBox = (props) => (
  <View>
    <Text style={styles.txt} source={require('../assets/pic.png')} />
    </View>
)

const styles = StyleSheet.create({
    txt: {


    }
})

export default GreyBox;
