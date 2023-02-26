import {View, Text} from 'react-native';
import React from 'react';
import {COLOR, FONTS} from '../../constants/GlobalTheme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import {tConvert} from '../../utils/helpers';

const TimelineCard = ({data}) => {
  console.log(data);
  return (
    <View>
      {data.map((data, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginBottom: 15,
          }}>
          <View style={{marginTop: 3, marginRight: 8}}>
            <View
              style={{
                width: 20,
                height: 20,
                borderWidth: 3,
                borderRadius: 50,
                borderColor: COLOR.primary,
                backgroundColor: data?.done ? COLOR.primary : COLOR.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FeatherIcon name="check" color={COLOR.white} />
            </View>
          </View>
          <View>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: 12,
                color: COLOR.gray,
              }}>
              {tConvert(data?.begin)} - {tConvert(data?.end)}
            </Text>
            <Text
              style={{
                fontFamily: FONTS.medium,
                fontSize: 14,
                lineHeight: 20,
                marginTop: 3,
              }}>
              {data.title}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TimelineCard;
