import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Linking,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar, RNButton} from '../components';
import {COLOR, FONTS, hp, wp} from '../constants/GlobalTheme';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import {openDialer} from '../utils/helpers';

const Accomodation = () => {
  const Times = [
    {
      name: 'check In',
      date: '24th Jun 2022',
      time: '10:00 AM',
    },
    {
      name: 'check In',
      date: '30th Jun 2022',
      time: '10:00 AM',
    },
  ];

  return (
    <SafeAreaView>
      <HeaderBar headerTitle="Accomodation" />
      <View>
        <View style={{height: hp(25)}}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={{
              uri: 'https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
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
                Welcome Hotel by ITC Hotels,
              </Text>
              <Text style={{fontFamily: FONTS.regular, color: COLOR.gray}}>
                The savoy, Mussorie
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
              Room No. : HT76
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {Times.map((item, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: COLOR.white,
                    width: '48%',
                    padding: 15,
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

            <Text style={{fontFamily: FONTS.semiBold, marginTop: hp(2)}}>
              Reception :{' '}
              <Text style={{fontFamily: FONTS.regular, color: COLOR.primary}}>
                +91 86782134724
              </Text>
            </Text>

            <RNButton
              onClick={() => openDialer('+91 86782134724')}
              title={'Contact Hotel'}
              customContainerStyles={{marginTop: hp(2)}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Accomodation;
