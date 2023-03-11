import {View, Text, Platform} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar, RNButton, RNInput} from '../components';
import {FONTS, hp} from '../constants/GlobalTheme';

const Feedback = () => {
  return (
    <SafeAreaView>
      <HeaderBar headerTitle="Feedback" />
      <View style={{width: '85%', alignSelf: 'center', marginVertical: 10}}>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 16,
            marginBottom: 8,
          }}>
          Share your thoughts about the Summit
        </Text>
        <RNInput
          textAlignVertical={Platform.OS === 'ios' ? 'center' : 'top'}
          customContainerStyles={{
            marginTop: Platform.OS === 'ios' ? 10 : hp(1.5),
            height: Platform.OS === 'ios' ? hp(8) : hp(20),
            // paddingVertical: 10,
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

export default Feedback;
