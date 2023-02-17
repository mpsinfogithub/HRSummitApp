import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar} from '../components';
import {FONTS, hp} from '../constants/GlobalTheme';

const Place = () => {
  const data = {
    image:
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    title: 'Amazing Place Name',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing nec, enim a lectus ut. Praesent condimentum et ut ullamcorper orci. Quam viverra at tristique suspendisse malesuada viverra pharetra sapien, lacinia. Arcu bibendum congue eget sed eget pharetra non.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing nec, enim a lectus ut. Praesent condimentum et ut ullamcorper orci. Quam viverra at tristique suspendisse malesuada viverra pharetra sapien, lacinia. Arcu bibendum congue eget sed eget pharetra non.
    `,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderBar headerTitle="Place Name" />
      <View style={{height: hp(25), marginVertical: 8}}>
        <Image
          source={{uri: data.image}}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
      <ScrollView
        style={{width: '90%', alignSelf: 'center', marginTop: hp(1.5)}}>
        <Text
          style={{fontFamily: FONTS.semiBold, fontSize: 16, marginBottom: 10}}>
          {data.title}
        </Text>
        <Text style={{fontFamily: FONTS.regular, lineHeight: 20}}>
          {data.description}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Place;
