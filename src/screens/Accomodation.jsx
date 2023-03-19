import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import {HeaderBar, RNButton} from '../components';
import {COLOR, FONTS, hp} from '../constants/GlobalTheme';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import {openDialer} from '../utils/helpers';
import useFetch from '../hooks/useFetch';
import moment from 'moment';
import {LayoutScreen} from '.';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

const Accomodation = () => {
  const {user} = useSelector(state => state.auth);
  const {data: accomodationData, loading: accomodationLoading} = useFetch({
    url: `/get-accomodation/${user?.user_id}`,
    method: 'get',
  });

  const Times = () => {
    let temp = [];
    accomodationData?.accomodation?.map(dateTime => {
      temp.push([
        {
          name: 'check In',
          date: moment(dateTime?.check_in).format('LL'),
          time: moment(dateTime?.check_in).format('LT'),
        },
        {
          name: 'check Out',
          date: moment(dateTime?.check_out).format('LL'),
          time: moment(dateTime?.check_out).format('LT'),
        },
      ]);
    });

    return temp;
  };

  return (
    <LayoutScreen
      loading={accomodationLoading}
      data={accomodationData?.accomodation}
      headerBar={<HeaderBar headerTitle="Accomodation" />}>
      {accomodationData?.accomodation?.map((accomodation, index) => (
        <View
          key={index}
          style={{
            marginBottom: hp(3),
          }}>
          <View style={{height: hp(20)}}>
            <FastImage
              style={{height: '100%', width: '100%'}}
              key={index}
              source={{
                uri: `http://tcpindia.net/hrsummit/storage/uploads/Accomodation/${accomodation.accomo_photo}`,
                priority: FastImage.priority.normal,
                cache: 'immutable',
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>

          <View style={{width: '85%', alignSelf: 'center'}}>
            {/* resturant details  */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <View style={{width: '85%'}}>
                <Text
                  style={{
                    fontFamily: FONTS.semiBold,
                    fontSize: 16,
                    lineHeight: 24,
                  }}>
                  {accomodation?.title}
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.regular,
                    color: COLOR.gray,
                    lineHeight: 20,
                  }}>
                  {accomodation?.sub_title}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => Linking.openURL(accomodation?.google_map)}
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: COLOR.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <OcticonsIcon name="location" size={13} color={COLOR.white} />
              </TouchableOpacity>
            </View>

            {/* checkin details */}
            <View>
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  fontSize: 16,
                  marginBottom: 15,
                }}>
                Room No. : {accomodation.room_no}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {Times()[index].map((item, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: COLOR.white,
                      width: '48%',
                      padding: 15,
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        fontFamily: FONTS.semiBold,
                        textTransform: 'capitalize',
                        marginBottom: 10,
                      }}>
                      {item.name}
                    </Text>
                    <View>
                      <Text
                        style={{
                          fontFamily: FONTS.regular,
                          textTransform: 'capitalize',
                          marginBottom: 2,
                        }}>
                        {item.date}
                      </Text>
                      <Text
                        style={{
                          fontFamily: FONTS.regular,
                          textTransform: 'capitalize',
                        }}>
                        {item.time}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <RNButton
                onClick={() => openDialer(accomodation?.contact)}
                title={'Contact Hotel'}
                customContainerStyles={{marginTop: hp(2)}}
              />
            </View>
          </View>
        </View>
      ))}
    </LayoutScreen>
  );
};

export default Accomodation;
