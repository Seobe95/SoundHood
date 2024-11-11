import useSettingStore from '@/stores/useSettingStore.ts';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';

function useLocation() {
  const { setLocationPermission, locationPermission } = useSettingStore();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(status => {
        setLocationPermission(status);
      });
    } else {
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then(status => {
          setLocationPermission(status);
        })
        .catch(e => {
          console.error(`Location request has been failed: ${e}`);
        });
    }
  }, [setLocationPermission]);

  return { locationPermission };
}

export default useLocation;
