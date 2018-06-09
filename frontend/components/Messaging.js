import React from 'react';
import {TouchableHighlight, View, Text, StyleSheet, ImageBackground, KeyboardAvoidingView, TextInput, ScrollView} from 'react-native';
import DisplayPic from './DisplayPic';
import Message from './Message';
import openSocket from 'socket.io-client';

const socket = openSocket('https://bravetheheat.herokuapp.com/');

export default class Messaging extends React.Component {
    state = {
        user: '',
        client: '',
        session: '',
        message: '',
        messages: []
    }


    static navigationOptions = {
        title: 'Chat',
        header: () => {
        }
      };

    handleText = (e) => {
        const user1 = this.props.navigation.getParam('user', 'NONE');
        const client1 = this.props.navigation.getParam('client', 'NONE');
        const session1 = this.props.navigation.getParam('session', 'NONE');

        this.setState({
            user: user1,
            client: client1,
            session: session1,
            message: {text: e.nativeEvent.text, id: new Date().getSeconds().toString()}
        })
    }

    handleSend = () => {
        let data = {
            user_id: this.state.user,
            client_id: this.state.client,
            session_id: this.state.session,
            message: this.state.message
        }

        socket.emit("message", data);

        this.setState({messages: [...this.state.messages, this.state.message]});
    }

    render() {
        return (
            <ImageBackground style={styles.container} source={require('../assets/background-white.jpg')}>
            <ScrollView>
            <DisplayPic />

                {this.state.messages.map(message => {
                    return <Message text={message.text} key={message.id}/>
                })}

                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row'}}>
                    <TextInput style={styles.input} onChange={this.handleText} />
                    <TouchableHighlight style={styles.button} onPress={this.handleSend}>
                        <Text style={{color: 'white', padding: 10, paddingLeft: 20, paddingRight: 20}}>Search</Text>
                    </TouchableHighlight>
                </View>
                
                </ScrollView>
            </ImageBackground>
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
        width: 200,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'grey',
        marginBottom: '5%',
        marginTop: '5%',
        backgroundColor: '#fcfdff'
      },
      button: {
        width: 100,
        backgroundColor: '#023d75',
        marginLeft: 20,
        alignItems: 'center'
    }
})
