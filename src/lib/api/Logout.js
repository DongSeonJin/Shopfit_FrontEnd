import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { DELETE_TOKEN } from '../../redux/AuthReducer';
import { getCookieToken, removeCookieToken } from '../../store/Cookie';
import { LOGOUT_USER } from '../../redux/UserReducer';


const logout = () => async (dispatch, getState) => {
        // store에 저장된 Access Token 정보를 받아 온다
        const accessToken = getState().authToken.accessToken;
    
        // Cookie에 저장된 Refresh Token 정보를 받아 온다
        const refreshToken = getCookieToken();

        try {
            // 백으로부터 받은 응답
            const response = await axios.post('/logout', 
                 refreshToken, 
                {
                    headers: {
                        Authorization: `${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                // store에 저장된 Access Token 정보를 삭제
                dispatch(DELETE_TOKEN());
                // Cookie에 저장된 Refresh Token 정보를 삭제
                removeCookieToken();
                // store에 저장된 user 데이터 초기화
                dispatch(LOGOUT_USER());

                alert('로그아웃 되었습니다.');
                

            }
        } catch (error) {
            if (error.response) {
                console.error(error.response.data.message);
            } else {
                console.error(error);
            }
        }

    
};

export default logout;

