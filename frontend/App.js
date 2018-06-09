import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import Profile from './components/Profile';
import { createStackNavigator } from 'react-navigation';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  state = {
    username: '',
    password: '',
    redirect: '',
    errorMessage: ''
  }

  handleUsername = (e) => {
    this.setState({username: e.nativeEvent.text.toLowerCase()});
  }

  handlePassword = (e) => {
    this.setState({password: e.nativeEvent.text.toLowerCase()});
  }

  handleSubmit = (e) => {
    const data = {
      username: this.state.username, 
      password: this.state.password
    }
    console.log(data);
    fetch('https://bravetheheat.herokuapp.com/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(res => {
      if (res.statusCode === 200) {
        this.setState({errorMessage: res.data})
      } else {
        this.setState({errorMessage: res.error});
      }
    })
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text>{this.state.errorMessage}</Text>
        <Text style={styles.text}>Log In</Text>
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

export default createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: {screen: Profile}
});

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