import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, ImageBackground } from 'react-native';
import Profile from './components/Profile';
import { createStackNavigator } from 'react-navigation';
import FileComplaint from './components/FileComplaint';
const firebase = require('./components/firebase');
const auth = firebase.auth();
import openSocket from 'socket.io-client';
import Messaging from './components/Messaging';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: () => {
    }
  };

  state = {
    username: '',
    password: '',
    redirect: '',
    errorMessage: '',
    userID: '',
    clientID: ''
  }

  componentDidMount() {
    const socket = openSocket('https://bravetheheat.herokuapp.com/');
    socket.on("connect", () => {
      this.setState({clientID: socket.id})
  })
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

    auth.signInWithEmailAndPassword(this.state.username, this.state.password)
        .then(() => {
          console.log(`Authenticated!`);
          })
        .catch((err) => {
            console.log(err);
        })
    
    auth.onAuthStateChanged((user) => {
          if (user) {
              this.setState({ userID: user.uid });
              this.props.navigation.navigate('Profile', {
                userID: this.state.userID,
                clientID: this.state.clientID
              });
          } else {
              this.setState({errorMessage: 'failed to authenticate'})
          }
      })
    
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={require('./assets/background.jpg')}>
        <Text style={styles.text}>Log In</Text>
        <Text style={styles.label}>Enter Your Username</Text>
        <TextInput style={styles.input} onChange={this.handleUsername}/>
        <Text style={styles.label}>Enter Your Password</Text>
        <TextInput style={styles.input} onChange={this.handlePassword} secureTextEntry={true}/>
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
          <Text style={{color: 'white'}}>Login</Text>
        </TouchableHighlight>
      </ImageBackground>
    );
  }
}

export default createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: {screen: Profile},
  FileComplaint: {screen: FileComplaint},
  Messaging: { screen: Messaging }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginBottom: '5%'
  },
  input: {
    width: 200,
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'grey',
    marginBottom: '5%',
    backgroundColor: '#e6f2f4'
  },
  label: {
    marginTop: '2%',
    fontSize: 15,
    color: 'grey',
    justifyContent: 'flex-start'
  },
  button: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#0192a8',
    borderRadius: 40
  }
});
