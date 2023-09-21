import axios from "axios";
import store from '../../store/ReduxStore'
import { SET_TOKEN } from '../../redux/AuthReducer';
import { getCookieToken, setRefreshToken } from "../../store/Cookie";
import logout from './Logout';

const dispatch = store.dispatch;


/** CREATE CUSTOM AXIOS INSTANCE */
export const authApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// 리프레시 토큰 검증 및 액세스 토큰 갱신 함수
export async function refreshTokenApi() {
  try {
    const refreshToken = getCookieToken();
    // Request new tokens with refresh token
    const { data } = await axios.post(
      `/api/token`, // token refresh api
      {},
      { headers: { Authorization: `${refreshToken}`}
                 }
    );

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;

      dispatch(SET_TOKEN(newAccessToken));

      setRefreshToken(newRefreshToken); // refreshToken Rotation을 추가하므로, refreshToken도 함께 갱신

      axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

       return newAccessToken;
      

  } catch (error) {
    if (error.response && error.response.status === 401) {
      logout();
      alert(error.response.data.message);
  }
  }
};



// authApi의 axios 요청을 가로채서 먼저 실행되는 코드 
authApi.interceptors.request.use((config) => {
  const state = store.getState();

  const token = state.authToken.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; // config는 기존의 axios 요청. interceptor 코드가 끝나면 요청을 이어나가야 하기 때문에 리턴.



}, (error) => {
  return Promise.reject(error);
});


// axios요청후 응답을 가로채서 실행해줄 코드
//토큰을 함께보내는 privateApi에 interceptor를 적용합니다
authApi.interceptors.response.use(
  // 200번대 응답이 올때 처리
  (response) => {
    return response;
  },
  // 200번대 응답이 아닐 경우 처리
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    //토큰이 만료되었을 때
    if (status === 401) {
        const newAccessToken = await refreshTokenApi(); // 리프레시 토큰 검증 함수 api
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        // 응답interceptor 로직이 끝나면 이어받은 config 헤더에 토큰을 담아 원래의 요청을 이어간다.
        // authApi.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      return axios(config);
      
    }
    return Promise.reject(error);
  },
);



export const login = async ({ email, password }) => {
  const data = { email, password };
  const response = await axios.post('/login', data);
  return response.data;
}




/** SIGNUP API */
export const signUp = async ({ email, password, nickname, imageUrl, confirmPassword }) => {
  const data = { email, password, nickname, imageUrl, confirmPassword };
  const response = await axios.post(`/signup`, data);
  return response.data;
}