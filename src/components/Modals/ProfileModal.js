import {View} from 'react-native';
import React, {useState} from 'react';
import {hp} from '../../constants/GlobalTheme';
import RNInput from '../shared/RNInput';
import RNButton from '../shared/RNButton';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

const ProfileModal = () => {
  const {user} = useSelector(state => state.auth);
  const [userDetails, setUserDetails] = useState({
    email: user?.username,
    userName: user?.name,
  });

  return (
    <View style={{paddingHorizontal: hp(3)}}>
      <RNInput
        leftIcon={<FeatherIcon name="mail" size={15} />}
        placeholder="Email"
        value={userDetails?.email}
      />
      <RNInput
        leftIcon={<FeatherIcon name="user" size={15} />}
        placeholder="User Name"
        value={userDetails?.userName}
      />
      {/* <RNButton
        title={'Update Details'}
        customContainerStyles={{
          marginBottom: Platform.OS == 'ios' ? hp(3.5) : hp(2),
        }}
      /> */}
    </View>
  );
};

export default ProfileModal;
