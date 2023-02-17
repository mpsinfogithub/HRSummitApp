import {View, Text} from 'react-native';
import React from 'react';
import {hp} from '../../constants/GlobalTheme';
import RNInput from '../shared/RNInput';
import RNButton from '../shared/RNButton';
import FeatherIcon from 'react-native-vector-icons/Feather';

const ProfileModal = () => {
  return (
    <View style={{paddingHorizontal: hp(3)}}>
      <RNInput
        leftIcon={<FeatherIcon name="mail" size={15} />}
        placeholder="Email"
      />
      <RNInput
        leftIcon={<FeatherIcon name="user" size={15} />}
        placeholder="User Name"
      />
      <RNButton
        title={'Update Details'}
        customContainerStyles={{
          marginBottom: Platform.OS == 'ios' ? hp(3.5) : hp(2),
        }}
      />
    </View>
  );
};

export default ProfileModal;
