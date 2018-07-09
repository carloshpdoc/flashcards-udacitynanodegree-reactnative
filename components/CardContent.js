import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card'
import sample from './setup.json'

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
    },
});

export default CardContent;
