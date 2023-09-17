// modules.js
import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import AuthReducer from './AuthReducer';

const rootReducer = combineReducers({
  UserReducer,
  AuthReducer
  // ...다른 리듀서들 추가
});

export default rootReducer;
