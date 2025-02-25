import { useEffect, useRef, useState } from 'react';
import useAppState from '@/hooks/common/useAppState.ts';
import usePersistLocation from '@/hooks/map/usePersistLocation.ts';
import { NaverMapViewRef } from '@mj-studio/react-native-naver-map';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainTabParamList } from '@/navigators/tab/TabNavigator.tsx';

export type LatLng = {
  latitude: number;
  longitude: number;
};

function useLocation() {
  const mapRef = useRef<NaverMapViewRef>(null);
  const route = useRoute<RouteProp<MainTabParamList, 'Map'>>();

  const [userLocation, setUserLocation] = useState<LatLng & { zoom: number }>({
    // 기본값: 서울시청
    latitude: 37.5665851,
    longitude: 126.9782038,
    zoom: 14,
  });
  const animateCameraTo = ({ latitude, longitude }: LatLng) => {
    mapRef.current?.animateCameraTo({ latitude, longitude });
  };
  const { storeCurrentLocation, getPersistLocation } = usePersistLocation();
  const { isComeback } = useAppState();
  useEffect(() => {
    async function handlePersistLocation() {
      switch (isComeback) {
        case false:
          storeCurrentLocation(userLocation);
          break;
        default:
          break;
      }
    }
    handlePersistLocation();
  }, [isComeback]);

  useEffect(() => {
    async function handleLocation() {
      const persistLocation = await getPersistLocation();
      if (persistLocation !== null) {
        animateCameraTo(persistLocation);
      }
    }
    if (
      typeof route.params?.latitude === 'number' &&
      typeof route.params?.longitude === 'number'
    ) {
      animateCameraTo({
        latitude: route.params.latitude,
        longitude: route.params.longitude,
      });
      setUserLocation({
        latitude: route.params?.latitude,
        longitude: route.params?.longitude,
        zoom: userLocation.zoom,
      });
    } else {
      handleLocation();
    }
  }, [route.params]);

  return {
    mapRef,
    userLocation,
    setUserLocation,
    animateCameraTo,
  };
}

export default useLocation;
