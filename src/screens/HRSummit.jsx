import {View, Text} from 'react-native';
import React from 'react';
import {HeaderBar, Loader} from '../components';
import {FONTS, hp} from '../constants/GlobalTheme';
import useFetch from '../hooks/useFetch';
import {LayoutScreen} from '.';
import FastImage from 'react-native-fast-image';

const HRSummit = ({route}) => {
  const routeData = route.params;
  const {data: minutesData, loading: minuteLoading} = useFetch({
    url: '/minute',
    method: 'get',
  });

  const {data: HomeData} = useFetch({
    url: '/home',
    method: 'get',
    reload: false,
  });

  const Data = {
    title: minutesData?.minute?.title,
    date: minutesData?.minute?.summit_date,
    venue: minutesData?.minute?.venue,
    Theme: `${minutesData?.minute?.des}`,
  };

  return (
    <LayoutScreen
      data={minutesData?.minute?.title ? ['demo'] : []}
      headerBar={<HeaderBar headerTitle={'Minutes of last meeting'} />}
      loading={minuteLoading}>
      <>
        <View
          style={{
            height: hp(25),
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: hp(2),
          }}>
          <FastImage
            style={{width: '85%', height: '80%'}}
            source={{
              uri: `http://tcpindia.net/hrsummit/storage/uploads/Gallery/${HomeData?.home?.app_logo}`,
              priority: FastImage.priority.normal,
              cache: 'immutable',
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
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
