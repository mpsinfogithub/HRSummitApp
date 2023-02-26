import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar, Loader} from '../components';
import {FONTS, hp} from '../constants/GlobalTheme';
import useFetch from '../hooks/useFetch';
import {LayoutScreen} from '.';

const Place = ({route}) => {
  const routeData = route.params;
  const {data: AboutData, loading: aboutLoading} = useFetch({
    url: '/about',
    method: 'get',
  });

  const data = {
    image: `http://tcpindia.net/hrsummit/storage/uploads/Gallery/${AboutData?.about?.photo}`,
    title: `About ${routeData?.placeName} `,
    description: AboutData?.about?.des,
  };

  return (
    <LayoutScreen
      loading={aboutLoading}
      headerBar={<HeaderBar headerTitle={routeData?.placeName} />}>
      <>
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
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: 16,
              marginBottom: 10,
            }}>
            {data.title}
          </Text>
          <Text style={{fontFamily: FONTS.regular, lineHeight: 22}}>
            {data.description}
          </Text>
        </ScrollView>
      </>
    </LayoutScreen>
  );
};

export default Place;
