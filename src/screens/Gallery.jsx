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
import {HeaderBar} from '../components';
import {COLOR, hp, wp} from '../constants/GlobalTheme';
import ImageView from 'react-native-image-viewing';

const Gallery = () => {
  const [visible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const Images = [
    'https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80',
    'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    'https://images.unsplash.com/photo-1562790351-d273a961e0e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
    'https://images.unsplash.com/photo-1521783988139-89397d761dce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80',
  ];

  const ImagesArr = () => {
    let temp = [];
    Images.map(image => {
      temp.push({uri: image});
    });
    return temp;
  };

  return (
    <SafeAreaView>
      <HeaderBar headerTitle="Gallery" />
      <FlatList
        data={Images}
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
            style={{position: 'absolute', bottom: hp(3), alignSelf: 'center'}}>
            <Text style={{color: COLOR.primary}}>
              {imageIndex + 1}/{Images.length}
            </Text>
          </View>
        )}
        onRequestClose={() => setIsVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Gallery;
