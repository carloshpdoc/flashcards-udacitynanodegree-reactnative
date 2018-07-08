import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Card from './Card'
import { retrieveAllData, setLocalNotification } from '../helpers/index';

class Deck extends Component {
  static navigationOptions = {
    headerTitle: 'Deck',
  };
  
  state = {
    data: '',
    isLoading: true,
  };

  receiveData = async () =>{
    let AllData = await retrieveAllData();  
    await this.setState({ data: AllData, isLoading: false });
    await setLocalNotification();
  };
  
  async componentDidMount(){
    this.receiveData();
  }

  async componentWillReceiveProps(){
    this.receiveData();
  }

  render() {
      if (this.state.isLoading) {
        return <Text>Loading...</Text>
      } else {
        const { data } = this.state;
        return (
          <ScrollView>
            <View style={styles.container}>
            {data && data.map((r, id, arr) => (
              <TouchableOpacity 
                key={id}
                onPress={() =>
                  this.props.navigation.navigate('DeckStart', { 
                      title: arr[id].title,
                      countCard: arr[id].questions.length,
                      })
                  }
              >
                <Card
                  title={arr[id].title}
                  countCard={arr[id].questions.length}
                />
              </TouchableOpacity>
              ))}
              </View>
          </ScrollView>
        );
      }
  };
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: "#fff",
    //   justifyContent: 'space-evenly'
    },
});

export default Deck;
