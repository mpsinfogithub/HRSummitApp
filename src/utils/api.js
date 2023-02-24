import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export const apiRequest = async ({url, body, method}) => {
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
    const res = await axios(url, {
      headers,
      method,
      data: body,
    });

    return res;
  } catch (err) {
    console.log(err?.message);
  }
};
