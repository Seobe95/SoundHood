import { PermissionStatus } from 'react-native-permissions';
import { create } from 'zustand';

interface SettingSlice {
  locationPermission: PermissionStatus;
  theme: 'dark' | 'light' | 'system';
  setLocationPermission: (locationPermission: PermissionStatus) => void;
  setTheme: (theme: 'dark' | 'light' | 'system') => void;
}

const useSettingStore = create<SettingSlice>(set => ({
  locationPermission: 'denied',
  theme: 'light',
  setTheme: theme => {
    set({ theme });
  },
  setLocationPermission: (locationPermission: PermissionStatus) => {
    set({ locationPermission });
  },
}));

export default useSettingStore;
