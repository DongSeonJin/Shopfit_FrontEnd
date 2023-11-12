import axios from 'axios';

const backendUrl = 'http://shopfit-env-1.eba-byhfkrys.ap-northeast-2.elasticbeanstalk.com';

axios.interceptors.request.use(config => {
  if (!config.url.startsWith('/')) {
    // 외부 서비스나 프로덕션 백엔드 URL을 요청하는 경우
    config.url = backendUrl + config.url;
  }
  return config;
});