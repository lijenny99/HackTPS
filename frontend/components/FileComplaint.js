import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, ImageBackground, ScrollView, DatePickerIOS } from 'react-native';

export default class FileComplaint extends React.Component {
    static navigationOptions = {
        title: 'File A Complaint'
    }

   constructor(props) {
      super(props);
      this.state = { chosenDate: new Date()};
      this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
      this.setState({chosenDate: newDate})
    }

    render() {
        return (
          <View styles={styles.container}>
            <ScrollView style={{marginLeft: 35, marginTop: 50, marginBottom: 50}} >
                <Text>Name: </Text>
                <TextInput style={styles.input} onChange={this.handleText} />
                <Text>Date/Time Filed: </Text>
                <View>
                <DatePickerIOS date={this.state.chosenDate} onDateChange={this.setDate} />
                </View>
                <Text>Event Location: </Text>
                <TextInput style={styles.input} onChange={this.handleText} />
                <Text>Event Category: </Text>
                <TextInput style={styles.input} onChange={this.handleText} />
                <Text>Event Duration: </Text>
                <TextInput style={styles.input} onChange={this.handleText} />
                <Text>Event Details: </Text>
                <TextInput style={styles.inputlong} onChange={this.handleText} multiline={true}/>

                <Text>Actions Taken: </Text>
                <TextInput style={styles.inputlong} onChange={this.handleText} multiline={true}/>
                <Text>Impact on individuals/others: </Text>
                <TextInput style={styles.inputlong} onChange={this.handleText} multiline={true}/>

                <View>
                    <TouchableHighlight style={styles.doneButton} >
                        <Text style={styles.text}>Submit</Text>
                    </TouchableHighlight>
                </View>

            </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },

      input: {
        marginTop: '2%',
        width: 300,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'grey',
        marginBottom: '5%',
        backgroundColor: '#fcfdff'
      },

      inputlong: {
        flex:1,
        flexWrap: 'wrap',
        width: 300,
        height: 200,
        textAlignVertical: 'top',
        borderWidth: 0.5,
        borderColor: 'grey',
        marginBottom: '5%',
        backgroundColor: '#fcfdff',
        marginTop: '2%'
      },
      doneButton: {
        width: 300,
        height: 50,
        backgroundColor: '#023d75',
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        color: 'white'
    }
})
