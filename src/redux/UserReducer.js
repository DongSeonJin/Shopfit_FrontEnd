import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  refreshToken: '',
  authority: '',
  userId: '0',
  email: '',
  nickname: '',
  imageUrl:'',
};

const userSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    SET_USER: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.authority = action.payload.authority;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.imageUrl = action.payload.imageUrl;
    },
    LOGOUT_USER:(state) =>{
        Object.assign(state,initialState); // 로그아웃시 모든 정보 초기화
    },

    UPDATE_IMAGE_URL: (state,action) => { // imageUrl만 업데이트하는 액션 추가
      state.imageUrl=action.payload; 
  }
    
   },
});

export const { SET_USER,LOGOUT_USER,UPDATE_IMAGE_URL } = userSlice.actions;

export default userSlice.reducer;