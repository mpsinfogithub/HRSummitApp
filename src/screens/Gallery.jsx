import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar, Loader} from '../components';
import {COLOR, hp, wp} from '../constants/GlobalTheme';
import ImageView from 'react-native-image-viewing';
import useFetch from '../hooks/useFetch';
import {LayoutScreen} from '.';

const Gallery = () => {
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
    <LayoutScreen
      loading={ImagesLoading}
      scrollable={false}
      headerBar={<HeaderBar headerTitle="Gallery" />}>
      <>
        <FlatList
          data={Images()}
          numColumns={3}
          contentContainerStyle={{width: '90%', alignSelf: 'center'}}
          columnWrapperStyle={{justifyContent: 'flex-start', marginBottom: 15}}
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
    </LayoutScreen>
  );
};

export default Gallery;
