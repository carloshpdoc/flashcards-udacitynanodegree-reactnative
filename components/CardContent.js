import React, { Fragment, Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {  createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import Card from './Card'
import sample from './setup.json'

_onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  class CardContent extends Component {
    render() {
        const card = Object.values(sample);
      return (
          <View style={styles.container}>
          {card && card.map((c, id) => (
          <TouchableOpacity 
            key={id}
            onPress={() =>
              this.props.navigation.navigate('Card')}
          >
            <Card
              title={c.title}
              countCard={c.questions.length}
            />
          </TouchableOpacity>
          ))}
          </View>
        );
    };
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    //   justifyContent: 'space-evenly'
    },
});

export default CardContent;
