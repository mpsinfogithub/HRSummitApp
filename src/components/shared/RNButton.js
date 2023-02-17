import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLOR, FONTS} from '../../constants/GlobalTheme';

const RNButton = ({
  title,
  leftIcon,
  rightIcon,
  onClick,
  customContainerStyles,
  cutomTextStyles,
  loading = false,
  loaderColor = COLOR.white,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={loading ? () => {} : () => onClick()}
      style={[styles.btnContainer, {...customContainerStyles}]}>
      {leftIcon}
      <Text style={[styles.btnText, {...cutomTextStyles}]}>
        {loading ? (
          <ActivityIndicator color={loaderColor} size="small" />
        ) : (
          title
        )}
      </Text>
      {rightIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: COLOR.primary,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: COLOR.white,
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
});

export default RNButton;
