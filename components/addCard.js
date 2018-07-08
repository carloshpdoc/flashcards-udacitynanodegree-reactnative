import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { storeSaveData, retrieveData } from '../helpers/index';


class addCard extends Component {

static navigationOptions = {
  headerTitle: 'addCard',
};

state = {
    title: this.props.navigation.getParam('title'),
    question: '',
    answer: '',
    dataCard: '',
};

submitCard = async _ => {
    const key = this.state.title;
    dataCard = {
        title: key,
        questions: [
            {
              question: this.state.question,
              answer: this.state.answer,
            }
        ]
    }

    await storeSaveData(key, dataCard);
    this.props.navigation.navigate('Deck', { backHome: true });
}

render() {
    // const title = this.props.navigation.getParam('title');
  //  console.log('title: ', this.state.title);
    return (
        <View style={styles.container}>
            <View style={styles.modal}>
            <Text>Question:</Text>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                placeholder="Insert here a Question!"
                onChangeText={(question) => this.setState({question})}
                value={this.state.question}
            />
            </View>
            <View style={styles.modal}>
            <Text>Answer:</Text>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                placeholder="Insert here an Answer!"
                onChangeText={(answer) => this.setState({answer})}
                value={this.state.answer}
            />
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
            <Button
                onPress={this.submitCard}
                buttonStyle={{
                backgroundColor: "rgba(92, 99,216, 1)",
                marginTop: 15,
                width: 160,
                height: 40,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5
                }}
                title='Submit New Deck'
            />
            </View>
       </View>
    )
 }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      
    },
    modal: {
      width: 370,
      height: 100,
      padding: 5,
      paddingTop: 40,
    }
});


export default addCard;