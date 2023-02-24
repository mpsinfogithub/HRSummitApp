import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = {...state.user, ...action.payload};
    },
    logoutUser: () => {
      return initialState;
    },
  },
});

export const {setAuth, logoutUser} = authSlice.actions;

export default authSlice.reducer;
