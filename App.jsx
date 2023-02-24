import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Routes from './Routes';
import {RNstatusBar} from './src/components';
import {COLOR} from './src/constants/GlobalTheme';
import store, {persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import axios from 'axios';
axios.defaults.baseURL = 'http://tcpindia.net/hrsummit/api';

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
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <PersistGate persistor={persistor}>
          <React.Fragment>
            <RNstatusBar />
            <Routes />
          </React.Fragment>
        </PersistGate>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
