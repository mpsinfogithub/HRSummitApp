import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {HeaderBar, RNButton} from '../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {FONTS, COLOR, hp} from '../constants/GlobalTheme';
import moment from 'moment';
import {
  clearNotificationCount,
  clearNotifications,
} from '../redux/notificationsSlice';

const Notifications = () => {
  const notify = useSelector(state => state.notify.notifcations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearNotificationCount());
  }, []);

  return (
    <SafeAreaView>
      <HeaderBar headerTitle="Notifications" />
      <ScrollView style={{width: '85%', alignSelf: 'center', marginTop: hp(2)}}>
        {notify?.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.5}
            key={index}
            style={{
              padding: 15,
              borderWidth: 1,
              borderColor: '#E7E1E1',
              borderRadius: 10,
              marginBottom: hp(3),
            }}>
            <Text style={{marginBottom: 3, fontFamily: FONTS.semiBold}}>
              {item?.notification?.title}
            </Text>
            <Text style={{fontFamily: FONTS.regular}}>
              {item?.notification?.body}
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 12,
                position: 'absolute',
                right: 15,
                top: 15,
                color: COLOR.gray,
              }}>
              {moment(item?.sentTime).format('lll')}
            </Text>
          </TouchableOpacity>
        ))}

        {notify.length !== 0 && (
          <RNButton
            title={'Clear All'}
            onClick={() => dispatch(clearNotifications())}
            cutomTextStyles={{fontSize: 14}}
            customContainerStyles={{width: '30%', alignSelf: 'flex-start'}}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
