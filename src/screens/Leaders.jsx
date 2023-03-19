import {FlatList} from 'react-native';
import React from 'react';
import {HeaderBar} from '../components';
import AvatarCard from '../components/shared/AvatarCard';
import {LayoutScreen} from '.';
import useFetch from '../hooks/useFetch';

const Leaders = () => {
  const {data: leadersData, loading: leadersLoading} = useFetch({
    url: '/all-leader',
    method: 'get',
  });

  return (
    <LayoutScreen
      headerBar={<HeaderBar headerTitle="Leaders" />}
      scrollable={false}
      data={leadersData?.all_leader}
      loading={leadersLoading}>
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
          data={leadersData?.all_leader}
          numColumns={2}
          renderItem={({item}) => <AvatarCard type="leader" data={item} />}
        />
      </>
    </LayoutScreen>
  );
};

export default Leaders;
