import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Message = (props) => (
    <View style={styles.rectangle}>
        <Text style={styles.txt}>{props.text}</Text>
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
  }
})

export default Message;
