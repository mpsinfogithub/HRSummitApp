import {View, Text} from 'react-native';
import React from 'react';
import {HeaderBar} from '../components';
import {COLOR, FONTS, hp} from '../constants/GlobalTheme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {openDialer} from '../utils/helpers';
import useFetch from '../hooks/useFetch';
import {LayoutScreen} from '.';
import FastImage from 'react-native-fast-image';

const Help = () => {
  const {data: happytoHelpData, loading: helpLoading} = useFetch({
    url: '/all-happy',
    method: 'get',
  });

  const {data: HomeData} = useFetch({
    url: '/home',
    method: 'get',
  });

  return (
    <LayoutScreen
      loading={helpLoading}
      headerBar={<HeaderBar headerTitle="Happy to Help" />}>
      <>
        <View
          style={{
            height: hp(25),
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: hp(2),
          }}>
          <FastImage
            style={{width: '80%', height: '80%'}}
            source={{
              uri: `http://tcpindia.net/hrsummit/storage/uploads/Gallery/${HomeData?.home?.app_logo}`,
              priority: FastImage.priority.normal,
              cache: 'immutable',
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={{width: '85%', alignSelf: 'center'}}>
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: 24,
              color: COLOR.dark,
            }}>
            Contact Us
          </Text>

          {happytoHelpData?.all_happy?.map((service, index) => (
            <View key={index} style={{marginVertical: hp(1.2)}}>
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  borderBottomWidth: 1,
                  borderColor: COLOR.gray,
                  paddingBottom: 10,
                }}>
                {service?.[0]}
              </Text>
              {service?.[1]?.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 15,
                  }}
                  key={index}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <FeatherIcon
                      name="user"
                      size={20}
                      style={{marginRight: 8}}
                    />
                    <Text style={{fontFamily: FONTS.regular}}>
                      {item?.name}
                    </Text>
                  </View>
                  <Text
                    onPress={() => openDialer(item?.phone)}
                    style={{
                      fontFamily: FONTS.regular,
                      color: COLOR.primary,
                    }}>
                    {item?.phone}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </>
    </LayoutScreen>
  );
};

export default Help;
