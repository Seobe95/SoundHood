<div align='center' style='margin-bottom: 16px;'> 
  <h1>
    <img src="https://github.com/user-attachments/assets/2816ea4c-4d00-4604-8717-63071e41b65b" height='30' width='30' /> SoundHood
  </h1>
  <h3>당신 주변의 음악</h3>
  <a href='https://apps.apple.com/us/app/soundhood/id6742134437'>앱 스토어</a>
</div>
<br />
<div style="display: flex; justify-content: center; gap: 10px; margin-top: 16px;" align='center' >
  <img src='https://github.com/user-attachments/assets/0fbe2d6d-3935-486a-80ad-d504f6b0e525' width='200' />
  <img src='https://github.com/user-attachments/assets/09179677-6cd6-4148-b134-9ee972a21d9b' width='200' />
  <img src='https://github.com/user-attachments/assets/686873d9-ac8c-44c2-a92f-20528f439c1e' width='200' />
  <img src='https://github.com/user-attachments/assets/db9a80a2-d666-4501-bd61-0ede34f50d21' width='200' />
</div>

### 앱 소개

SoundHood는 지도를 기반으로 한 음악 추천 앱입니다. 내가 있는 곳에 내가 좋아하는 음악을 등록하여 주변 사람들에게 추천하고, 지도에 등록된 음악을 디깅할 수 있습니다.

### 사용 스택
`React-Native` `cli` `Typescript` `Tanstack-Query` `React-Native-Naver-Map` `Spotify API` `Kakao API`

### 앱 개발 중 주요 작업 내용
#### 1. React-Navigation을 활용한 네비게이션 구조
- `React-Navigation`을 활용하여 네비게이션 기능을 추가했습니다.
- 각 스크린에서 다른 스크린으로 넘어갈 때, 구조적으로 탄탄해야 이동 시 데이터 전달이 간편하고 확장하기 쉬울 것이라고 생각했습니다.
- `Root Navigator`를 기본 Navigator로 만들고, 여기에 각 Navigator를 모아 구조화 하였습니다.
<div align='center' >
  <img src='https://github.com/user-attachments/assets/4ecedd1c-4147-427d-9b3c-a85387c44c5f' width='600' />
</div>
- `CompositeScreenProps`를 활용하여 외부 Navigator로의 이동과 데이터 전달을 사용했습니다.

#### 2. 외부 API 사용
- Spotify API와 Kakao API를 활용하여 노래 검색 기능과 좌표 주소 변환 기능을 추가하였습니다.
- API 규격을 맞추며 작업을 진행하였습니다.

#### 3. 환경변수 설정 React-Native-Config
- React-Native-Config 라이브러리를 활용하여 .env파일을 관리하여 Android, iOS 환경변수를 관리하였습니다.

#### 4. React-Query
- `React-Query` 를 사용하여 서버 상태를 관리하며 서버 통신과 외부 API를 손쉽게 적용할 수 있었습니다.
- CustomOption을 만들어 hook의 사용성을 높여 적용하였습니다.
