import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR, FONTS, hp} from '../constants/GlobalTheme';
import {RNButton, RNInput} from '../components';
import {useNavigation} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const LoginComponent = () => {
  const navigation = useNavigation();
  return (
    <View style={{width: '85%', marginVertical: hp(3)}}>
      <RNInput
        placeholder="Email address"
        leftIcon={<FeatherIcon name="mail" size={15} />}
      />
      <RNInput
        placeholder="Password"
        leftIcon={<FeatherIcon name="lock" size={15} />}
      />
      <RNButton
        onClick={() => navigation.navigate('AppStack')}
        customContainerStyles={{marginTop: hp(1)}}
        title={'Login Now'}
      />
    </View>
  );
};

const SignUpComponent = () => {
  const navigation = useNavigation();
  return (
    <View style={{width: '85%', marginVertical: hp(3)}}>
      <RNInput
        placeholder="Your Name"
        leftIcon={<FeatherIcon name="user" size={18} />}
      />
      <RNInput
        placeholder="Email address"
        leftIcon={<FeatherIcon name="mail" size={15} />}
      />
      <RNInput
        placeholder="Password"
        leftIcon={<FeatherIcon name="lock" size={15} />}
      />
      <RNInput
        placeholder="Confirm Password"
        leftIcon={<FeatherIcon name="lock" size={15} />}
      />
      <RNButton
        onClick={() => navigation.navigate('AppStack')}
        customContainerStyles={{marginTop: hp(1)}}
        title={'SignUp Now'}
      />
    </View>
  );
};

const Login = () => {
  const MODES = ['Login', 'SignUp'];
  const [activeMode, setActiveMode] = useState(MODES[0]);

  const sponserImages = [
    require('../../assets/Images/sponsers/image1.png'),
    require('../../assets/Images/sponsers/image2.png'),
    require('../../assets/Images/sponsers/image3.png'),
  ];

  return (
    <ScrollView>
      <SafeAreaView style={{flex: 1, backgroundColor: COLOR.lighGray}}>
        <View
          style={{
            height: hp(35),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={require('../../assets/Images/Logo.png')} />
        </View>
        <View
          style={{
            height: hp(65),
            alignItems: 'center',
          }}>
          <Text style={{fontFamily: FONTS.bold, fontSize: 24}}>
            Get Started with TCP
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: 14,
              width: '75%',
              textAlign: 'center',
              marginTop: 10,
              lineHeight: 23,
            }}>
            Provide your credentials recieved from TCP in your Email address
          </Text>
          <View
            style={{
              marginTop: hp(2),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {MODES.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{marginRight: 15, alignItems: 'center'}}
                onPress={() => setActiveMode(item)}>
                <Text
                  style={{
                    fontFamily:
                      activeMode === item ? FONTS.semiBold : FONTS.regular,
                    fontSize: activeMode === item ? 16 : 14,
                    paddingBottom: 5,
                    color: activeMode === item ? COLOR.primary : COLOR.gray,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {activeMode === MODES[0] ? <LoginComponent /> : <SignUpComponent />}
          {activeMode === MODES[0] && (
            <>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: hp(1),
                }}>
                {sponserImages.map((image, index) => (
                  <View
                    style={{width: 55, height: 55, marginRight: hp(1.5)}}
                    key={index}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      resizeMode="contain"
                      source={image}
                    />
                  </View>
                ))}
              </View>
              <Text style={{fontFamily: FONTS.regular, marginTop: 10}}>
                Hosted by TCP Company pvt.Ltd
              </Text>
            </>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;
