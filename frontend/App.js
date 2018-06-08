import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';

export default class App extends React.Component {
  state = {
    username: '',
    password: '',
    redirect: '',
    errorMessage: ''
  }

  handleUsername = (e) => {
    this.setState({username: e.nativeEvent.text});
  }

  handlePassword = (e) => {
    this.setState({password: e.nativeEvent.text});
  }

  handleSubmit = (e) => {
    fetch('/login', {
      method: 'POST'
    })
    .then(res => res.json())
    .then(res => {
      if (res.statusCode === 200) {
        console.log('logged in!');
        this.setState({redirect: 'home'})
      } else {
        this.setState({errorMessage: res.error})
      }
    })
  }

  render() {
    return (
      <Text>{this.state.errorMessage}</Text>
      <View style={styles.container}>
        <Text style={styles.text}>Sign Up</Text>
        <Text style={styles.label}>Enter Your Username</Text>
        <TextInput style={styles.input} onChange={this.handleUsername}/>
        <Text style={styles.label}>Enter Your Password</Text>
        <TextInput style={styles.input} onChange={this.handlePassword}/>
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
          <Text>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  input: {
    width: 200,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'grey',
    marginBottom: '5%'
  },
  label: {
    marginTop: '2%',
    fontSize: 15,
    color: 'grey',
    justifyContent: 'flex-start'
  },
  button: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 10
  }
});


/* 
Registration 
GPS coordinates & notifications
Map 
Upload photo
Form Entry, submit info
General information /about 
*/