import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar, TimelineCards} from '../components';
import {ScrollView, StatusBar, Text, View} from 'react-native';
import {COLOR, FONTS, hp} from '../constants/GlobalTheme';
import LinearGradient from 'react-native-linear-gradient';

const Agenda = () => {
  const events = [
    {
      eventStartTime: '05:00 PM',
      eventEndTime: '05:30 PM',
      description: 'Assembly & Welcome Tea',
      done: true,
    },
    {
      eventStartTime: '05:00 PM',
      eventEndTime: '05:30 PM',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      done: false,
    },
    {
      eventStartTime: '05:00 PM',
      eventEndTime: '05:30 PM',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      done: false,
    },
  ];
  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderBar headerTitle="Agenda" />
      <LinearGradient
        style={{height: hp(20), justifyContent: 'center', alignItems: 'center'}}
        useAngle={true}
        angle={101.31}
        colors={[
          'rgba(108, 99, 255, 0.88) 0%',
          'rgba(108, 99, 255, 0.77) 48.39%',
          'rgba(108, 99, 255, 0.47) 100.99%);',
        ]}>
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            fontSize: 16,
            color: COLOR.white,
          }}>
          60 th HR Summit Mussorie 2022
        </Text>
      </LinearGradient>

      <View
        style={{
          flex: 1,
          width: '85%',
          alignSelf: 'center',
          paddingVertical: hp(3),
        }}>
        <View
          style={{
            borderBottomWidth: 1,
            paddingBottom: 10,
            borderColor: COLOR.gray,
          }}>
          <Text style={{fontFamily: FONTS.semiBold, fontSize: 16}}>
            12th Feb 2023
          </Text>
          <Text style={{color: COLOR.gray, fontSize: 14}}>Agenda</Text>
        </View>

        <ScrollView style={{marginTop: hp(2)}}>
          <TimelineCards data={events} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Agenda;
