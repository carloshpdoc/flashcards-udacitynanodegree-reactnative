import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';

import { setLocalNotification, clearLocalNotification } from '../helpers/index';


class Quiz extends Component {
constructor(props){
  super(props)
  this.state = {
    dataCard: '',
    countQuestions: 0,
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
  this.baseState = this.state 
}

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

updateState = () => {
  this.setState({dataCard: this.props.navigation.getParam('dataCard'),
    questions: this.props.navigation.getParam('questions'),
    countQuestions: this.props.navigation.getParam('countCard'),
    isLoading: false });
}

 componentDidMount(){
   this.updateState();
}

showAnswer = () => {
    this.setState({ disabled: !this.state.disabled, showAnswer: !this.state.showAnswer});
}

restart = () => {
  this.setState(this.baseState);
  
  setTimeout(() => {
    this.updateState();
  }, 500);
}

render() {
  if (this.state.isLoading) {
    return <View style={[styles.loadingContainer, styles.loadingHori]}>>
              <ActivityIndicator size="large" color="#00ff00" />
           </View>
  } else {
    const { haveQuestions, count, questions, questionIndex, 
        correctAnswers, showAnswer, countQuestions,
        disabled } = this.state;

    let question, answer;
    if(haveQuestions){
      question = questions[questionIndex].question;
      answer = questions[questionIndex].answer;
    } else {
      clearLocalNotification().then(setLocalNotification);
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
                    onPress={()=>{
                      this.restart();
                    }}
                    buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        marginTop: 15,
                        width: 170,
                        height: 40,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    title='Restart Quiz'
                /> 
              <Button
                onPress={() => {
                  this.props.navigation.navigate('DeckStart', { backHome: true });
                }}
                buttonStyle={{
                    backgroundColor: "black",
                    marginTop: 15,
                    width: 170,
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
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    loadingHori: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 300,
      padding: 10,
    }
});

export default Quiz;