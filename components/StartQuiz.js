import React, { Fragment, Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import {  createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { purple, gray, white } from '../utils/colors'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


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
    const myIcon = (<Icon name="arrow-long-right" size={30} color="#900" />);

    return (
      <View style={styles.container}>  
        <Card
            title={title}
            countCard={countCard}
        />
        <Button
          onPress={_onPress}
          myIcon
         title='BUTTON WITH ICON OBJECT'
        />
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
    },
});


export default StartQuiz;
