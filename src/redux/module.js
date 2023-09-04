// modules.js
import { combineReducers } from 'redux';
import userReducer from './reducers';

const rootReducer = combineReducers({
  login: userReducer,
  // ...다른 리듀서들 추가
});

export default rootReducer;
