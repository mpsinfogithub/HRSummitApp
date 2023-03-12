import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCache} from '../redux/cacheSlice';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import {ToastMessage} from '../utils/toastMsg';

const useFetch = ({url, method, body}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {cache} = useSelector(state => state.cache);

  const getData = async () => {
    if (cache?.hasOwnProperty(url)) {
      setData(cache[url]);
      return;
    }
    let headers = {
      'Content-Type': 'application/json',
      withCredentials: true,
    };

    await EncryptedStorage.getItem('auth_token').then(data => {
      const token = JSON.parse(data)?.token;
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    });

    try {
      setLoading(true);
      const res = await axios(url, {
        headers,
        method,
        data: body,
      });

      if (res?.status !== 200) {
        setLoading(false);
        throw new Error(res?.data?.message);
      }

      setData(res?.data);
      dispatch(addCache({url: url, data: res?.data}));
      setLoading(false);
    } catch (err) {
      ToastMessage({
        type: 'error',
        des: err?.message,
      });
    }
  };

  useEffect(() => {
    if (data === null) {
      getData();
    }
  }, []);

  useEffect(() => {
    if (!cache[url]) {
      getData();
    }
  }, [cache[url]]);

  return {data, loading};
};

export default useFetch;
