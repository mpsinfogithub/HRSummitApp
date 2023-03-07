import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';
import {HeaderBar} from '../components';
import {COLOR, FONTS, hp} from '../constants/GlobalTheme';
import useFetch from '../hooks/useFetch';
import {LayoutScreen} from '.';
import moment from 'moment';

const Einvites = () => {
  const {data: einvitesData, loading: einvitesLoading} = useFetch({
    url: '/all-einvite',
    method: 'get',
  });

  return (
    <LayoutScreen
      loading={einvitesLoading}
      headerBar={<HeaderBar headerTitle="E-invites" />}
      scrollable={false}>
      <ScrollView style={{width: '85%', alignSelf: 'center'}}>
        {einvitesData?.einvite.map((invite, index) => (
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
                source={{
                  uri: `http://tcpindia.net/hrsummit/storage/uploads/Gallery/${invite.photo}`,
                }}
              />
            </View>
            <View style={{padding: 10}}>
              <Text style={{fontFamily: FONTS.semiBold}}>{invite?.des}</Text>
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 12,
                  marginTop: 3,
                }}>
                {moment(invite?.event_date).format('LL')}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </LayoutScreen>
  );
};

export default Einvites;
