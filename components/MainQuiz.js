import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, TextInput, Text } from 'react-native';
import Card from './Card';
import { Button, Icon } from 'react-native-elements';
import { storeSaveData, retrieveData } from '../helpers/index';

// import Icon from 'react-native-vector-icons/FontAwesome';

class MainQuiz extends Component {
//   static navigationOptions= ({ navigation }) => {
//     headerTitle: 'TEST',
// };
  state = {
    modalVisible: false,
    question: '',
    answer: '',
    dataCard: '',
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  submitData = async _ => {
    const key = this.props.navigation.state.params.title;
    const data = await retrieveData(key);
  
    data['questions'].push({ question: this.state.question, answer: this.state.answer });
    await storeSaveData(this.props.navigation.state.params.title, data);
    await this.setState({dataCard: data, modalVisible: false});
    this.props.navigation.navigate('Deck', { backHome: true });
  }

  AddQuestion = () => {
    this.setModalVisible(true);
  };

  StartQuiz = async () => {
    const key = this.props.navigation.state.params.title;
    const data = await retrieveData(key);

    await this.props.navigation.navigate('Quiz', {
      title: data.title, questions: data.questions, dataCard: data, countCard: (data.questions).length,
    });
  }
// state = {
//     title: '',
//     countCard: '',
// }
//  componentDidMount(){
//    console.log('navigation: ', this.props.navigation);
//    this.setState({
//        title: this.props.navigation.state.params.title,
//        countCard: this.props.navigation.state.params.countCard,
//    })
//  }
  
  render() {
    let title, countCard;
    if(this.state.dataCard) {
      title = this.state.dataCard.title;
      countCard = (this.state.dataCard.questions).length;
    } else {
      title = this.props.navigation.state.params.title;
      countCard = this.props.navigation.state.params.countCard;
    }
    // const { title, countCard } = this.props.navigation.state.params;
    
    return (
      <View style={styles.container}>  
        <Card
            title={title}
            countCard={countCard}
        />
      <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
         >
          <View style={{ marginTop: 20,}}>
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
                onPress={this.submitData}
                buttonStyle={{
                  backgroundColor: "rgba(92, 99,216, 1)",
                  marginTop: 15,
                  width: 100,
                  height: 40,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 5
                }}
                title='submit'
              />
              <Button
                onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
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
                title='close'
              />
            </View>
          </View>
        </Modal>
      <View style={{marginBottom: 10}}>  
        <Button
          icon={
            <Icon
              name='arrow-right'
              size={40}
              color='pink'
            />
          }
          onPress={this.AddQuestion}
          buttonStyle={{
            backgroundColor: "rgba(92, 99,216, 1)",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          title='Add Card'
        />
        <Button
          icon={
            <Icon
              name='arrow-left'
              size={15}
              color='pink'
            />
          }
          onPress={this.StartQuiz}
          buttonStyle={{
            backgroundColor: "#00A7E1",
            width: 300,
            height: 45,
            marginTop: 10,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          title='Start Quiz'
        />
        </View>
      </View>
      );
  };
}

// const styles = StyleSheet.create({
//     card: {
//       borderWidth: 3,
//       borderRadius: 3,
//       borderColor: '#000',
//       width: 300,
//       height: 100,
//       padding: 10,
//       marginTop: 20,
//       paddingTop: 20
//     },
//     content:{
//       marginTop: 5,
//       alignItems: 'center'
//     },
//     titleText: {
//       fontSize: 20,
//       fontWeight: 'bold',
//     },
//     textCount:{
//       marginTop: 5,
//       color: '#757575',
//     }
// });

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
      
    },
    modal: {
      width: 370,
      height: 100,
      padding: 5,
      paddingTop: 40,
    }
});


export default MainQuiz;