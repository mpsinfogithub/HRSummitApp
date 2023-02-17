import {View, Text, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar} from '../components';
import {FONTS, hp} from '../constants/GlobalTheme';

const HRSummit = () => {
  const Data = {
    title: 'Minutes of the 59th HR Summit of Oil & Gas PSUs',
    date: '2nd to 4th December 2021',
    venue: 'Mayfair Hotel,kalimpong',
    Theme:
      'Driving HR Excellence in the RUPT, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident veniam quae expedita iusto asperiores praesentium? Totam similique minus voluptatem consequuntur ullam aliquid blanditiis possimus dolore dolorem suscipit. Dicta, ducimus at?',
  };
  return (
    <SafeAreaView>
      <HeaderBar headerTitle="HR Summit" />
      <View
        style={{
          height: hp(25),
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: hp(2),
        }}>
        <Image source={require('../../assets/Images/Logo.png')} />
      </View>
      <View style={{width: '85%', alignSelf: 'center'}}>
        {Object.entries(Data).map(([key, value], index) => (
          <Text
            key={index}
            style={{
              lineHeight: 24,
              textTransform: 'capitalize',
              marginBottom: 8,
              fontFamily: FONTS.semiBold,
            }}>
            {key} :{' '}
            <Text style={{textTransform: 'none', fontFamily: FONTS.regular}}>
              {value}
            </Text>
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default HRSummit;
