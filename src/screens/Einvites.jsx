import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar} from '../components';
import {COLOR, FONTS, hp} from '../constants/GlobalTheme';

const Einvites = () => {
  const Invites = [
    {
      image:
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      title: 'Cultural evening',
      date: '24th Aug 2022 , Day 1',
    },
    {
      image:
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      title: 'Cultural Night',
      date: '24th Aug 2022 , Day 1',
    },
  ];
  return (
    <SafeAreaView>
      <HeaderBar headerTitle="E-invites" />
      <ScrollView style={{width: '85%', alignSelf: 'center'}}>
        {Invites.map((invite, index) => (
          <View
            key={index}
            style={{
              borderWidth: 1,
              borderColor: COLOR.gray,
              backgroundColor: COLOR.white,
              marginBottom: 15,
              borderRadius: 10,
            }}>
            <View style={{height: hp(15)}}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
                resizeMode="cover"
                source={{uri: invite.image}}
              />
            </View>
            <View style={{padding: 10}}>
              <Text style={{fontFamily: FONTS.semiBold}}>{invite.title}</Text>
              <Text
                style={{fontFamily: FONTS.regular, fontSize: 12, marginTop: 3}}>
                {invite.date}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Einvites;
