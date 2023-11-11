import axios from 'axios';

// // 로컬 개발 환경 또는 프로덕션 빌드 환경 변수 사용
// const backendUrl = process.env.REACT_APP_BACKEND_URL || 'Shopfit-env-1.eba-byhfkrys.ap-northeast-2.elasticbeanstalk.com ';

// axios.interceptors.request.use(config => {
//   if (!config.url.startsWith('http')) {
//     config.url = backendUrl + config.url;
//   }
//   return config;
// });


// 로컬 개발 환경 또는 프로덕션 빌드 환경 변수 사용
const backendUrl = 'http://shopfit-env-1.eba-byhfkrys.ap-northeast-2.elasticbeanstalk.com/';

axios.interceptors.request.use(config => {
  if (!config.url.startsWith('/')) {
    // 외부 서비스나 프로덕션 백엔드 URL을 요청하는 경우
    config.url = backendUrl + config.url;
  }
  return config;
});