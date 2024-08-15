import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BackgroundService from 'react-native-background-actions';
import SmsListener from 'react-native-android-sms-listener';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReadScreen from './modules/ReadScreen';
import HomeScreen from './modules/HomeScreen';
import {PermissionsAndroid} from 'react-native';

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const serverUrl = 'http://localhost:5200';

const backgroundService = async () => {
  console.log('running background service');
  await new Promise(async resolve => {
    console.log('running the prmise in background service');
    let subscription = SmsListener.addListener(
      async (message: {
        originatingAddress: string;
        body: string;
        timestamp: number;
      }) => {
        // const deviceName = await DeviceInfo.getDeviceName();
        console.log('recieved message in background service', {
          message: message,
        });
        // fetch(serverUrl, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     message : message}),
        // })
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log('SMS sent to server:', data);
        //   })
        //   .catch(error => {
        //     console.error('Error sending SMS to server:', error);
        //   });
      },
    );

    // Stop listening for SMS when the background service is stopped
    BackgroundService.on('expiration', () => {
      console.log('removed background service');
      subscription.remove();
      resolve();
    });
  });
};

const options = {
  taskName: 'SMS Background Service',
  taskTitle: 'SMS Background Service is running',
  taskDesc: 'Listening for incoming SMS and sending to server',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
};

const Stack = createNativeStackNavigator();

async function requestSmsPermissions() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      PermissionsAndroid.PERMISSIONS.READ_SMS,
    ]);

    if (
      granted[PermissionsAndroid.PERMISSIONS.RECEIVE_SMS] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.READ_SMS] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can receive and read SMS messages');
    } else {
      console.log('SMS permissions denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

function App(): React.JSX.Element {
  useEffect(() => {
    const checkPermits = async () => {
      requestSmsPermissions();
      BackgroundService.start(backgroundService, options);
    };

    checkPermits();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ReadMessage" component={ReadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
