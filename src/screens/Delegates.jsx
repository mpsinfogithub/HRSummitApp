import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar} from '../components';
import {COLOR, FONTS, hp, wp} from '../constants/GlobalTheme';
import {useNavigation} from '@react-navigation/native';
import useFetch from '../hooks/useFetch';
import {LayoutScreen} from '.';

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
        <Image
          source={{
            uri: `http://tcpindia.net/hrsummit/storage/uploads/Gallery/${delegate?.photo}`,
          }}
          resizeMode="contain"
          style={{width: '100%', height: '100%'}}
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
