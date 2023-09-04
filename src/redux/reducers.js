// reducers.js
import { SET_USER } from './actions';

const initialState = {
  user: null, // 초기 상태는 로그인되지 않은 상태로 설정합니다.
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

