import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR, FONTS, hp, wp} from '../constants/GlobalTheme';
import {
  AccomodationIcon,
  AgendaIcon,
  DelegatesIcon,
  EinvitesIcon,
  GalleryIcon,
  HRSummitMinutesIcon,
  HelpingHandIcon,
  InteractionIcon,
  LeaderIcon,
  PlaceIcon,
  SpeakerIcon,
  ActivitiesIcon,
} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import useFetch from '../hooks/useFetch';
import {Loader} from '../components';
import FastImage from 'react-native-fast-image';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const {user} = useSelector(state => state.auth);
  const navigation = useNavigation();
  const {data: caresoleData, loading: caresoleLoading} = useFetch({
    url: '/all-carousel',
    method: 'get',
  });
  const notify = useSelector(state => state.notify);

  const {data: HomeData, loading: homeLoading} = useFetch({
    url: '/home',
    method: 'get',
  });

  const caresoleImages = () => {
    let data = [];
    caresoleData?.all_carousel?.map(caresole => {
      data.push(
        `http://tcpindia.net/hrsummit/storage/uploads/Gallery/${caresole?.photo}`,
      );
    });
    return data;
  };

  const getCurrentPage = e => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentPage(pageNum);
  };

  const Screens = [
    {
      id: 1,
      name: 'Agenda',
      data: {title: HomeData?.home?.agenda_title},
      icon: <AgendaIcon />,
      routeName: 'Agenda',
    },
    {
      id: 2,
      name: `About \n${HomeData?.home?.place_name}`,
      data: {placeName: HomeData?.home?.place_name},
      icon: <PlaceIcon />,
      routeName: 'Place',
    },
    {
      id: 4,
      name: 'e-invites',
      data: {},
      icon: <EinvitesIcon />,
      routeName: 'Einvites',
    },
    {
      id: 9,
      name: 'Stay',
      data: {},
      icon: <AccomodationIcon />,
      routeName: 'Accomodation',
    },
    {
      id: 5,
      name: 'Speakers',
      data: {},
      icon: <SpeakerIcon />,
      routeName: 'Speakers',
    },
    {
      id: 6,
      name: 'Leaders',
      data: {},
      icon: <LeaderIcon />,
      routeName: 'Leaders',
    },
    {
      id: 8,
      name: 'Delegates',
      data: {},
      icon: <DelegatesIcon />,
      routeName: 'Delegates',
    },
    {
      id: 7,
      name: 'Feedback/Query',
      data: {},
      icon: <InteractionIcon />,
      routeName: 'Feedback',
    },
    {
      id: 11,
      name: 'Gallery',
      data: {},
      icon: <GalleryIcon />,
      routeName: 'Gallery',
    },
    {
      id: 12,
      name: 'Activities',
      data: {},
      icon: <ActivitiesIcon />,
      routeName: 'Activities',
    },
    {
      id: 3,
      name: 'Happy \nto help',
      data: {},
      icon: <HelpingHandIcon />,
      routeName: 'Help',
    },
    {
      id: 10,
      name: `Minutes of last Meeting`,
      data: {summitNo: HomeData?.home?.no_of_hr_summit},
      status: HomeData?.home?.minute_status === '1' ? true : false,
      icon: <HRSummitMinutesIcon />,
      routeName: 'Minutes HR Summit',
    },
  ];

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLOR.lighGray,
        flex: 1,
        width: '85%',
        alignSelf: 'center',
      }}>
      {/* headerbar  */}
      <View
        style={{
          marginVertical: hp(2),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 40, height: 40, marginRight: 5}}>
            <FastImage
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'white',
                borderRadius: 100,
              }}
              source={{
                uri: `http://tcpindia.net/hrsummit/storage/uploads/Gallery/${HomeData?.home?.app_logo}`,
                priority: FastImage.priority.normal,
                cache: 'immutable',
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={{marginLeft: hp(1)}}>
            <Text style={{fontFamily: FONTS.bold}}>
              Hey Welcome {user?.name?.split(' ')[0]}
            </Text>
            <Text style={{fontFamily: FONTS.regular, fontSize: 12}}>
              {`${
                HomeData?.home?.no_of_hr_summit === undefined
                  ? ''
                  : HomeData?.home?.no_of_hr_summit
              }`}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
          style={{
            borderWidth: 1,
            width: 35,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: COLOR.white,
          }}>
          <FeatherIcon name="bell" size={18} />
          {notify.count > 0 && (
            <View
              style={{
                position: 'absolute',
                top: 22,
                left: 22,
                backgroundColor: COLOR.primary,
                height: wp(5.5),
                width: wp(5.5),
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 12,
                borderRadius: 50,
              }}>
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  color: COLOR.white,
                  fontSize: 12,
                }}>
                {notify?.count}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {caresoleLoading && homeLoading && HomeData?.home?.minute_status ? (
        <Loader />
      ) : (
        <View>
          {/* caresole  */}
          <View style={{marginVertical: 12}}>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              overScrollMode="never"
              onMomentumScrollEnd={getCurrentPage}
              showsHorizontalScrollIndicator={false}
              ref={ref => {
                horizontalListRef = ref;
              }}>
              {caresoleImages()?.map((img, index) => (
                <FastImage
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                    height: hp(18),
                    width: wp(85),
                  }}
                  key={index}
                  source={{
                    uri: img,
                    priority: FastImage.priority.high,
                    cache: 'immutable',
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              ))}
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                alignItems: 'center',
                bottom: 0,
                width: wp(85),
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              {caresoleImages().map((val, index) => (
                <View
                  key={index}
                  style={{
                    width: currentPage === index ? 9 : 6,
                    height: currentPage === index ? 9 : 6,
                    backgroundColor: COLOR.white,
                    borderRadius: 10,
                    marginRight: 6,
                  }}></View>
              ))}
            </View>
          </View>

          {/* app tiles  */}
          <FlatList
            data={Screens}
            numColumns={4}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              alignSelf: 'center',
              width: '100%',
              marginVertical: hp(2),
            }}
            columnWrapperStyle={{
              justifyContent: 'flex-start',
              gap: wp(5.6),
            }}
            renderItem={({item, index}) => {
              if (item?.status === false) {
                return '';
              }

              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(item.routeName, {...item?.data})
                  }
                  style={{width: wp(17), height: wp(30)}}>
                  <View
                    key={index}
                    style={{
                      backgroundColor: COLOR.primary,
                      width: '100%',
                      height: wp(17),
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {item.icon}
                  </View>
                  <Text
                    style={{
                      fontFamily: FONTS.medium,
                      fontSize: 12,
                      textAlign: 'center',
                      marginTop: 5,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
