import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import NewDecks from './components/NewDecks';
import Deck from './components/Deck';
import MainQuiz from './components/MainQuiz';
import AddCard from './components/addCard';
import Quiz from './components/Quiz';
import { setLocalNotification } from './helpers/index';


const CustomStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        {...props}
      />
    </View>
  );
}

const Tab = createMaterialTopTabNavigator(
  {
    Deck: Deck,
    NewDeck: NewDecks,
  },
  {
    tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: 'white',
    },
    },
  },
);

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tab,
    navigationOptions: {
      header: null,
      title: "Quiz",
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: "white"
      }
    }
  },
  DeckStart: {
    screen: MainQuiz,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerBackTitle: null,
        headerTintColor: "black",
        headerStyle: {
          backgroundColor: "white",
        }
    }),
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: "black",
      headerStyle: {
        backgroundColor: "white",
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.title}`,
      headerBackTitle: null,
      headerTintColor: "black",
      headerStyle: {
        backgroundColor: "white",
      }
    })
  },
});

class App extends React.Component {
componentDidMount(){
  setLocalNotification();
}
  render() {
    return (
      <View style={{ flex: 1 }}>
          <CustomStatusBar
            backgroundColor="white"
            barStyle="dark-content"
          />
          <MainNavigator />
       </View>
    );
  }
}

export default App;
