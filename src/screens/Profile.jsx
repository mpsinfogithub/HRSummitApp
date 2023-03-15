import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  RNButton,
  HeaderBar,
  PasswordChangeModal,
  ProfileModal,
  Loader,
} from '../components';
import {hp, COLOR, FONTS} from '../constants/GlobalTheme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RNBottomSheet from '../components/shared/RNBottomSheet';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, setAuth} from '../redux/authSlice';
import ImagePicker from 'react-native-image-crop-picker';
import {apiRequest} from '../utils/api';
import EncryptedStorage from 'react-native-encrypted-storage';
import FastImage from 'react-native-fast-image';
import useFetch from '../hooks/useFetch';
import {ToastMessage} from '../utils/toastMsg';

const Profile = () => {
  const [passwordModal, setPasswordModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const togglePasswordModal = () => setPasswordModal(!passwordModal);
  const toggleProfileModal = () => setProfileModal(!profileModal);
  const [uploading, setUploading] = useState(false);
  const {user} = useSelector(state => state.auth);

  const {data: HomeData} = useFetch({
    url: '/home',
    method: 'get',
  });

  const dispatch = useDispatch();

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

  const uploadImage = async image => {
    setUploading(true);
    let formData = new FormData();
    formData.append('id', user?.user_id);
    formData.append('photo', {
      type: 'image/jpeg',
      uri: image?.path,
      name: 'upload.jpg',
    });

    const res = await apiRequest({
      body: formData,
      method: 'POST',
      url: '/update-profile-picture',
      header: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res?.status !== 200) {
      setUploading(false);
      ToastMessage({
        type: 'error',
        des: res?.data?.message,
      });
      return;
    }

    dispatch(setAuth({photo: res?.data?.photo}));
    setUploading(false);
  };

  const openImagePicker = () => {
    ImagePicker.openPicker({
      cropping: true,
      compressImageQuality: 0.5,
    })
      .then(image => {
        uploadImage(image);
      })
      .catch(err => ToastMessage({type: 'info', des: err?.message}));
  };

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
          <TouchableOpacity
            onPress={openImagePicker}
            style={{
              width: hp(15),
              height: hp(15),
              borderRadius: 100,
              borderWidth: 1,
              marginVertical: hp(2),
            }}>
            {uploading ? (
              <Loader />
            ) : (
              <FastImage
                style={{width: '100%', height: '100%', borderRadius: 100}}
                source={
                  user?.photo !== null
                    ? {
                        uri: `http://tcpindia.net/hrsummit/storage/uploads/Profile/${user?.photo}`,
                        priority: FastImage.priority.normal,
                        cache: 'immutable',
                      }
                    : require('../../assets/Images/noProfile.png')
                }
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: COLOR.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                position: 'absolute',
                bottom: -2,
                right: 5,
              }}>
              <FeatherIcon name="camera" color={COLOR.white} />
            </View>
          </TouchableOpacity>
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
            onClick={() => {
              EncryptedStorage.clear();
              dispatch(logoutUser());
            }}
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
              flex: 0.4,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: hp(2),
            }}>
            <FastImage
              style={{width: '100%', height: '100%'}}
              source={{
                uri: `http://tcpindia.net/hrsummit/storage/uploads/Gallery/${HomeData?.home?.app_logo}`,
                priority: FastImage.priority.normal,
                cache: 'immutable',
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </View>
      </View>
      <RNBottomSheet
        title="Change Password"
        visible={passwordModal}
        setVisible={setPasswordModal}>
        <PasswordChangeModal toggleModal={togglePasswordModal} />
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
