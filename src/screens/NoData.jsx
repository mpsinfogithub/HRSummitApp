import {View, Text} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import {FONTS, wp} from '../constants/GlobalTheme';

const NoData = ({text = 'No Data found'}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Lottie
        source={require('../../assets/lotties/nodata.json')}
        style={{
          width: wp(90),
          height: wp(80),
          justifyContent: 'center',
          alignItems: 'center',
        }}
        autoPlay
        loop
      />
      <Text
        style={{fontFamily: FONTS.semiBold, position: 'relative', bottom: 50}}>
        {text}
      </Text>
    </View>
  );
};

export default NoData;
