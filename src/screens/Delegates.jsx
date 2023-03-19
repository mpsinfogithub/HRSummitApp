import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {HeaderBar} from '../components';
import {COLOR, FONTS, hp, wp} from '../constants/GlobalTheme';
import {useNavigation} from '@react-navigation/native';
import useFetch from '../hooks/useFetch';
import {LayoutScreen} from '.';
import FastImage from 'react-native-fast-image';

const DelegateCard = ({delegate}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Delegate Info', {
            id: delegate?.id,
            name: delegate?.name,
          })
        }
        style={{
          width: wp(25),
          height: wp(25),
          backgroundColor: COLOR.white,
          padding: 10,
          borderRadius: 10,
        }}>
        <FastImage
          style={{height: '100%', width: '100%'}}
          source={{
            uri: `http://tcpindia.net/hrsummit/storage/uploads/Gallery/${delegate?.photo}`,
            priority: FastImage.priority.normal,
            cache: 'immutable',
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
      <Text style={{fontFamily: FONTS.regular, marginTop: 5}}>
        {delegate.name}
      </Text>
    </View>
  );
};

const Delegates = () => {
  const {data: delegatesData, loading: delegatesLoading} = useFetch({
    url: '/all-deligate',
    method: 'get',
  });

  return (
    <LayoutScreen
      headerBar={<HeaderBar headerTitle="Delegates" />}
      scrollable={false}
      data={delegatesData?.all_deligate}
      loading={delegatesLoading}>
      <>
        <FlatList
          columnWrapperStyle={{
            justifyContent: 'space-between',
            width: '85%',
            alignSelf: 'center',
            marginTop: hp(2.2),
          }}
          data={delegatesData?.all_deligate}
          numColumns={3}
          keyExtractor={({item, index}) => index}
          renderItem={({item}) => <DelegateCard delegate={item} />}
        />
      </>
    </LayoutScreen>
  );
};

export default Delegates;
