import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {HeaderBar, TimelineCards} from '../components';
import {COLOR, FONTS, hp} from '../constants/GlobalTheme';
import {LayoutScreen} from '.';
import useFetch from '../hooks/useFetch';

const Activities = () => {
  const {data: activitiesData, loading: activitiesLoading} = useFetch({
    url: '/all-activity',
    method: 'get',
  });

  const Activities = () => {
    let data = [];
    activitiesData?.activity?.map(agenda => {
      let temp = {};
      temp['title'] = agenda?.[0];
      temp['activityData'] = agenda?.[1];
      data.push(temp);
    });

    return data;
  };

  return (
    <LayoutScreen
      loading={activitiesLoading}
      data={Activities()}
      headerBar={<HeaderBar headerTitle="Activities" />}
      scrollable={false}>
      <>
        <ScrollView style={{marginTop: hp(1)}}>
          {Activities()?.map((activity, index) => (
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
                  {activity?.title}
                </Text>
                <TimelineCards data={activity.activityData} />
              </View>
            </View>
          ))}
        </ScrollView>
      </>
    </LayoutScreen>
  );
};

export default Activities;
