import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';

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
  lastScene: false,
  disabled: true,
};

onCorrect = (question) => {
    this.setState({
        questionIndex: this.state.questionIndex +1,
        count: this.state.count + 1, 
    }); 
    this.showAnswer();
};

 componentDidMount(){
    this.setState({dataCard: this.props.navigation.getParam('dataCard'),
    questions: this.props.navigation.getParam('questions'),
    isLoading: false });
}
showAnswer = () => {
    this.setState({ disabled: !this.state.disabled, showAnswer: !this.state.showAnswer});
}

render() {
  if (this.state.isLoading) {
    return <Text>Loading...</Text>
  } else {
    const { lastScene, count, questions, questionIndex, 
        correctAnswers, showAnswer, countQuestions,
        disabled } = this.state;
    const { question, answer } = questions[questionIndex];
  
return(
    <View style={styles.container}>
    {!lastScene ? (
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
                        this.onCorrect(question);
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
          <Text>Your Score: {this.state.correctAnswers}</Text>
            <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 2}}>
              <View style={styles.container}>
              <Button
                onPress={() => {
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
                title='Back to Initial'
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