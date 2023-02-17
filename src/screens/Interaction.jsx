import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar, RNButton, RNInput} from '../components';
import {COLOR, FONTS, hp} from '../constants/GlobalTheme';

const Interaction = () => {
  return (
    <SafeAreaView>
      <HeaderBar headerTitle="Interaction" />
      <View style={{width: '85%', alignSelf: 'center', marginVertical: 10}}>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 16,
          }}>
          Share your thoughts about the Summit
        </Text>
        <RNInput
          textAlignVertical="top"
          customContainerStyles={{
            marginTop: hp(2),
            height: hp(20),
            paddingVertical: 10,
          }}
          placeholder={'Enter your thoughts'}
          numberOfLines={10}
          multiline={true}
        />
        <RNButton title={'Submit'} />
      </View>
    </SafeAreaView>
  );
};

export default Interaction;
