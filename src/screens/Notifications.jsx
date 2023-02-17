import {View, Text} from 'react-native';
import React from 'react';
import {HeaderBar} from '../components';
import {SafeAreaView} from 'react-native-safe-area-context';

const Notifications = () => {
  return (
    <SafeAreaView>
      <HeaderBar headerTitle="Notifications" />
      <View></View>
    </SafeAreaView>
  );
};

export default Notifications;
