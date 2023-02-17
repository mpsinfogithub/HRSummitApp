import {Platform, View} from 'react-native';
import React from 'react';
import RNInput from '../shared/RNInput';
import RNButton from '../shared/RNButton';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import {COLOR, hp} from '../../constants/GlobalTheme';

const ChangePassword = ({toggleModal}) => {
  const [loading, setLoading] = useState(false);
  const chnagePasswordSchema = Yup.object().shape({
    current_password: Yup.string()
      .min(8, 'min length - 8 characters')
      .required(),
    password: Yup.string()
      .min(8, 'min length - 8 characters')
      .required('Password is required'),
    confirm_password: Yup.string()
      .min(8, 'min length - 8 characters')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required(),
  });

  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
      }}>
      <Formik
        validationSchema={chnagePasswordSchema}
        initialValues={{
          current_password: '',
          password: '',
          confirm_password: '',
        }}
        onSubmit={values => {
          submitPassword(values);
        }}>
        {({handleChange, handleSubmit, values, errors}) => (
          <View>
            <RNInput
              value={values.current_password}
              onChangeText={handleChange('current_password')}
              error={errors?.current_password}
              placeholder="Enter Current Password"
            />
            <RNInput
              value={values.password}
              onChangeText={handleChange('password')}
              error={errors?.password}
              placeholder="Enter New Password"
            />
            <RNInput
              value={values.confirm_password}
              onChangeText={handleChange('confirm_password')}
              error={errors?.confirm_password}
              placeholder="Retype New Password"
            />
            <RNButton
              loading={loading}
              title={'Change Password'}
              customContainerStyles={{
                marginBottom: Platform.OS == 'ios' ? hp(3.5) : hp(2),
              }}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ChangePassword;
