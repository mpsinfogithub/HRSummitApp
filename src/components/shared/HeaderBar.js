import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {COLOR, FONTS, hp} from '../../constants/GlobalTheme';
import {useNavigation} from '@react-navigation/native';
import {BackBtn} from '../../../assets';

const HeaderBar = ({
  headerTitle = 'header',
  hideBackBtn = false,
  hideTitle = false,
  leftIcon,
  onLeftIconPress,
  onBack,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {!hideBackBtn && (
        <TouchableOpacity
          onPress={() => (onBack ? onBack() : navigation.goBack())}
          style={styles.backBtn}>
          <BackBtn />
        </TouchableOpacity>
      )}
      {!hideTitle && <Text style={styles.HeaderText}>{headerTitle}</Text>}
      <TouchableOpacity onPress={onLeftIconPress} style={styles.rightBtn}>
        {leftIcon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: hp(2.5),
    backgroundColor: COLOR.lighGray,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    alignSelf: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 20,
    paddingHorizontal: 15,
  },
  rightBtn: {
    position: 'absolute',
    right: 20,
    paddingHorizontal: 15,
  },
  HeaderText: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
  },
});

export default HeaderBar;
