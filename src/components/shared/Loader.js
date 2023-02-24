import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLOR} from '../../constants/GlobalTheme';

const Loader = ({customStyles}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...customStyles,
      }}>
      <ActivityIndicator size={'large'} color={COLOR.primary} />
    </View>
  );
};

export default Loader;
