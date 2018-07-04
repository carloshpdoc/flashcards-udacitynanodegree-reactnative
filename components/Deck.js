import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card'
import { retrieveAllData } from '../helpers/index';

// export default Deck;
// _onPress = () => {
//     this.props.onPressItem(this.props.id);
//   };
const test = () =>{
  console.log('foi');
};

class Deck extends Component {
  static navigationOptions = {
    headerTitle: 'Deck',
    header: {
       visible: test, // nope :/
     },
  };
    static navigationOptions = {
       
    };
    constructor(props) {
      super(props);
      this.state ={
        data: '',
        isLoading: true,
      };
  };
  
  async componentDidMount(){
    let AllData = await retrieveAllData();  
    await this.setState({ data: AllData, isLoading: false });
console.log(test);
    const b = this.props.navigation.getParam('increaseCount');
    console.log('back');
    if(b === 'backDeck'){
      console.log('sdtestets');
      this.setState({ isLoading: false });
    }
  }

  async componentWillReceiveProps(){
    let AllData = await retrieveAllData();  
    console.log('props');
    await this.setState({ data: AllData, isLoading: false });
  }

  render() {
      if (this.state.isLoading) {
        return <Text>Loading...</Text>
      } else {
        const { data } = this.state;
        return (
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
        );
      }
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

export default Deck;
