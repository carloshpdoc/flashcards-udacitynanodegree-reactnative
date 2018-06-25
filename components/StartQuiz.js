import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card';
import { Button, Icon } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';

_onPress = () => {
    this.props.onPressItem(this.props.id);
  };

class StartQuiz extends Component {
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
    const { title, countCard } = this.props.navigation.state.params;
    
    return (
      <View style={styles.container}>  
        <Card
            title={title}
            countCard={countCard}
        />
      <View style={{marginBottom: 10}}>  
        <Button
          icon={
            <Icon
              name='arrow-right'
              size={40}
              color='pink'
            />
          }
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
          buttonStyle={{
            backgroundColor: "rgba(0,255,0,0.3)",
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
});


export default StartQuiz;
