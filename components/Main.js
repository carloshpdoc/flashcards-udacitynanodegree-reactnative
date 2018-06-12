import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import NewDecks from './NewDecks';
import DeckStack from "./Deck";


const Main = createMaterialTopTabNavigator
({
  Deck: DeckStack,
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

export default Main;
