declare module 'react-native-config' {
  export interface NativeConfig {
    DEVICE_UUID?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
