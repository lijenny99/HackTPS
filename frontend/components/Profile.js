import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet, KeyboardAvoidingView} from 'react-native';
import Sketch from './Sketch';
import Party from './Party';
import Icon from './Icon';
import Animal from './Animal';
import openSocket from 'socket.io-client';

const socket = openSocket('https://bravetheheat.herokuapp.com/');

export default class Profile extends React.Component {
    state = {
        page: '',
        query: '',
        userID: '',
        clientID: '',
    }

    componentDidMount() {
        const userID = this.props.navigation.getParam('userID', 'NONE');
        const clientID = this.props.navigation.getParam('clientID', 'NONE');

        this.setState({userID: userID, clientID: clientID});
    }

    static navigationOptions = {
        title: 'Categories',
        header: () => {
        }
    };

    handleContact = () => {
        this.props.navigation.navigate('Messaging', {user: this.state.userID, client: this.state.clientID});
    }

    handleParty = () => {
        this.setState({page: 'party'})
    }

    handleSketch = () => {
        this.setState({page: 'sketch'})
    }

    handleAnimal = () => {
        this.setState({page: 'animal'})
    }

    goBack = () => {
        this.setState({page: ''})
    }

    handleTyping = (e) => {
        this.setState({query: e.nativeEvent.text})
    }

    handleSearch = () => {
        console.log(this.state.query);
    }

    render() {
        if (this.state.page === '') {
            return (
                <KeyboardAvoidingView style={styles.container} behavior="padding" >
                    <View style={{flex: 1, flexDirection: 'row', marginTop: '5%'}}>
                        <TouchableHighlight onPress={this.handleParty} style={styles.homeAction}>
                            <Icon source={require('../assets/party.png')} style={styles.img} title="Loud Noise"/>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.homeAction} onPress={this.handleSketch}>
                            <Icon source={require('../assets/suspicious.png')} style={styles.img} title="Suspicious" />
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableHighlight onPress={this.handleParty} style={styles.homeAction}>
                            <Icon source={require('../assets/homeless.png')} style={styles.img} title="Homeless" />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.homeAction} onPress={this.handleAnimal}>
                            <Icon source={require('../assets/animals.png')} style={styles.img} title="Animals" />
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableHighlight onPress={this.handleParty} style={styles.homeAction}>
                            <Icon source={require('../assets/homealarm.png')} style={styles.img} title="Home Alarm" />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.homeAction} onPress={this.handleSketch}>
                            <Icon source={require('../assets/other.png')} style={styles.img} title="Other" />
                        </TouchableHighlight>
                    </View>
                </KeyboardAvoidingView>
            )
        } else if (this.state.page === 'party') {
            return (
                <Party goBack={this.goBack} navigation={this.props.navigation} handleContact={this.handleContact}/>
            )
        } else if (this.state.page === 'sketch') {
            return (
                <Sketch goBack={this.goBack} navigation={this.props.navigation} handleContact={this.handleContact}/>
            )
        } else if (this.state.page === 'animal') {
            return (
                <Animal goBack={this.goBack} navigation={this.props.navigation} handleContact={this.handleContact}/>
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: '10%',
      justifyContent: 'center'
    },
    homeAction: {
      width: 150,
      height: 180,
      marginLeft: 25,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: {width: 0, height: 5},
      shadowColor: 'grey',
      shadowRadius: 5,
      shadowOpacity: 0.5,
      borderRadius: 15,
      backgroundColor: 'white'
    },
    input: {
      width: 200,
      padding: 10,
      borderWidth: 0.5,
      borderColor: 'grey',
      marginBottom: '5%',
      marginTop: '5%',
      backgroundColor: '#fcfdff'
    },
    img: {
      width: '80%',
      height: '80%',
      alignItems: 'center'
    },
    button: {
        width: 100,
        backgroundColor: '#023d75',
        marginLeft: 20,
        alignItems: 'center'
    }
  });
