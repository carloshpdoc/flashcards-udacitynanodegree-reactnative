import { AsyncStorage } from 'react-native';
import dataStore from '../components/setup';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'FlashCards:notifications';

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

      if(allKeys === null || allKeys.length === 0 ) {
        await AsyncStorage.multiSet([['React', JSON.stringify(dataStore[0])], ['JavaScript', JSON.stringify(dataStore[1])]]);
      }

      // let value = await AsyncStorage.getItem('React');
      // result = allKeys.map((key)=>{
      //   AsyncStorage.getItem(key, (err, r) => {
      //     console.log(r);
      //     return r;
      //   });
      // })
      receive = await AsyncStorage.multiGet(allKeys).then(data => {
          return data;
      });

      result = receive.map((r, i, a)=>{
        let value = JSON.parse(a[i][1]);
        return value;
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
     return result;
     } catch (error) {
       console.log('error: ', error);
       const cards = dataStore;
       return cards;
     }
  }

  export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
 return {
   title: 'Pratice your Quiz!',
   body: "👋 don't forget to pratice your quiz for today!",
   ios: {
     sound: true,
   },
   android: {
     sound: true,
     priority: 'high',
     sticky: false,
     vibrate: true,
   }
 }
}

export function setLocalNotification () {
  try {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then((data)=> {
      const dataNotification = JSON.parse(data);
 
      if(dataNotification === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status })=> {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: 'day',
              }
            );

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      } else {
        console.log('NOTIFICATION_KEY: ', NOTIFICATION_KEY);
      }
     })
  } catch(error){
    console.warn('error: ', error);
  }
}
