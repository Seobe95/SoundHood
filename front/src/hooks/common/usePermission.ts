import { Alert, Linking, Platform } from 'react-native';
import {
  check,
  Permission,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';
import { useEffect, useState } from 'react';
import { permissionAlertMessages } from '@/constants';

type PermissionsType = 'LOCATION' | 'PHOTO';

const iOSPermission: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

const androidPermission: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

type PermissionOS = {
  [key in PermissionsType]: Permission;
};

function usePermission(type: PermissionsType) {
  const [checked, setChecked] = useState<PermissionStatus>('denied');
  const { TITLE, DESCRIPTION } = permissionAlertMessages[`${type}`];
  const requestSettingAlert = () => {
    Alert.alert(TITLE, DESCRIPTION, [
      {
        text: '설정하기',
        onPress: Linking.openSettings,
      },
      {
        text: '취소',
        style: 'cancel',
      },
    ]);
  };
  useEffect(() => {
    const isAndroid = Platform.OS === 'android';
    const permissionOS = isAndroid ? androidPermission : iOSPermission;

    (async () => {
      const isChecked = await check(permissionOS[type]);
      switch (isChecked) {
        case 'denied':
          if (isAndroid) {
            requestSettingAlert();
          } else {
            await request(permissionOS[type]);
          }
          break;
        case 'blocked':
          requestSettingAlert();
          break;
        case 'limited':
          requestSettingAlert();
          break;
        default:
          break;
      }
      setChecked(checked);
    })();
  }, [type]);

  return { checked, requestSettingAlert };
}

export default usePermission;
