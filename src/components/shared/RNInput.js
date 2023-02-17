import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {COLOR, FONTS, hp} from '../../constants/GlobalTheme';

const RNInput = ({
  leftIcon,
  rightIcon,
  customContainerStyles,
  label,
  error,
  ...props
}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        marginBottom: hp(error ? 0.5 : 2.3),
      }}>
      {label && (
        <Text
          style={{
            fontFamily: FONTS.regular,
            marginBottom: hp(1.2),
            marginLeft: 0,
            fontSize: 13,
          }}>
          {label}
        </Text>
      )}
      <View style={[styles.inputContainer, {...customContainerStyles}]}>
        {leftIcon && <View style={{marginHorizontal: 15}}>{leftIcon}</View>}
        <TextInput
          keyboardAppearance="light"
          placeholderTextColor={COLOR.gray}
          style={[styles.input, {marginHorizontal: !leftIcon ? 15 : 0}]}
          {...props}
        />
        {rightIcon && <View style={{marginHorizontal: 15}}>{rightIcon}</View>}
      </View>
      {error && (
        <Text
          style={{
            fontFamily: FONTS.regular,
            marginVertical: hp(1),
            color: COLOR.primary,
            fontSize: 13,
          }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLOR.white,
    width: '100%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: COLOR.dark,
    fontFamily: FONTS.regular,
  },
});

export default RNInput;
