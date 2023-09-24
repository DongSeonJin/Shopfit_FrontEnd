# 운영체제나 해당 프로젝트를 돌릴 수 있는 기본적인 언어, 프레임워크 이미지 세팅
FROM node


# /app 기준으로 RUN에 작성한 코드가 돌아가게 하고 싶다면 컨테이너측 작업폴더를 추가지정할 수 있음
WORKDIR /app

# docker run -p 8000:80 node // 내 로컬 환경에서 8000포트로 접속하면 컨테이너의 80번포트로 연결하겠다 (왼쪽이 로컬, 오른쪽이 컨테이너)
# 내 커스텀 코드를 오피셜 이미지에 복제해주는 행위
# 왼쪽 .은 Dockerfile의 경로에 있는 모든 파일이고 
# 오른쪽 .은 베이스 이미지 내부의 기본 경로를 의미 -> 베이스 이미지에 /app 경로에 폴더 만들고 복사
COPY . ./


# 코드를 넘겼으면, package.json에 기술된 라이브러리를 받도록 실행할 명령을 사전작성합니다.
RUN yarn install

# 외부에 노출시킬 포트번호를 서버 실행 구문 작성 직전에 추가로 작성해주세요. 현재는 3000포트를 이용합니다.
EXPOSE 3000

# 서버 실행구문은 띄어쓰기는 ,로 대체해서 아래와 같이 리스트 내부에 문자열로 작성합니다.
# CMD ["node", "server.js"]
CMD yarn start