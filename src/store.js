import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk'

import rootReducer from './reducers/index';

const defaultState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(
    applyMiddleware(thunk))
);

export default store;