import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar, TimelineCards} from '../components';
import {COLOR, FONTS, hp} from '../constants/GlobalTheme';

const Activities = () => {
  const activities = [
    {
      title: 'Programme/Actovites for spouses',
      events: [
        {
          eventStartTime: '05:00 PM',
          eventEndTime: '05:30 PM',
          description: 'Assembly & Welcome Tea',
          done: true,
        },
        {
          eventStartTime: '05:00 PM',
          eventEndTime: '05:30 PM',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          done: false,
        },
        {
          eventStartTime: '05:00 PM',
          eventEndTime: '05:30 PM',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          done: false,
        },
      ],
    },
    {
      title: 'Programme/Actovites for spouses',
      events: [
        {
          eventStartTime: '05:00 PM',
          eventEndTime: '05:30 PM',
          description: 'Assembly & Welcome Tea',
          done: true,
        },
        {
          eventStartTime: '05:00 PM',
          eventEndTime: '05:30 PM',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          done: false,
        },
        {
          eventStartTime: '05:00 PM',
          eventEndTime: '05:30 PM',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          done: false,
        },
      ],
    },
  ];

  return (
    <SafeAreaView>
      <HeaderBar headerTitle="Activities" />
      <ScrollView style={{marginTop: hp(1)}}>
        {activities.map((activity, index) => (
          <View
            key={index}
            style={{backgroundColor: COLOR.white, marginBottom: 15}}>
            <View
              key={index}
              style={{
                width: '85%',
                alignSelf: 'center',
                marginBottom: 15,
                backgroundColor: COLOR.white,
              }}>
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  marginVertical: 15,
                  fontSize: 16,
                }}>
                {activity.title}
              </Text>
              <TimelineCards data={activity.events} />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activities;
