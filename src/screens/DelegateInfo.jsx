import {View, Text, ScrollView, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar} from '../components';
import {COLOR, FONTS, hp, wp} from '../constants/GlobalTheme';

const Card = ({data}) => {
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
      {Object.entries(data).map(([key, value], index) => (
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

const DelegateInfo = () => {
  const delegateData = [
    {
      name: 'some name',
      company: 'some company',
      destination: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      email: 'someemail@gmail.com',
      phone: '+9186725742',
    },
    {
      name: 'some name',
      company: 'some company',
      destination: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      email: 'someemail@gmail.com',
      phone: '+9186725742',
    },
    {
      name: 'some name',
      company: 'some company',
      destination: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      email: 'someemail@gmail.com',
      phone: '+9186725742',
    },
    {
      name: 'some name',
      company: 'some company',
      destination: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      email: 'someemail@gmail.com',
      phone: '+9186725742',
    },
  ];
  return (
    <SafeAreaView>
      <HeaderBar headerTitle="Delegate Name" />
      <FlatList
        contentContainerStyle={{marginTop: 10}}
        data={delegateData}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => <Card data={item} />}
      />
    </SafeAreaView>
  );
};

export default DelegateInfo;
