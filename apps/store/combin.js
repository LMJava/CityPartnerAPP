
import User from './user'; // 用户信息 
import Login from './login'; // 登录信息 

import { connect as reduxConnect } from 'react-redux';

export const connect = reduxConnect;

export const reducers = {
  User: User.reducer,
  Login: Login.reducer,
};
export const actions = {
  User: { ...User.actions },
  Login: { ...Login.actions },
};

