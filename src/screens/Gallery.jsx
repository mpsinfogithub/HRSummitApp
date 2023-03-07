import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar, Loader} from '../components';
import {COLOR, FONTS, hp, wp} from '../constants/GlobalTheme';
import ImageView from 'react-native-image-viewing';
import useFetch from '../hooks/useFetch';
import Video from 'react-native-video';
import RNBottomSheet from '../components/shared/RNBottomSheet';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const ImagesSection = () => {
  const [visible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const {data: GalleryImagesData, loading: ImagesLoading} = useFetch({
    url: '/all-gallery',
    method: 'get',
  });

  const ImagesArr = () => {
    let temp = [];
    GalleryImagesData?.all_gallery?.map(val => {
      temp.push({
        uri: `http://tcpindia.net/hrsummit/storage/uploads/Gallery/${val?.photo}`,
      });
    });
    return temp;
  };

  const Images = () => {
    let temp = [];
    GalleryImagesData?.all_gallery?.map(val => {
      temp.push(
        `http://tcpindia.net/hrsummit/storage/uploads/Gallery/${val?.photo}`,
      );
    });
    return temp;
  };

  if (ImagesLoading) {
    return <Loader />;
  }

  return (
    <>
      <FlatList
        data={Images()}
        numColumns={3}
        contentContainerStyle={{width: '90%', alignSelf: 'center'}}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          marginBottom: 15,
        }}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              setIsVisible(!visible);
              setImageIndex(index);
            }}
            key={index}
            style={{
              height: wp(25),
              marginLeft: 15,
              width: wp(25),
              borderRadius: 10,
            }}>
            <Image
              source={{uri: item}}
              style={{width: '100%', height: '100%', borderRadius: 10}}
            />
          </TouchableOpacity>
        )}
      />
      <ImageView
        images={ImagesArr()}
        imageIndex={imageIndex}
        visible={visible}
        FooterComponent={({imageIndex}) => (
          <View
            style={{
              position: 'absolute',
              bottom: hp(3),
              alignSelf: 'center',
            }}>
            <Text style={{color: COLOR.primary}}>
              {imageIndex + 1}/{ImagesArr()?.length}
            </Text>
          </View>
        )}
        onRequestClose={() => setIsVisible(false)}
      />
    </>
  );
};

const VideosScreeen = () => {
  const [videoBottomSheet, setVideoBottomSheet] = useState(false);

  const {data: videoData, loading: videosLoading} = useFetch({
    url: '/all-video',
    method: 'get',
  });

  if (videosLoading) {
    return <Loader />;
  }

  return (
    <>
      <FlatList
        data={videoData?.all_video}
        numColumns={3}
        contentContainerStyle={{width: '90%', alignSelf: 'center'}}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          marginBottom: 15,
          minWidth: '100%',
        }}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              setVideoBottomSheet(!videoBottomSheet);
            }}
            key={index}
            style={{
              height: wp(25),
              marginLeft: 15,
              width: wp(25),
              borderRadius: 10,
            }}>
            <Image
              source={{
                uri: `https://static.vecteezy.com/system/resources/thumbnails/017/691/639/original/play-button-scene-icon-of-nice-animated-for-your-music-packs-easy-to-use-with-transparent-background-hd-motion-graphic-animation-free-free-video.jpg`,
              }}
              resizeMode="center"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                borderWidth: 1,
              }}
            />
          </TouchableOpacity>
        )}
      />
      {videoBottomSheet && (
        <>
          <AntDesignIcon
            size={24}
            onPress={() => setVideoBottomSheet(!videoBottomSheet)}
            name="closecircle"
            style={{
              position: 'absolute',
              zIndex: 3,
              elevation: 3,
              top: hp(3),
              right: hp(3),
            }}
          />

          <Video
            source={{
              uri: `http://tcpindia.net/hrsummit/storage/uploads/Gallery/${videoData?.all_video?.[0]?.photo}`,
            }}
            controls={true}
            posterResizeMode="center"
            resizeMode="contain"
            ref={ref => {
              this.player = ref;
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: '#f7f7f7',
            }}
          />
        </>
      )}
    </>
  );
};

const Gallery = () => {
  const MODES = ['Images', 'Videos'];
  const [currentMode, setCurrentMode] = useState(MODES[0]);

  const SECTIONS = {
    Images: <ImagesSection />,
    Videos: <VideosScreeen />,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderBar headerTitle="Gallery" />
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 15,
            marginBottom: hp(2.5),
          }}>
          {MODES.map((item, index) => (
            <Text
              onPress={() => setCurrentMode(item)}
              key={index}
              style={{
                fontFamily: FONTS.regular,
                backgroundColor:
                  item === currentMode ? COLOR.primary : 'transparent',
                color: item === currentMode ? COLOR.white : COLOR.darkBlue,
                borderWidth: item !== currentMode ? 1 : 0,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}>
              {item}
            </Text>
          ))}
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {SECTIONS[currentMode]}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Gallery;
