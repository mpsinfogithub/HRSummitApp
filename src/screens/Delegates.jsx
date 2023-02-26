import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar} from '../components';
import {COLOR, FONTS, hp, wp} from '../constants/GlobalTheme';
import {useNavigation} from '@react-navigation/native';
import useFetch from '../hooks/useFetch';

const DelegateCard = ({delegate}) => {
  const navigation = useNavigation();
  const {data: delegatesData, loading: delegatesLoading} = useFetch({
    url: '/all-deligate',
    method: 'get',
  });

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Delegate Info')}
        style={{
          width: wp(25),
          height: wp(25),
          backgroundColor: COLOR.white,
          padding: 10,
          borderRadius: 10,
        }}>
        <Image
          source={{uri: delegate.img}}
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
  const delegates = [
    {
      name: 'HPCL',
      img: 'https://upload.wikimedia.org/wikipedia/hi/thumb/8/8c/Hindustan_Petroleum_Logo.svg/1200px-Hindustan_Petroleum_Logo.svg.png',
    },
    {
      name: 'BPCL',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Official_BPCL_LOGO_with_tagline_Energising_Lives.pdf/page1-1200px-Official_BPCL_LOGO_with_tagline_Energising_Lives.pdf.jpg',
    },
    {
      name: 'CPCL',
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Chennai_Petroleum_Corporation_logo.svg/1200px-Chennai_Petroleum_Corporation_logo.svg.png',
    },
  ];
  return (
    <SafeAreaView>
      <HeaderBar headerTitle="Delegates" />
      <FlatList
        columnWrapperStyle={{
          justifyContent: 'space-between',
          width: '85%',
          alignSelf: 'center',
          marginTop: hp(2.2),
        }}
        data={delegates}
        numColumns={3}
        keyExtractor={({item, index}) => index}
        renderItem={({item}) => <DelegateCard delegate={item} />}
      />
    </SafeAreaView>
  );
};

export default Delegates;
