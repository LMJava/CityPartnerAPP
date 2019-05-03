import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { actions as comActions, reducers } from './combin';

export default (initialState = {}) => {
  return createStore(
    combineReducers(reducers),
    initialState,
    applyMiddleware(thunk)
  );
};

export const actions = comActions;
