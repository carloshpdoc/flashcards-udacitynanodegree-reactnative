import React from 'react';
import { Text, View , StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

class NewDecks extends React.Component {
  static navigationOptions = {
    headerTitle: 'NewDeck',
  };

  state = {
    title: '',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.cardQuestion}>
          <Text>What is the title of your new deck?</Text>
          <TextInput
            style={styles.cardAnswer}
            placeholder="Deck Title"
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
          />
        </View>
        <View style={{flex: 1}}>
          <Button
            onPress={() => {
              navigate('AddCard', { title: this.state.title });
              setTimeout(() => {
                this.setState({title: ''})
              }, 1000);
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
            title='Next'
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "#fff",
    justifyContent: 'space-between',
  },
  cardQuestion: {
    width: 370,
    height: 100,
    padding: 5,
    paddingTop: 40,
  },
  cardAnswer: {
    height: 40, 
    marginTop: 10,
    borderColor: 'gray', 
    borderWidth: 1,
  }
});

export default NewDecks;
