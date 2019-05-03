
import User from './user'; // 用户信息 

import { connect as reduxConnect } from 'react-redux';

export const connect = reduxConnect;

export const reducers = {
  User: User.reducer,
};
export const actions = {
  User: { ...User.actions },
};

