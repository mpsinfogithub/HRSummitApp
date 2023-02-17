import {StatusBar} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export {widthPercentageToDP as wp};
export {heightPercentageToDP as hp};

export const SIZES = {
  heading: 24,
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20,
};

export const COLOR = {
  primary: '#6C63FF',
  background: '#D1D1D1',
  white: '#fff',
  gray: '#7A809D',
  dark: '#2E3E5C',
  darker: '#1B1721',
  darkLight: '#4D4C4F',
  lighGray: '#F2F4FA',
  darkBlue: '#1E3354',
  yellowLight: '#F9CF9F',
  green: '#46B41F',
};

export const FONTS = {
  bold: 'Inter-Bold',
  regular: 'Inter-Regular',
  light: 'Inter-Light',
  semiBold: 'Inter-SemiBold',
  medium: 'Inter-Regular',
};

export const statusbarHeight =
  StatusBar.currentHeight + heightPercentageToDP(2);
