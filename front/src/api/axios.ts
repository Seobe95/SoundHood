import axios from 'axios';
import Config from 'react-native-config';

const apiInstance = axios.create({
  baseURL: Config.API_URI,
  withCredentials: true,
});

const spotifyIntance = axios.create({
  baseURL: 'https://api.spotify.com/v1/search',
  withCredentials: true,
});

const kakaoAPIInstance = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local',
  withCredentials: true,
  headers: {
    Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
  },
});

export { apiInstance, spotifyIntance, kakaoAPIInstance };
