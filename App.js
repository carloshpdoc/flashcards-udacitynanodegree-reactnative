import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import NewDecks from './components/NewDecks';
import Deck from './components/Deck';
import StartQuiz from './components/StartQuiz';

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

// const HomeStack = createStackNavigator({
//   Home: HomeScreen,
//   Details: DetailsScreen,
// });


const Tab = createMaterialTopTabNavigator(
  {
    Deck: Deck,
    NewDecks: NewDecks,
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
      title: "Quiz",
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: "white"
      }
    }
  },
  DeckStart: {
    screen: StartQuiz,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTintColor: "black",
        headerStyle: {
          backgroundColor: "white",
        }
    }),
  },
  // AddCard: {
  //   screen: AddA,
  //   navigationOptions: {
  //     headerTintColor: "white",
  //     headerStyle: {
  //       backgroundColor: "purple"

  //     }
  //   }
  // },
  // QuizMain: {
  //   screen: QuizMain,
  //   navigationOptions: {
  //     headerTintColor: "white",
  //     headerStyle: {
  //       backgroundColor: "purple"

  //     }
  //   }
  // }
});
class App extends React.Component {

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
// export default class App extends React.Component {
//   render() {
//     return (
//       <View>
//         <Tab />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   // statusBar: {
//   //   backgroundColor: "#C2185B",
//   // },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: Constants.statusBarHeight,
//   },
// });
