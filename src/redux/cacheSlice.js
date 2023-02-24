import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cache: {},
};

export const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    addCache: (state, action) => {
      const {url, data} = action.payload;
      state.cache[url] = data;
    },
    clearCache: (state, action) => {
      const {url} = action.payload;
      delete state.cache[url];
    },
    resetCache: () => {
      return initialState;
    },
  },
});

export const {addCache, clearCache, resetCache} = cacheSlice.actions;

export default cacheSlice.reducer;
