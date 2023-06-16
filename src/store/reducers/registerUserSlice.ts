import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import register from '../../api/registerApi';

interface RegisterUserState {
  isLoading: boolean;
  error: string | null;
}

const initialState: RegisterUserState = {
  isLoading: false,
  error: null,
};

export const registerUserSlice = createSlice({
  name: 'registerUser',
  initialState,
  reducers: {
    registerUserStart: state => {
      state.isLoading = true;
      state.error = null;
    },
    registerUserSuccess: state => {
      state.isLoading = false;
    },
    registerUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { registerUserStart, registerUserSuccess, registerUserFailure } =
  registerUserSlice.actions;

export const registerUser =
  ({
    login,
    email,
    password,
  }: {
    login: string;
    email: string;
    password: string;
  }) =>
    async (
      dispatch: (arg0: {
        payload: string | undefined;
        type:
        | 'registerUser/registerUserStart'
        | 'registerUser/registerUserSuccess'
        | 'registerUser/registerUserFailure';
      }) => void,
    ) => {
      dispatch(registerUserStart());

      try {
        await register({ login, email, password });
        dispatch(registerUserSuccess());
      } catch (err) {
        dispatch(registerUserFailure(err.message));
        throw err;
      }
    };

export default registerUserSlice.reducer;
