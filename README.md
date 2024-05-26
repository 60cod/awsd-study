# 서비스 설치 방법

### 1. package.json 의존성 패키지 설치

   * 운영 (dependencies)

      ```$ npm install```


   * 개발 (devDependencies)

      ```$ npm install -D```


### 2. .env 파일 생성

   * 환경 설정

     ``````
     PORT={PORT}
     REDIS_URL={REDIS_URL}


### 3. Redis 서버 백그라운드 실행

1. cmd 창에서 wsl 입력 → Ubuntu 실행

     ```$ wsl```


2. Redis 서버 2개 실행

     * 운영/개발용
   
        ```$ redis-server --daemonize yes```

     * 테스트용

        ```$ redis-server --daemonize yes --port 6380 --requirepass test_env```


### 4. 서비스 2개 실행

* Redis 서버 먼저 실행하지 않으면 'ECONNREFUSED' '-4078' 에러 발생함.


1. 운영/개발

    ```$ npm run start``` / ```$ npm run dev```


2. 테스트 (자동 배포 위해)

    ```$ npm run test```