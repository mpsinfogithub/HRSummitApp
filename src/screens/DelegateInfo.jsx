import {View, Text, ScrollView, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar} from '../components';
import {COLOR, FONTS, hp, wp} from '../constants/GlobalTheme';
import useFetch from '../hooks/useFetch';
import {LayoutScreen} from '.';

const Card = ({data}) => {
  const formatData = () => {
    return {
      name: data?.name,
      company: data?.company,
      designation: data?.designation,
      email: data?.email,
      phone: data?.phone,
    };
  };

  return (
    <View
      style={{
        backgroundColor: COLOR.white,
        paddingHorizontal: wp(9),
        paddingVertical: hp(1.5),
        marginBottom: 15,
        borderWidth: 1,
        borderColor: COLOR.lighGray,
      }}>
      {Object.entries(formatData()).map(([key, value], index) => (
        <Text
          style={{
            fontFamily: FONTS.semiBold,
            lineHeight: 24,
            textTransform: 'capitalize',
          }}
          key={index}>
          {key} :{' '}
          <Text style={{fontFamily: FONTS.regular, textTransform: 'none'}}>
            {value}
          </Text>
        </Text>
      ))}
    </View>
  );
};

const DelegateInfo = ({route}) => {
  const {id, name} = route.params;

  const {data: delegateData, loading: delegateLoading} = useFetch({
    url: `/deligate-detail/${id}`,
    method: 'get',
  });

  return (
    <LayoutScreen
      headerBar={<HeaderBar headerTitle={`${name} - Delegates`} />}
      scrollable={false}
      data={delegateData?.deligate_detail}
      loading={delegateLoading}>
      <>
        <FlatList
          contentContainerStyle={{marginTop: 10}}
          data={delegateData?.deligate_detail}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => <Card data={item} />}
        />
      </>
    </LayoutScreen>
  );
};

export default DelegateInfo;
