import React, {useEffect, useState} from 'react';
import {Keyboard, Modal, Text, View} from 'react-native';
import {COLOR, FONTS, hp} from '../../constants/GlobalTheme';
import AntIcons from 'react-native-vector-icons/AntDesign';

const RNBottomSheet = ({
  setVisible,
  visible = false,
  title = 'Modal title',
  showHeader = true,
  children,
  customSheetStyle,
  customMainContainerStyle,
}) => {
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', e => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <Modal
      statusBarTranslucent={true}
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}>
      <View
        style={[
          {
            backgroundColor: 'rgba(12, 12, 12, 0.46)',
            flex: 1,
          },
          {...customMainContainerStyle},
        ]}>
        <View
          style={[
            {
              position: 'absolute',
              bottom: keyboardStatus === 'Keyboard Shown' ? keyboardHeight : 0,
              minHeight: hp(10),
              width: '100%',
              borderTopEndRadius: 40,
              borderTopLeftRadius: 40,
              backgroundColor: COLOR.lighGray,
            },
            {...customSheetStyle},
          ]}>
          {showHeader && (
            <View
              style={{
                paddingHorizontal: hp(3),
                paddingVertical: hp(2.5),
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  fontSize: 16,
                  textTransform: 'capitalize',
                }}>
                {title}
              </Text>
              <AntIcons
                size={20}
                name="closecircle"
                onPress={() => setVisible(!visible)}
              />
            </View>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default RNBottomSheet;
