import {View, Text, Platform, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar, RNButton, RNInput} from '../components';
import {COLOR, FONTS, hp} from '../constants/GlobalTheme';
import {apiRequest} from '../utils/api';
import {useDispatch, useSelector} from 'react-redux';
import useFetch from '../hooks/useFetch';
import moment from 'moment';
import {clearCache} from '../redux/cacheSlice';
import FastImage from 'react-native-fast-image';
import {ToastMessage} from '../utils/toastMsg';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(state => state.auth);
  const {data: feedbackData, loading: feedbackLoading} = useFetch({
    url: '/all-feedback',
    method: 'get',
  });

  const dispatch = useDispatch();

  const sentFeedback = async values => {
    try {
      setLoading(true);
      const res = await apiRequest({
        url: '/add-edit-feedback-process',
        method: 'post',
        body: {user_id: user?.user_id, message: feedback},
      });

      if (res?.status !== 200) {
        setLoading(false);
        ToastMessage({
          type: 'error',
          des: res?.data?.message,
        });
        return;
      }

      ToastMessage({
        type: 'success',
        des: 'Thanks for your Feedback',
      });
      setLoading(false);
      dispatch(clearCache('/all-feedback'));
      setFeedback('');
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <HeaderBar headerTitle="Feedback" />
      <View style={{width: '85%', alignSelf: 'center', marginVertical: 10}}>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 16,
            marginBottom: 8,
          }}>
          Share your thoughts about the Summit
        </Text>
        <RNInput
          textAlignVertical={Platform.OS === 'ios' ? 'center' : 'top'}
          onChangeText={text => setFeedback(text)}
          value={feedback}
          customContainerStyles={{
            marginTop: Platform.OS === 'ios' ? 10 : hp(1.5),
            height: Platform.OS === 'ios' ? hp(8) : hp(20),
          }}
          placeholder={'Enter your thoughts'}
          numberOfLines={10}
          multiline={true}
        />
        <RNButton title={'Submit'} onClick={sentFeedback} loading={loading} />
      </View>
      <ScrollView
        style={{width: '85%', alignSelf: 'center', marginVertical: 10}}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: FONTS.semiBold,
            marginBottom: hp(2),
          }}>
          {feedbackLoading ? 'Loading others Feedback ...' : 'Others Feedbacks'}
        </Text>
        {feedbackData?.feedback?.map((feedback, index) => (
          <View
            key={index}
            style={{flexDirection: 'row', gap: 10, marginBottom: hp(1.5)}}>
            <View style={{width: 40, height: 40, borderRadius: 100}}>
              <FastImage
                style={{height: '100%', width: '100%', borderRadius: 100}}
                source={
                  feedback?.user?.photo !== null
                    ? {
                        uri: `http://tcpindia.net/hrsummit/storage/uploads/Profile/${feedback?.user?.photo}`,
                        priority: FastImage.priority.normal,
                        cache: 'immutable',
                      }
                    : require('../../assets/Images/noProfile.png')
                }
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View>
              <Text style={{fontFamily: FONTS.regular, fontSize: 12}}>
                {feedback?.user?.name} -{' '}
                <Text style={{fontSize: 10, color: COLOR.gray}}>
                  {moment(feedback?.updated_at).format('MMMM Do YY, h:mm A')}
                </Text>
              </Text>
              <Text>{feedback?.message}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feedback;
