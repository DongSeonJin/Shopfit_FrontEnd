// modules.js
import { combineReducers } from 'redux';
import authUser from './UserReducer';
import authToken from './AuthReducer';

const rootReducer = combineReducers({
  authUser,
  authToken
  // ...다른 리듀서들 추가
});

export default rootReducer;
