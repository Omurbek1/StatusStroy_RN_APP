import {loginSuccess, logout} from '../reducers/authSlice';
import {login} from '../../api/authapi.ts';

// Async action for login
export const loginUser = (identifier, password) => async dispatch => {
  try {
    const token = await login(identifier, password);
    dispatch(loginSuccess(token));
  } catch (error) {
    // Handle login error
  }
};

// Action for logout
export const logoutUser = () => dispatch => {
  dispatch(logout());
};
