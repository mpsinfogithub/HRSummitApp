import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {COLOR, FONTS, hp, wp} from '../../constants/GlobalTheme';
import RNBottomSheet from './RNBottomSheet';

const AvatarCard = ({data, type = 'leader'}) => {
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const ImageLink = {
    leader: 'Gallery',
    speaker: 'Speaker',
  };

  return (
    <TouchableOpacity
      onPress={() => setUserDetailsModal(!userDetailsModal)}
      style={{
        borderColor: COLOR.gray,
        padding: 10,
        width: wp(41),
        backgroundColor: COLOR.white,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 5,
      }}>
      <View style={{height: hp(20)}}>
        <Image
          source={{
            uri: `http://tcpindia.net/hrsummit/storage/uploads/${ImageLink[type]}/${data?.photo}`,
          }}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
      <View style={{paddingVertical: 5}}>
        <Text>{data?.name}</Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 12,
            marginTop: 3,
            color: COLOR.gray,
          }}>
          {data?.designation}
        </Text>
      </View>
      <RNBottomSheet
        title="Person Details"
        visible={userDetailsModal}
        setVisible={setUserDetailsModal}>
        <View style={{width: '90%', alignSelf: 'center', marginBottom: hp(4)}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: wp(20), height: wp(20), borderRadius: 10}}>
              <Image
                source={{
                  uri: `http://tcpindia.net/hrsummit/storage/uploads/${ImageLink[type]}/${data?.photo}`,
                }}
                style={{width: '100%', height: '100%', borderRadius: 10}}
              />
            </View>
            <View style={{paddingHorizontal: 15}}>
              <Text style={{fontFamily: FONTS.semiBold}}>{data.name}</Text>
              <Text style={{width: '90%', marginTop: 3}}>
                {data?.designation}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{fontFamily: FONTS.semiBold, marginVertical: 10}}>
              More about {data.name}
            </Text>
            <Text style={{fontFamily: FONTS.regular, lineHeight: 20}}>
              {data?.des}
            </Text>
          </View>
        </View>
      </RNBottomSheet>
    </TouchableOpacity>
  );
};

export default AvatarCard;
