import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.user = action.payload;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
