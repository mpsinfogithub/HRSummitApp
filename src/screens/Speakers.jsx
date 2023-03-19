import {FlatList} from 'react-native';
import React from 'react';
import {HeaderBar} from '../components';
import AvatarCard from '../components/shared/AvatarCard';
import {LayoutScreen} from '.';
import useFetch from '../hooks/useFetch';

const Speakers = () => {
  const {data: speakersData, loading: speakerLoading} = useFetch({
    url: '/all-speaker',
    method: 'get',
  });

  return (
    <LayoutScreen
      headerBar={<HeaderBar headerTitle="Speakers" />}
      scrollable={false}
      data={speakersData?.all_speaker}
      loading={speakerLoading}>
      <>
        <FlatList
          contentContainerStyle={{
            width: '85%',
            alignSelf: 'center',
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
          data={speakersData?.all_speaker}
          numColumns={2}
          renderItem={({item}) => <AvatarCard type="speaker" data={item} />}
        />
      </>
    </LayoutScreen>
  );
};

export default Speakers;
