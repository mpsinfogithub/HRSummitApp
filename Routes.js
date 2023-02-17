import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const auth = true;
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="AppStack" component={AppStack} />
    </Stack.Navigator>
  );
};

export default Routes;
