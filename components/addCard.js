import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';

import { storeSaveData } from '../helpers/index';

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

submitCard = async () => {
    const key = this.state.title;
    const { question, answer } = this.state;

    if (question == '' || question== ' ' || answer==' ' || answer == '') {
        Alert.alert('Atenção!', 
        'Você não preencheu todos os campos!',[
            {text: 'OK', onPress: () => 
              this.props.navigation.navigate('NewDeck'),
            },
          ]);
    } else {
        dataCard = {
            title: key,
            questions: [
                {
                question: question,
                answer: answer,
                }
            ]
        }
       await storeSaveData(key, dataCard);
       this.props.navigation.navigate('Deck', { backHome: true });
    }
}

render() {
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
                width: 170,
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