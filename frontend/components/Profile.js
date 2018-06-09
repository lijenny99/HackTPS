import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet, Image, TextInput, KeyboardAvoidingView} from 'react-native';

import Sketch from './Sketch';
import Party from './Party';
import Icon from './Icon';

export default class Profile extends React.Component {
    state = {
        page: '',
        query: ''
    }    

    static navigationOptions = {
        title: 'Categories',
        header: () => {
        }
    };

    handleParty = () => {
        this.setState({page: 'party'})
    }   

    handleSketch = () => {
        this.setState({page: 'sketch'})
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
                    <View style={{flex: 1, flexDirection: 'row', marginTop: '10%'}}>
                        <TouchableHighlight onPress={this.handleParty} style={styles.homeAction}>
                            <Icon source={require('../assets/homeless.png')} style={styles.img} title="Homeless" />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.homeAction} onPress={this.handleSketch}>
                            <Icon source={require('../assets/animals.png')} style={styles.img} title="Animals" />
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', marginTop: '10%'}}>
                        <TouchableHighlight onPress={this.handleParty} style={styles.homeAction}>
                            <Icon source={require('../assets/homealarm.png')} style={styles.img} title="Home Alarm" />
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.homeAction} onPress={this.handleSketch}>
                            <Icon source={require('../assets/other.png')} style={styles.img} title="Other" />
                        </TouchableHighlight>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row'}}>
                        <TextInput style={styles.input} onChange={this.handleTyping}/>
                        <TouchableHighlight style={styles.button} onPress={this.handleSearch}>
                            <Text style={{color: 'white', padding: 10, paddingLeft: 20, paddingRight: 20}}>Search</Text>
                        </TouchableHighlight>
                    </View>
                </KeyboardAvoidingView>
            )
        } else if (this.state.page === 'party') {
            return (
                <Party goBack={this.goBack} navigation={this.props.navigation}/>
            )
        } else if (this.state.page === 'sketch') {
            return (
                <Sketch goBack={this.goBack} navigation={this.props.navigation}/>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: '10%'
    },
    homeAction: {
      width: 150,
      height: 150,
      marginLeft: 20,
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
      borderRadius: 5,
      borderWidth: 0.5,
      borderColor: 'grey',
      marginBottom: '5%',
      marginTop: '5%',
      backgroundColor: '#e6f2f4'
    },
    img: {
      width: '80%',
      height: '80%',
      alignItems: 'center'
    },
    button: {
        width: 100,
        backgroundColor: 'lightblue',
        borderRadius: 40,
        marginLeft: 20,
        alignItems: 'center'
    }
  });