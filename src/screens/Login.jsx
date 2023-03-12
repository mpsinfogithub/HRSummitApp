import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {COLOR, FONTS, hp} from '../constants/GlobalTheme';
import {RNButton, RNInput} from '../components';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {apiRequest} from '../utils/api';
import {useDispatch} from 'react-redux';
import {setAuth} from '../redux/authSlice';
import {Formik} from 'formik';
import * as Yup from 'yup';
import EncryptedStorage from 'react-native-encrypted-storage';
import FastImage from 'react-native-fast-image';
import useFetch from '../hooks/useFetch';
import {ToastMessage} from '../utils/toastMsg';

const LoginComponent = ({toggleMode}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8, 'At least 8 characters').required(),
  });

  const login = async values => {
    try {
      setLoading(true);
      const res = await apiRequest({
        url: '/login',
        method: 'post',
        body: values,
      });

      if (res?.status !== 200 || res?.data?.status !== 200) {
        setLoading(false);
        ToastMessage({
          type: 'error',
          title: 'Login Error',
          des: res?.data?.message,
        });
        return;
      }

      //storing the token
      EncryptedStorage.setItem(
        'auth_token',
        JSON.stringify({token: res?.data?.token}),
      );

      //storing user data
      dispatch(setAuth(res?.data));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <View style={{width: '85%', flex: 1, marginVertical: hp(3)}}>
      <Formik
        validationSchema={LoginSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => {
          login(values);
        }}>
        {({handleChange, handleSubmit, values, errors}) => (
          <View>
            <RNInput
              placeholder="Email"
              value={values.email}
              error={errors.email}
              onChangeText={handleChange('email')}
              leftIcon={<FeatherIcon name="mail" size={15} />}
            />
            <RNInput
              value={values.password}
              error={errors.password}
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              placeholder="Password"
              secureEntry={true}
              leftIcon={<FeatherIcon name="lock" size={15} />}
            />
            <RNButton
              loading={loading}
              onClick={handleSubmit}
              customContainerStyles={{marginTop: hp(1)}}
              title={'Login Now'}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const SignUpComponent = ({toggleMode}) => {
  const [loading, setLoading] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too short name !').required(),
    email: Yup.string().email().required(),
    phone: Yup.number().required(),
    password: Yup.string().min(8, 'At least 8 characters').required(),
    confirm_password: Yup.string()
      .min(8, 'At least 8 characters')
      .required('Confirm password is required'),
  });

  const register = async values => {
    try {
      setLoading(true);
      const res = await apiRequest({
        url: '/register',
        method: 'post',
        body: values,
      });

      if (res?.status !== 200) {
        setLoading(false);
        ToastMessage({
          type: 'error',
          title: 'Registration Error',
          des: res?.data?.message,
        });
        return;
      }

      setLoading(false);
      toggleMode(0);
      ToastMessage({
        type: 'success',
        des: 'Registration Done',
      });
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  return (
    <ScrollView style={{width: '85%', marginTop: hp(3)}}>
      <Formik
        validationSchema={RegisterSchema}
        initialValues={{
          name: '',
          email: '',
          mobile: '',
          password: '',
          confirm_password: '',
        }}
        onSubmit={values => {
          if (values.password !== values.confirm_password) {
            ToastMessage({
              type: 'info',
              title: 'Password Info',
              des: 'Password not matched',
            });
            return;
          }
          register(values);
        }}>
        {({handleChange, handleSubmit, errors, values}) => (
          <View>
            <RNInput
              placeholder="Your Name"
              value={values.name}
              onChangeText={handleChange('name')}
              error={errors.name}
              leftIcon={<FeatherIcon name="user" size={18} />}
            />
            <RNInput
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              error={errors.email}
              leftIcon={<FeatherIcon name="mail" size={15} />}
            />
            <RNInput
              placeholder="Phone Number"
              value={values.phone}
              onChangeText={handleChange('phone')}
              error={errors.phone}
              leftIcon={<FeatherIcon name="phone" size={15} />}
            />
            <RNInput
              placeholder="Password"
              secureTextEntry={true}
              value={values.password}
              onChangeText={handleChange('password')}
              error={errors.password}
              leftIcon={<FeatherIcon name="lock" size={15} />}
            />
            <RNInput
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={values.confirm_password}
              onChangeText={handleChange('confirm_password')}
              error={errors.confirm_password}
              leftIcon={<FeatherIcon name="lock" size={15} />}
            />
            <RNButton
              loading={loading}
              onClick={handleSubmit}
              title={'SignUp Now'}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const Login = () => {
  const MODES = ['Login', 'SignUp'];
  const [activeMode, setActiveMode] = useState(MODES[0]);
  const toggleMode = (mode = 0) => setActiveMode(MODES[mode]);

  const sponserImages = [
    require('../../assets/Images/sponsers/image1.png'),
    require('../../assets/Images/sponsers/image2.png'),
    require('../../assets/Images/sponsers/image3.png'),
  ];

  const {data: HomeData} = useFetch({
    url: '/home',
    method: 'get',
  });

  const {data: sponsersData} = useFetch({
    url: '/all-sponsor',
    method: 'get',
  });

  console.log(sponsersData);

  return (
    <ScrollView>
      <StatusBar backgroundColor={COLOR.lighGray} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' && 'position'}
        style={{flex: 1, backgroundColor: COLOR.lighGray}}>
        <View
          style={{
            height: hp(35),
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <FastImage
            style={{height: '80%', width: '50%'}}
            source={{
              uri: `http://tcpindia.net/hrsummit/storage/uploads/Gallery/${HomeData?.home?.app_logo}`,
              priority: FastImage.priority.normal,
              cache: 'immutable',
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View
          style={{
            height: hp(65),
            alignItems: 'center',
          }}>
          {/* <Text style={{fontFamily: FONTS.bold, fontSize: 24}}>
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
          </Text> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {MODES.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  marginRight: 15,
                  alignItems: 'center',
                  marginTop: hp(1.5),
                }}
                onPress={() => setActiveMode(item)}>
                <Text
                  style={{
                    fontFamily:
                      activeMode === item ? FONTS.semiBold : FONTS.regular,
                    fontSize: activeMode === item ? 16 : 14,
                    color: activeMode === item ? COLOR.primary : COLOR.gray,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {activeMode === MODES[0] ? (
            <LoginComponent toggleMode={toggleMode} />
          ) : (
            <SignUpComponent toggleMode={toggleMode} />
          )}
          {activeMode === MODES[0] && (
            <View style={{flex: 0.5}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: 15,
                }}>
                {sponsersData?.all_sponsor?.map((image, index) => (
                  <View
                    style={{width: 50, height: 50, marginRight: hp(1.5)}}
                    key={index}>
                    <FastImage
                      style={{height: '100%', width: '100%'}}
                      source={{
                        uri: `http://tcpindia.net/hrsummit/storage/uploads/Gallery/${image?.photo}`,
                        priority: FastImage.priority.normal,
                        cache: 'immutable',
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </View>
                ))}
              </View>
              <Text
                style={{
                  fontFamily: FONTS.medium,
                  textAlign: 'center',
                }}>
                Developed by TCP Digiworks
              </Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Login;
