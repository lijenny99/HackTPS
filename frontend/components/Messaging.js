import React from 'react';
import {TouchableHighlight, View, Text, StyleSheet, ImageBackground, KeyboardAvoidingView, TextInput} from 'react-native';

export default class Messaging extends React.Component {
    state = {
        user: '',
        client: '',
        session: ''
    }

    static navigationOptions = {
        title: 'Chat',
        header: () => {
        }
      };   

    componentDidMount() {
        let user1 = this.props.navigation.getParam('user', 'NONE');
        let client1 = this.props.navigation.getParam('client', 'NONE');
        let session1 = this.props.navigation.getParam('session', 'NONE');
    }

    render() {
        return (
            <ImageBackground style={styles.container} source={require('../assets/background.jpg')}>
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row'}}>
                    <TextInput style={styles.input} onChange={this.handleText} on />
                    <TouchableHighlight style={styles.button} onPress={this.handleSearch}>
                        <Text style={{color: 'white', padding: 10, paddingLeft: 20, paddingRight: 20}}>Search</Text>
                    </TouchableHighlight>
                </View>
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