import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import NewDecks from './components/NewDecks';
import Deck from './components/Deck';


// const HomeStack = createStackNavigator({
//   Home: HomeScreen,
//   Details: DetailsScreen,
// });


const Tab = createMaterialTopTabNavigator({
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
export default Tab;
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
