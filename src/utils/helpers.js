import {Linking, Platform} from 'react-native';

export const openDialer = phoneNumber => {
  if (Platform.OS === 'android') {
    Linking.openURL(`tel:${phoneNumber}`);
  } else {
    Linking.openURL(`telprompt:${phoneNumber}`);
  }
};
