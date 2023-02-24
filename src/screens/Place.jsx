import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar, Loader} from '../components';
import {FONTS, hp} from '../constants/GlobalTheme';
import useFetch from '../hooks/useFetch';

const Place = () => {
  const {data: AboutData, loading: aboutLoading} = useFetch({
    url: '/about',
    method: 'get',
  });

  const data = {
    image:
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    title: 'Amazing Place Name',
    description: AboutData?.about?.des,
  };

  if (aboutLoading) {
    return <Loader />;
  }

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
        <Text style={{fontFamily: FONTS.regular, lineHeight: 22}}>
          {data.description}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Place;
