import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import DisplayPic from './DisplayPic';

const AutomatedMsg = (props) => (
  <View style={{flex: 1, flexDirection: 'row', marginTop: '20%'}}>
  <View style={{marginTop: 70}}>
  <DisplayPic />
  </View>
  <View style={styles.rectangle}>
      <Text style={styles.txt}>
      Hi, I’m Jenny, one of your local trained community crime watchers.
      How can I help you today? 😊 </Text>
  </View>
  </View>
)

const styles = StyleSheet.create({
  txt: {
    width: 170,
    fontSize: 14,
    textAlign: 'left'

  },

  rectangle: {
    marginLeft: 10,
    width: 200,
    height: 100,
    backgroundColor: '#F2F2F2',
    padding: 15,
    borderRadius: 15,
    marginBottom: 30,
    borderBottomLeftRadius: 0,
  }
})

export default AutomatedMsg;
