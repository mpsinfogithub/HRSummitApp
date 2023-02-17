import {FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBar} from '../components';
import AvatarCard from '../components/shared/AvatarCard';
import {hp} from '../constants/GlobalTheme';

const Speakers = () => {
  const Speakers = [
    {
      name: 'John Doe',
      image:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Icum!',
      role: 'Govt of India',
      details: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium cupiditate rem similique delectus commodi unde culpa, quos facilis quod explicabo quis cum eveniet assumenda nulla quae aliquam. Nostrum, rerum autem.`,
    },
    {
      name: 'John Doe',
      image:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Icum!`,
      role: 'Govt of India',
      details: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium cupiditate rem similique delectus commodi unde culpa, quos facilis quod explicabo quis cum eveniet assumenda nulla quae aliquam. Nostrum, rerum autem.`,
    },
    {
      name: 'John Doe',
      image:
        'https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Icum!`,
      role: 'Govt of India',
      details: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium cupiditate rem similique delectus commodi unde culpa, quos facilis quod explicabo quis cum eveniet assumenda nulla quae aliquam. Nostrum, rerum autem.`,
    },
    {
      name: 'John Doe',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Icum!`,
      role: 'Govt of India',
      details: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium cupiditate rem similique delectus commodi unde culpa, quos facilis quod explicabo quis cum eveniet assumenda nulla quae aliquam. Nostrum, rerum autem.`,
    },
  ];

  return (
    <SafeAreaView>
      <HeaderBar headerTitle="Speakers" />
      <FlatList
        contentContainerStyle={{
          width: '85%',
          alignSelf: 'center',
          marginTop: hp(1),
        }}
        columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 20}}
        data={Speakers}
        numColumns={2}
        renderItem={({item}) => <AvatarCard data={item} />}
      />
    </SafeAreaView>
  );
};

export default Speakers;
