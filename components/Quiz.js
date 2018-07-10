import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { setLocalNotification, clearLocalNotification } from '../helpers/index';

class Quiz extends Component {
state = {
  dataCard: '',
  countQuestions: this.props.navigation.getParam('countCard'),
  answer: '',
  questionIndex: 0,
  correctAnswers: 0,
  showAnswer: false,
  isLoading: true,
  questions: '',
  count: 1,
  haveQuestions: true,
  disabled: true,
};

correct = () => { 
  const { countQuestions, correctAnswers, count, questionIndex } = this.state;
    this.setState({
        questionIndex: questionIndex +1,
        count: count + 1,
        correctAnswers: correctAnswers + 1,
        haveQuestions: (countQuestions === count)? false: true,
    }); 
    this.showAnswer();
};

incorrect = () => {
  const { questionIndex, count, countQuestions } = this.state;
  this.setState({
      questionIndex: questionIndex +1,
      count: count + 1, 
      haveQuestions: (countQuestions === count)? false: true,
  }); 
  this.showAnswer();
};

 componentDidMount(){
    this.setState({dataCard: this.props.navigation.getParam('dataCard'),
    questions: this.props.navigation.getParam('questions'),
    isLoading: false });

    clearLocalNotification().then(setLocalNotification);
}
showAnswer = () => {
    this.setState({ disabled: !this.state.disabled, showAnswer: !this.state.showAnswer});
}

render() {
  if (this.state.isLoading) {
    return <Text>Loading...</Text>
  } else {
    const { haveQuestions, count, questions, questionIndex, 
        correctAnswers, showAnswer, countQuestions,
        disabled } = this.state;
    let question, answer;
    if(haveQuestions){
      question = questions[questionIndex].question;
      answer = questions[questionIndex].answer;
    }
  
return(
    <View style={styles.container}>
    { haveQuestions ? (
    <View>
       <View style={{justifyContent: 'flex-start', flex: 1}}>
          <View>
            <Text>{count} / {countQuestions}</Text>
          </View>
        </View>
        <View style={{flex: 4}}>
            {!showAnswer ? (
            <View>
              <View style={styles.question}>
                <Text>{question}</Text>
              </View>
            </View>
              ) : (
                <View>
                <View style={styles.question}>
                  <Text>{answer}</Text>
                </View>
              </View>
              )}
              <TouchableOpacity onPress={this.showAnswer}>
                <Text style={{color: 'red'}}>Answer</Text>
              </TouchableOpacity>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
                <Button
                    disabled={disabled} 
                    onPress={() => {
                        this.correct();
                    }}
                    buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        marginTop: 15,
                        width: 100,
                        height: 40,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    title='Correct'
                />
                <Button
                    disabled={disabled} 
                    onPress={() => {
                      this.incorrect();
                    }}
                    buttonStyle={{
                        backgroundColor: "red",
                        marginTop: 15,
                        width: 100,
                        height: 40,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    title='Incorrect'
                /> 
               </View>
        </View>
    </View>
    ) : (
        <View style={styles.container}>
          <Text>You hit {correctAnswers} of {countQuestions} issues!</Text>
            <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 2}}>
              <View style={styles.container}>
              <Button
                onPress={() => {
                  this.props.navigation.navigate('Deck', { backHome: true });
                }}
                buttonStyle={{
                    backgroundColor: "red",
                    marginTop: 15,
                    width: 100,
                    height: 40,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5
                }}
                title='Back to Initial Deck'
              /> 
            </View>
          </View>
        </View>
    )}
    </View>
  );
}
};
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    question: {
      width: 370,
      height: 100,
      padding: 5,
    },
    answer: {
        paddingTop: 5,
    }
    
});

export default Quiz;