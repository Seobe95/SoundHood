declare module 'react-native-config' {
  export interface NativeConfig {
    DEVICE_UUID?: string;
    API_URI?: string;
    NAVER_MAP_CLIENT_ID?: string;
    SPOTIFY_CLIENT_ID?: string;
    SPOTIFY_CLIENT_SECRET?: string;
    KAKAO_REST_API_KEY?: string;
    KAKAO_NATIVE_APP_KEY?: string;
    APP_ID?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
