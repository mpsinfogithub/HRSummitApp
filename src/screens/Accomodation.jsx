import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Linking,
  ScrollView,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar, Loader, RNButton} from '../components';
import {COLOR, FONTS, hp, wp} from '../constants/GlobalTheme';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import {openDialer} from '../utils/helpers';
import useFetch from '../hooks/useFetch';
import moment from 'moment';

const Accomodation = () => {
  const {data: accomodationData, loading: accomodationLoading} = useFetch({
    url: '/all-accomodation',
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

  if (accomodationLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView>
      <HeaderBar headerTitle="Accomodation" />
      <ScrollView>
        {accomodationData?.accomodation?.map((accomodation, index) => (
          <View
            key={index}
            style={{
              marginBottom: hp(3),
            }}>
            <View style={{height: hp(20)}}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={{
                  uri: `http://tcpindia.net/hrsummit/storage/uploads/Accomodation/${accomodation.photo}`,
                }}
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
                <View>
                  <Text
                    style={{
                      fontFamily: FONTS.semiBold,
                      fontSize: 16,
                      lineHeight: 24,
                    }}>
                    {accomodation?.title}
                  </Text>
                  <Text style={{fontFamily: FONTS.regular, color: COLOR.gray}}>
                    {accomodation?.sub_title}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://goo.gl/maps/3QzmQkyPXwfcFDPX8')
                  }
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Accomodation;
