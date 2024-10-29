declare module 'react-native-config' {
  export interface NativeConfig {
    DEVICE_UUID?: string;
    API_URI?: string;
    NAVER_MAP_CLIENT_ID?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
