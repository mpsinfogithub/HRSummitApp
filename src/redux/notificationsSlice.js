import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notifcations: [],
  count: 0,
};

export const notificationSlice = createSlice({
  name: 'notifications reducer',
  initialState,
  reducers: {
    addNotifications: (state, action) => {
      const {data, notification, sentTime} = action.payload;
      state.notifcations = [
        ...state.notifcations,
        {
          notification,
          sentTime,
          data,
        },
      ];
      state.count = state.count + 1;
    },
    clearNotificationCount: state => {
      state.count = 0;
    },
    clearNotifications: () => {
      return initialState;
    },
  },
});

export const {addNotifications, clearNotifications, clearNotificationCount} =
  notificationSlice.actions;

export default notificationSlice.reducer;
