import {Platform, StatusBar} from 'react-native';
import React from 'react';

const RNstatusBar = ({...props}) => {
  if (Platform.OS !== 'ios') {
    StatusBar.setTranslucent(true);
  }
  StatusBar.setBarStyle('dark-content', true);
  return (
    <StatusBar
      backgroundColor={'transparent'}
      barStyle={'dark-content'}
      {...props}
    />
  );
};

export default RNstatusBar;
