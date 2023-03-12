import Toast from 'react-native-toast-message';

export const ToastMessage = ({type = 'success', title, des}) => {
  Toast.show({
    type: type,
    text1: title || type,
    text2: des,
  });
};
