// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isUnauthorized: false,
  },
  reducers: {
    setUnauthorized(state, action) {
      state.isUnauthorized = action.payload;
    },
    resetUnauthorized(state) {
      state.isUnauthorized = false;
    },
    // boshqa reducers...
  },
});

export const { setUnauthorized, resetUnauthorized } = authSlice.actions;
export default authSlice.reducer;
