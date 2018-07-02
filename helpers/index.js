import { AsyncStorage } from 'react-native';
import dataStore from '../components/setup';

export const storeSaveData = async (key, data) => {
    try {
     await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log('keyCatch: ', key);
      console.log('rec: ', data);
    }
  };

  export const retrieveData = async (key) => {
    try {
      let value = await AsyncStorage.getItem(key);
      if(value === null) {
        value = dataStore.find((e)=>{
          return  e.title === key;
        });
        await storeSaveData(key, value);
      }
     return JSON.parse(value);
     } catch (error) {
        const cards = dataStore.find((e)=>{
          return  e.title === key;
        });
       return cards;
     }
  }

  export const retrieveAllData = async () => {
    try {
      let result;
      let allKeys = await AsyncStorage.getAllKeys().then(keys => {
        return keys ;
      });

      if(allKeys === null || allKeys.length == 0 ) {
        await AsyncStorage.multiSet([['React', JSON.stringify(dataStore[0])], ['JavaScript', JSON.stringify(dataStore[1])]]);
      }

      result = await AsyncStorage.multiGet(allKeys).then(data => {
        return data ;
      });
       
      //   AsyncStorage.multiGet(keys, (err, stores) => {
      //     stores.map((result, i, store) => {
      //       // get at each store's key/value so you can work with it
      //       let key = store[i][0];
      //       let value = store[i][1];
      //     });
      //   });
      // });
  
      // if(value === null) {
      //   value = dataStore[key];
      //   await storeData(key, value);
      // }
     return JSON.parse(result);
     } catch (error) {
       const cards = dataStore;
       return cards;
     }
  }

