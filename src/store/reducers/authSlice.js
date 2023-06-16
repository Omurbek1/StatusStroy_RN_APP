import {createSlice} from '@reduxjs/toolkit';

// Initial state
const initialState = {
  isAuthenticated: false,
  token: null,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

// Action creators
export const {loginSuccess, logout} = authSlice.actions;

export default authSlice.reducer;
