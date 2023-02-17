import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableOpacityComponent,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  RNButton,
  HeaderBar,
  PasswordChangeModal,
  ProfileModal,
} from '../components';
import {hp, COLOR, FONTS} from '../constants/GlobalTheme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RNBottomSheet from '../components/shared/RNBottomSheet';

const Profile = () => {
  const [passwordModal, setPasswordModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const togglePasswordModal = () => setPasswordModal(!passwordModal);
  const toggleProfileModal = () => setProfileModal(!profileModal);

  const Options = [
    {
      name: 'Profile',
      icon: 'user',
      onClick: () => toggleProfileModal(),
    },
    {
      name: 'Change Password',
      icon: 'lock',
      onClick: () => togglePasswordModal(),
    },
  ];

  return (
    <SafeAreaView>
      <HeaderBar headerTitle="Profile" hideBackBtn />
      <View
        style={{
          flex: 1,
          minHeight: hp(100),
        }}>
        {/* User image area  */}
        <View style={{alignItems: 'center', marginVertical: hp(2)}}>
          <View
            style={{
              width: hp(15),
              height: hp(15),
              borderRadius: 100,
              marginVertical: hp(2),
            }}>
            <Image
              style={{width: '100%', height: '100%', borderRadius: 100}}
              resizeMode="cover"
              source={require('../../assets/Images/noProfile.png')}
            />
          </View>
        </View>

        {/* tiles section  */}
        <View
          style={{flex: 1, borderRadius: 1, width: '85%', alignSelf: 'center'}}>
          {Options.map((option, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderWidth: 1,
                padding: 15,
                borderRadius: 5,
                borderColor: COLOR.lighGray,
                backgroundColor: COLOR.white,
                marginBottom: hp(2),
              }}>
              <View style={{flexDirection: 'row'}} activeOpacity={0.5}>
                <FeatherIcon size={20} name={option.icon} />
                <Text
                  style={{
                    fontFamily: FONTS.regular,
                    fontSize: 16,
                    marginLeft: 15,
                  }}>
                  {option.name}
                </Text>
              </View>
              <TouchableOpacity
                onPress={option.onClick}
                style={{
                  backgroundColor: COLOR.primary,
                  padding: 5,
                  borderRadius: 5,
                }}>
                <FeatherIcon
                  size={20}
                  name="chevron-right"
                  color={COLOR.white}
                />
              </TouchableOpacity>
            </View>
          ))}
          <RNButton
            leftIcon={
              <FeatherIcon
                size={20}
                name="log-out"
                color={COLOR.white}
                style={{marginRight: 15}}
              />
            }
            title="logout"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
            }}>
            <Image
              style={{width: 30, height: 30, marginRight: 10}}
              resizeMode="contain"
              source={require('../../assets/Images/Logo.png')}
            />
            <Text>All Copyright reserved</Text>
          </View>
        </View>
      </View>
      <RNBottomSheet
        title="Change Password"
        visible={passwordModal}
        setVisible={setPasswordModal}>
        <PasswordChangeModal />
      </RNBottomSheet>
      <RNBottomSheet
        title="User Details"
        visible={profileModal}
        setVisible={setProfileModal}>
        <ProfileModal />
      </RNBottomSheet>
    </SafeAreaView>
  );
};

export default Profile;