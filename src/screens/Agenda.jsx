import React from 'react';
import {HeaderBar, TimelineCards} from '../components';
import {ScrollView, Text, View} from 'react-native';
import {COLOR, FONTS, hp} from '../constants/GlobalTheme';
import LinearGradient from 'react-native-linear-gradient';
import useFetch from '../hooks/useFetch';
import moment from 'moment';
import {LayoutScreen} from '.';

const Agenda = ({route}) => {
  const {title} = route.params;

  const {data: agendaData, loading: agendaLoading} = useFetch({
    url: '/all-agenda',
    method: 'get',
  });

  const Events = () => {
    let data = [];
    agendaData?.agenda?.map(agenda => {
      let temp = {};
      temp['date'] = agenda?.[0];
      temp['agendaData'] = agenda?.[1];
      data.push(temp);
    });

    return data;
  };

  return (
    <LayoutScreen
      loading={agendaLoading}
      headerBar={<HeaderBar headerTitle="Agenda" />}>
      <>
        <LinearGradient
          style={{
            height: hp(20),
            justifyContent: 'center',
            alignItems: 'center',
          }}
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
            {title}
          </Text>
        </LinearGradient>

        <View
          style={{
            flex: 1,
            width: '85%',
            alignSelf: 'center',
            paddingVertical: hp(3),
          }}>
          {Events()?.map((events, index) => (
            <View
              key={index}
              style={{
                paddingBottom: 10,
                borderColor: COLOR.gray,
              }}>
              <Text style={{fontFamily: FONTS.semiBold, fontSize: 16}}>
                {moment(events?.date).format('LL')}
              </Text>
              <Text style={{color: COLOR.gray, fontSize: 14}}>Agenda</Text>
              <ScrollView style={{marginTop: hp(2)}}>
                <TimelineCards data={events?.agendaData} />
              </ScrollView>
            </View>
          ))}
        </View>
      </>
    </LayoutScreen>
  );
};

export default Agenda;
