import axios from "axios";
import store from '../../store/ReduxStore'
import { SET_TOKEN } from '../../redux/AuthReducer';
import { getCookieToken, setRefreshToken } from "../../store/Cookie";

const dispatch = store.dispatch;


/** CREATE CUSTOM AXIOS INSTANCE */
export const authApi = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// authApi의 axios 요청을 가로채서 실행되는 코드 
authApi.interceptors.request.use((config) => {
    const state = store.getState();
    
    const token = state.AuthReducer.accessToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;


    
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
      
      //토큰이 만료되을 때
      if (status === 401) {
        if (error.response.data.code === 'TOKEN_001') {
          const originRequest = config;

          const refreshToken = getCookieToken();
          //리프레시 토큰 api
          const { data } = await axios.post(
            `/api/token`, // token refresh api
            {},
            { headers: { authorization: `Bearer ${refreshToken}` } }
          );
          //리프레시 토큰 요청이 성공할 때
          if (data.status === 200) {
            const newAccessToken = data.data.accessToken;
            const newRefreshToken = data.data.refreshToken;
            dispatch(SET_TOKEN(data.accessToken));
            setRefreshToken(newRefreshToken); // refreshToken Rotation을 추가하므로, refreshToken도 함께 갱신
            axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            //진행중이던 요청 이어서하기
            originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originRequest);
          //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
          } else {
            alert(error.response.data.message);
            window.location.replace('/login');
          }
        }
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