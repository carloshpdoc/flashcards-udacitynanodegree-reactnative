import React, { Fragment, Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class Card extends Component {
  render() {
    const { title, countCard } = this.props;
    return (
      <View style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.textCount}>{countCard}</Text>
        </View>
      </View>
      );
  };
}

const styles = StyleSheet.create({
    card: {
      borderWidth: 3,
      borderRadius: 3,
      borderColor: '#000',
      width: 300,
      height: 100,
      padding: 10,
      marginTop: 20,
      paddingTop: 20
    },
    content:{
      marginTop: 5,
      alignItems: 'center'
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    textCount:{
      marginTop: 5,
      color: '#757575',
    }
});


export default Card;
