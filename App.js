import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import { createMaterialTopTabNavigator } from 'react-navigation';
import NewDecks from './components/NewDecks';
import Deck from './components/Deck';

export default createMaterialTopTabNavigator({
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
    }
  },
);

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Main />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   statusBar: {
//     backgroundColor: "#C2185B",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: Constants.statusBarHeight,
//   },
// });
