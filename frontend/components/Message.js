import React from 'react';
import { View, Text } from 'react-native';

const Message = (props) => (
    <View style={styles.view}>
        <Text>{props.text}</Text>
    </View>
)

const styles = StyleSheet.create({
    view: {
        width: 400,
    }
})

export default Message;