import { useEffect, useRef, useState } from 'react';
import useAppState from '@/hooks/common/useAppState.ts';
import usePersistLocation from '@/hooks/map/usePersistLocation.ts';
import { NaverMapViewRef } from '@mj-studio/react-native-naver-map';

export type LatLng = {
  latitude: number;
  longitude: number;
};

function useLocation() {
  const mapRef = useRef<NaverMapViewRef>(null);
  const [userLocation, setUserLocation] = useState<LatLng & { zoom: number }>({
    // 기본값: 서울시청
    latitude: 37.5665851,
    longitude: 126.9782038,
    zoom: 14,
  });
  const { getPersistLocation, storeCurrentLocation } = usePersistLocation();
  const { isComeback } = useAppState();

  useEffect(() => {
    async function handlePersistLocation() {
      switch (isComeback) {
        case false:
          storeCurrentLocation(userLocation);
        default:
          console.log('null');
      }
      const persistLocation = await getPersistLocation();
      if (persistLocation !== null) {
        mapRef.current?.animateCameraTo(persistLocation);
      }
    }
    handlePersistLocation();
  }, [isComeback]);

  return {
    mapRef,
    userLocation,
    setUserLocation,
  };
}

export default useLocation;
