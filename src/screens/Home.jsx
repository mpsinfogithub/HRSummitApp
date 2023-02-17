import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
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
import FeatherIcon from 'react-native-vector-icons/Feather';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();

  const caresoleImages = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80',
  ];

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
      icon: <AgendaIcon />,
      routeName: 'Agenda',
    },
    {
      id: 2,
      name: 'About \nGoa',
      icon: <PlaceIcon />,
      routeName: 'Place',
    },
    {
      id: 3,
      name: 'Happy \nto help',
      icon: <HelpingHandIcon />,
      routeName: 'Help',
    },
    {
      id: 4,
      name: 'e-invites',
      icon: <EinvitesIcon />,
      routeName: 'Einvites',
    },
    {
      id: 5,
      name: 'Speakers',
      icon: <SpeakerIcon />,
      routeName: 'Speakers',
    },
    {
      id: 6,
      name: 'Leaders',
      icon: <LeaderIcon />,
      routeName: 'Leaders',
    },
    {
      id: 7,
      name: 'Interaction',
      icon: <InteractionIcon />,
      routeName: 'Interaction',
    },
    {
      id: 8,
      name: 'Delegates',
      icon: <DelegatesIcon />,
      routeName: 'Delegates',
    },
    {
      id: 9,
      name: 'Accommodation',
      icon: <AccomodationIcon />,
      routeName: 'Accomodation',
    },
    {
      id: 10,
      name: 'Minutes of 59th HR summit',
      icon: <HRSummitMinutesIcon />,
      routeName: 'Minutes HR Summit',
    },
    {
      id: 11,
      name: 'Gallery',
      icon: <GalleryIcon />,
      routeName: 'Gallery',
    },
    {
      id: 12,
      name: 'Activities',
      icon: <ActivitiesIcon />,
      routeName: 'Activities',
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
          <View style={{width: 40, height: 40}}>
            <Image
              resizeMode="contain"
              source={require('../../assets/Images/Logo.png')}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View style={{marginLeft: hp(1)}}>
            <Text style={{fontFamily: FONTS.bold}}>Hey Animesh</Text>
            <Text style={{fontFamily: FONTS.regular, fontSize: 12}}>
              TCP co
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
        </TouchableOpacity>
      </View>

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
          {caresoleImages.map((img, index) => (
            <ImageBackground
              key={index}
              imageStyle={{borderRadius: 10}}
              source={{uri: img}}
              resizeMode="cover"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                height: hp(18),
                width: wp(85),
              }}
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
          {caresoleImages.map((val, index) => (
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
          justifyContent: 'space-between',
        }}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.routeName)}
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
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
