import React from 'react';
import {TouchableHighlight, View, Text, StyleSheet, KeyboardAvoidingView, Image, TextInput, ScrollView} from 'react-native';
import Message from './Message';
import AutomatedMsg from './AutomatedMsg';
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

    componentDidMount() {
        socket.on("message", (data) => {
            /*
            data = {
                 client_id: client_id, //Sender
                 session_id: session_id,
                 time_stamp: time_stamp,
                 user_id: data.user_id, //Sender
                 message: data.message
             }*/
            this.setState({messages: [...this.state.messages, data.message]});
        })
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
            message: {text: e.nativeEvent.text, id: new Date().getSeconds().toString(), sender: 'user'}
        })
    }

    handleBack = () => {
        this.props.navigation.goBack();
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
            <KeyboardAvoidingView style={styles.container} source={require('../assets/background-white.jpg')}>

            <TouchableHighlight onPress={this.handleBack}>
                <Image style={styles.img} source={require('../assets/back-arrow.png')} style={styles.img}/>
            </TouchableHighlight>

            <ScrollView>
            <View><AutomatedMsg/></View>

            <View style={styles.container}>
                {this.state.messages.map(message => {
                   return message.sender === 'operator' ?  <GreyBox text={message.text} key={message.id} /> : <Message text={message.text} key={message.id}/>
                })}
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row'}}>
                    <TextInput style={styles.input} onChange={this.handleText} />
                    <TouchableHighlight style={styles.button} onPress={this.handleSend}>
                        <Text style={{color: 'white', padding: 10, paddingLeft: 20, paddingRight: 20}}>Send</Text>
                    </TouchableHighlight>
                </View>
                </View>




                </ScrollView>
            </KeyboardAvoidingView>
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
    },
    img: {
        position:'absolute',
        alignSelf:'flex-end',
        height: 25,
        resizeMode: 'contain',
        paddingRight: 300,
        top: 30,
      }
})
