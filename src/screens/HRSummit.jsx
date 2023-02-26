import {View, Text, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar, Loader} from '../components';
import {FONTS, hp} from '../constants/GlobalTheme';
import useFetch from '../hooks/useFetch';
import {LayoutScreen} from '.';

const HRSummit = ({route}) => {
  const routeData = route.params;
  const {data: minutesData, loading: minuteLoading} = useFetch({
    url: '/minute',
    method: 'get',
  });

  const Data = {
    title: minutesData?.minute?.title,
    date: minutesData?.minute?.summit_date,
    venue: minutesData?.minute?.venue,
    Theme: `${minutesData?.minute?.des}`,
  };

  return (
    <LayoutScreen
      headerBar={<HeaderBar headerTitle={`${routeData?.summitNo} HR Summit`} />}
      loading={minuteLoading}>
      <>
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
      </>
    </LayoutScreen>
  );
};

export default HRSummit;
