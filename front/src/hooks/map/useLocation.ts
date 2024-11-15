import { useEffect, useRef, useState } from 'react';
import useAppState from '@/hooks/common/useAppState.ts';
import usePersistLocation from '@/hooks/map/usePersistLocation.ts';
import { NaverMapViewRef } from '@mj-studio/react-native-naver-map';
import { CompositeScreenProps, useRoute } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@/navigators/tab/TabNavigator.tsx';
import { mainTabNavigations } from '@/constants';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigators/root/RootNavigator.tsx';

export type LatLng = {
  latitude: number;
  longitude: number;
};

type MapScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, typeof mainTabNavigations.MAP>,
  StackScreenProps<RootStackParamList>
>;

function useLocation() {
  const mapRef = useRef<NaverMapViewRef>(null);
  const [userLocation, setUserLocation] = useState<LatLng & { zoom: number }>({
    // 기본값: 서울시청
    latitude: 37.5665851,
    longitude: 126.9782038,
    zoom: 14,
  });
  const animateCameraTo = ({ latitude, longitude }: LatLng) => {
    mapRef.current?.animateCameraTo({ latitude, longitude });
  };
  const { storeCurrentLocation } = usePersistLocation();
  const { isComeback } = useAppState();

  useEffect(() => {
    async function handlePersistLocation() {
      switch (isComeback) {
        case false:
          storeCurrentLocation(userLocation);
        default:
          console.log('null');
      }
    }
    handlePersistLocation();
  }, [isComeback]);

  return {
    mapRef,
    userLocation,
    setUserLocation,
    animateCameraTo,
  };
}

export default useLocation;
