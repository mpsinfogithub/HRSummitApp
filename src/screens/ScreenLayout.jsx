import {View, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Loader} from '../components';
import {hp} from '../constants/GlobalTheme';
import NoData from './NoData';

const ScreenLayout = ({
  children,
  headerBar,
  scrollable = true,
  loading = false,
  data = [],
}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {headerBar}
      <View style={{flex: 1, marginTop: hp(0.5)}}>
        {!loading && data?.length < 1 && <NoData />}
        {loading ? (
          <Loader />
        ) : data?.length > 0 ? (
          scrollable ? (
            <ScrollView>{children}</ScrollView>
          ) : (
            <View>{children}</View>
          )
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default ScreenLayout;
