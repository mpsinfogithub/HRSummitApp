import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export const apiRequest = async ({url, body, method, header = {}}) => {
  let headers = {
    'Content-Type': 'application/json',
    withCredentials: true,
    ...header,
  };

  await EncryptedStorage.getItem('auth_token').then(data => {
    const token = data !== undefined && JSON.parse(data)?.token;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  });

  try {
    const res = await axios({
      url: url,
      headers,
      method,
      data: body,
    });

    return res;
  } catch (err) {
    console.log(err?.message);
  }
};
