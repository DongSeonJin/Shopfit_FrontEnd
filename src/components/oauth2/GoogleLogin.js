import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { setRefreshToken } from "../../store/Cookie";
import { SET_USER } from "../../redux/UserReducer";
import { SET_TOKEN } from "../../redux/AuthReducer";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router";

const GoogleLoginButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        
        <>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(jwtDecode(credentialResponse.credential));

                    

                    // Google ID 토큰을 백엔드 서버로 전송
                    axios.post('/login/google', credentialResponse.credential)
                        .then(response => {
                            console.log(response);
                            dispatch(SET_USER(response.data)); // 로그인 성공 시 사용자 정보 업데이트
                            // 쿠키에 Refresh Token, store에 Access Token 저장
                            setRefreshToken(response.data.refreshToken);
                            dispatch(SET_TOKEN(response.data.accessToken));
                            
                            navigate('/');
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }}
                
                useOneTap="true"
                text="signin_with"
                width={360}
                shape="circle"
                logo_alignment="center"
                
                
                
                onFailure={(err) => {
                    console.log(err);
                    alert('로그인에 실패하였습니다.');
                }}
            />
        </>
    );
};

export default GoogleLoginButton
