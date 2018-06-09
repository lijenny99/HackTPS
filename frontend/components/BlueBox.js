import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const GreyBox = (props) => (
    <View style={styles.rectangle}>
        <Text style={styles.txt}>
        yoooooooo dis is prettytyytoeiu goooooajds fkla dsflkjal dkjflkadf
        </Text>
    </View>
)

const styles = StyleSheet.create({
    txt: {
      width: 170,
      fontSize: 14,
      textAlign: 'left'

    },

    rectangle: {
      width: 200,
      backgroundColor: '#E9F6FF',
      padding: 15,
      borderRadius: 15,
      borderBottomRightRadius: 0,
      marginBottom: 10,
      alignSelf: 'flex-end',
      marginRight: 40
    }
})

export default GreyBox;
