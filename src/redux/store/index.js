// redux/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';  // Import redux-thunk
import userReducer from '../reducer';

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)  // Apply redux-thunk middleware
);

export default store;
