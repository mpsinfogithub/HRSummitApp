import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR, FONTS, hp} from '../constants/GlobalTheme';
import {RNButton, RNInput} from '../components';
import {useNavigation} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {apiRequest} from '../utils/api';
import {useDispatch} from 'react-redux';
import {setAuth} from '../redux/authSlice';
import {Formik} from 'formik';
import * as Yup from 'yup';
import EncryptedStorage from 'react-native-encrypted-storage';

const LoginComponent = () => {
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
        ToastAndroid.show(res?.data?.message, 1000);
        toggleMode(1);
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
      console.log(err.message);
    }
  };

  return (
    <View style={{width: '85%', marginVertical: hp(3)}}>
      <Formik
        validationSchema={LoginSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => {
          login(values);
          console.log(values);
        }}>
        {({handleChange, handleSubmit, values, errors}) => (
          <View>
            <RNInput
              placeholder="Email address"
              value={values.email}
              error={errors.email}
              onChangeText={handleChange('email')}
              leftIcon={<FeatherIcon name="mail" size={15} />}
            />
            <RNInput
              value={values.password}
              error={errors.password}
              onChangeText={handleChange('password')}
              placeholder="Password"
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
        ToastAndroid.show(res?.data?.message, 1000);
        return;
      }

      setLoading(false);
      toggleMode(0);
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  return (
    <ScrollView style={{width: '85%', marginVertical: hp(3)}}>
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
            ToastAndroid.show('Password not matched', 1000);
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
              placeholder="Email address"
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
              value={values.password}
              onChangeText={handleChange('password')}
              error={errors.password}
              leftIcon={<FeatherIcon name="lock" size={15} />}
            />
            <RNInput
              placeholder="Confirm Password"
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

  return (
    <ScrollView>
      <SafeAreaView style={{flex: 1, backgroundColor: COLOR.lighGray}}>
        <View
          style={{
            height: hp(30),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={require('../../assets/Images/Logo.png')} />
        </View>
        <View
          style={{
            height: hp(70),
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
