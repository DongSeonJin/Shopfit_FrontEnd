// modules.js
import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import AuthReducer from './AuthReducer';

const rootReducer = combineReducers({
  userReducer,
  AuthReducer
  // ...다른 리듀서들 추가
});

export default rootReducer;
