import {View, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Loader} from '../components';
import {hp} from '../constants/GlobalTheme';

const ScreenLayout = ({
  children,
  headerBar,
  scrollable = true,
  loading = false,
}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {headerBar}
      <View style={{flex: 1, marginTop: hp(0.5)}}>
        {loading ? (
          <Loader />
        ) : scrollable ? (
          <ScrollView>{children}</ScrollView>
        ) : (
          <View>{children}</View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ScreenLayout;
