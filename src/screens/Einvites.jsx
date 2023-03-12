import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {HeaderBar} from '../components';
import {COLOR, FONTS, hp} from '../constants/GlobalTheme';
import useFetch from '../hooks/useFetch';
import {LayoutScreen} from '.';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

const Einvites = () => {
  const [showDetails, setShowDetails] = useState(null);
  const {data: einvitesData, loading: einvitesLoading} = useFetch({
    url: '/all-einvite',
    method: 'get',
  });

  const setActiveShowDetails = invite => {
    setShowDetails(prev => {
      return {
        ...prev,
        [invite?.id]: !showDetails?.[invite?.id],
      };
    });
  };

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
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setActiveShowDetails(invite)}
              style={{height: hp(15)}}>
              <FastImage
                style={{
                  height: '100%',
                  width: '100%',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
                source={{
                  uri: `http://tcpindia.net/hrsummit/storage/uploads/Gallery/${invite.photo}`,
                  priority: FastImage.priority.normal,
                  cache: 'immutable',
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
            <View style={{padding: 10}}>
              {showDetails?.[invite?.id] && (
                <Text style={{fontFamily: FONTS.regular}}>{invite?.des}</Text>
              )}
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  color: COLOR.gray,
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
