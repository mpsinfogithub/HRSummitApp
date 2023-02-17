import {View, Text, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar} from '../components';
import {COLOR, FONTS, hp} from '../constants/GlobalTheme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {openDialer} from '../utils/helpers';

const Help = () => {
  const HelpServices = [
    {
      serviceName: 'Emergency service - Hotel JW Marriott',
      contacts: [
        {
          name: 'Reception',
          phoneNo: '+91 86782134724',
        },
        {
          name: 'Services',
          phoneNo: '+91 86782134724',
        },
      ],
    },
    {
      serviceName: 'Emergency service - Hotel JW Marriott',
      contacts: [
        {
          name: 'Reception',
          phoneNo: '+91 86782134724',
        },
        {
          name: 'Services',
          phoneNo: '+91 86782134724',
        },
      ],
    },
  ];

  return (
    <SafeAreaView>
      <HeaderBar headerTitle="Happy to Help" />
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
        <Text
          style={{fontFamily: FONTS.semiBold, fontSize: 24, color: COLOR.dark}}>
          Contact Us
        </Text>

        {HelpServices.map((service, index) => (
          <View key={index} style={{marginVertical: hp(1.2)}}>
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                borderBottomWidth: 1,
                borderColor: COLOR.gray,
                paddingBottom: 10,
              }}>
              {service.serviceName}
            </Text>
            {service.contacts.map((contact, index) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 15,
                }}
                key={index}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FeatherIcon name="user" size={20} style={{marginRight: 8}} />
                  <Text style={{fontFamily: FONTS.regular}}>
                    {contact.name}
                  </Text>
                </View>
                <Text
                  onPress={() => openDialer(contact.phoneNo)}
                  style={{fontFamily: FONTS.regular, color: COLOR.primary}}>
                  {contact.phoneNo}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Help;
