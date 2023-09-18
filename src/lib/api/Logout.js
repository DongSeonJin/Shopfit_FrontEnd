import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCookieToken, removeCookieToken } from '../../store/Cookie';
import { DELETE_TOKEN } from '../../redux/AuthReducer';



const Logout = () => {
    // store에 저장된 Access Token 정보를 받아 온다
    const accessToken = useSelector(state => state.authToken.accessToken);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Cookie에 저장된 Refresh Token 정보를 받아 온다
    const refreshToken = getCookieToken();

    const logout = async () => {
        try {
            // 백으로부터 받은 응답
            const response = await axios.post('/logout', 
                { refreshToken }, 
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
                navigate('/');
            }
        } catch (error) {
            console.error(error.response.data.message);
        }
    }

    return logout;
};

export default Logout;