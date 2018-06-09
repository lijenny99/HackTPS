import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet, Image} from 'react-native';
import ResponseButtons from './ResponseButtons';

export default class Party extends React.Component {
    state = {
        pastEleven: false
    }

    componentDidMount () {
        var hours = new Date().getHours();
        if (hours >= 23) {
            this.setState({pastEleven: true});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.img}>
                    <Image source={require('../assets/DidYouKnow.png')} style={{width: 130, height: 100}} />
                </View>
                <Text style={styles.smallText}>
                    If there is a party near you and you would like to file a noise complaint, please consider speaking directly 
                    blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.
                </Text>
                {this.state.pastEleven ? <TouchableHighlight style={styles.button2} onPress={() => this.props.navigation.navigate('FileComplaint')} ><Text style={{color: 'white', textAlign: 'center', width: 200}}>File Noise Complaint</Text></TouchableHighlight> : ''}
                <ResponseButtons goBack={this.props.goBack} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold'
    },
    smallText: {
        fontSize: 15,
        color: 'grey',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '5%'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center'
      },
    text: {
        color: 'white',
        fontSize: 30,
        padding: 20,
        textAlign: 'center',
        justifyContent: 'center',
        opacity: 1
    },
    img: {
        width: 150,
        height: 80,
        alignItems:'center',
        justifyContent: 'center'
    },
    button2: {
        width: 190,
        height: 40,
        marginTop: '5%',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

