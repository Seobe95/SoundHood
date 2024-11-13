import { Alert, Linking, Platform } from 'react-native';
import {
  check,
  Permission,
  PERMISSIONS,
  request,
} from 'react-native-permissions';
import { useEffect } from 'react';

type PermissionsType = 'LOCATION' | 'PHOTO';

const alertMessages = {
  LOCATION_TITLE: '위치권한 허용이 필요합니다.',
  LOCATION_DESCRIPTION: '설정에서 위치를 허용해주세요.',
  PHOTO_TITLE: '사진첩 접근이 필요합니다.',
  PHOTO_DESCRIPTION: '설정에서 사진첩 접근을 허용해주세요.',
} as const;

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
  useEffect(() => {
    const isAndroid = Platform.OS === 'android';
    const permissionOS = isAndroid ? androidPermission : iOSPermission;
    const requestSettingAlert = () => {
      Alert.alert(
        alertMessages[`${type}_TITLE`],
        alertMessages[`${type}_DESCRIPTION`],
        [
          {
            text: '설정하기',
            onPress: Linking.openSettings,
          },
          {
            text: '취소',
            style: 'cancel',
          },
        ],
      );
    };
    (async () => {
      const checked = await check(permissionOS[type]);
      switch (checked) {
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
    })();
  }, [type]);
}

export default usePermission;
