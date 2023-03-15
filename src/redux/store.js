import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import EncryptedStorage from 'react-native-encrypted-storage';
import authReducer from '../redux/authSlice';
import cacheReducer from '../redux/cacheSlice';
import notificationReducer from './notificationsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cache: cacheReducer,
  notify: notificationReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: EncryptedStorage,
  whitelist: ['auth', 'notify'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
export default store;
