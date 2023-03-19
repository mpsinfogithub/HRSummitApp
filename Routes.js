import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import {addNotifications} from './src/redux/notificationsSlice';
import {setAuth} from './src/redux/authSlice';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const {user} = useSelector(state => state.auth);
  const auth = user?.token && user?.name;
  const dispatch = useDispatch();

  const getFCMToken = () => {
    messaging()
      .getToken()
      .then(token => {
        dispatch(setAuth({messageToken: token}));
      });
  };

  useEffect(() => {
    requestPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      dispatch(addNotifications(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    requestPermission();
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        dispatch(addNotifications(remoteMessage));
      },
    );

    return unsubscribe;
  }, []);

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFCMToken();
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      {!auth ? (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      ) : (
        <Stack.Screen name="AppStack" component={AppStack} />
      )}
    </Stack.Navigator>
  );
};

export default Routes;
