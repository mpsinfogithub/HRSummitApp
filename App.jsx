import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Routes from './Routes';
import {RNstatusBar} from './src/components';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {COLOR} from './src/constants/GlobalTheme';

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: COLOR.primary,
      background: COLOR.lighGray,
      card: 'rgb(255, 255, 255)',
      text: COLOR.dark,
      border: COLOR.gray,
      notification: 'rgb(255, 69, 58)',
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <React.Fragment>
        <RNstatusBar />
        <Routes />
      </React.Fragment>
    </NavigationContainer>
  );
};

export default App;
