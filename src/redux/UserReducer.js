import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // 초기 상태는 로그인되지 않은 상태로 설정합니다.
  },
  reducers: {
    setUser: (state, action) => {
      // Immer 덕분에 state를 직접 변경해도 불변성이 유지됩니다.
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;