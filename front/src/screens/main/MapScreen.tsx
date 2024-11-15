import { NaverMapView } from '@mj-studio/react-native-naver-map';
import React, { useContext, useEffect } from 'react';
import { Keyboard, StyleSheet, useColorScheme, View } from 'react-native';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { ColorsType, mainTabNavigations } from '@/constants';
import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList } from '@/navigators/root/RootNavigator.tsx';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@/navigators/tab/TabNavigator.tsx';
import useLocation from '@/hooks/map/useLocation.ts';
import FloatingButton from '@/components/map/FloatingButton.tsx';
import usePermission from '@/hooks/common/usePermission.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchAddressInput from '@/components/map/SearchAddressInput.tsx';
import usePersistLocation from '@/hooks/map/usePersistLocation.ts';

type MapScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, typeof mainTabNavigations.MAP>,
  StackScreenProps<RootStackParamList>
>;

function MapScreen({ navigation, route }: MapScreenProps) {
  usePermission('LOCATION');
  const { top } = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);
  const { userLocation, setUserLocation, mapRef, animateCameraTo } =
    useLocation();
  const { getPersistLocation } = usePersistLocation();

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
        latitude: route.params?.latitude,
        longitude: route.params?.longitude,
      });
    } else {
      handleLocation();
    }
  }, [mapRef, route.params, getPersistLocation, animateCameraTo]);

  return (
    <>
      <NaverMapView
        ref={mapRef}
        style={styles.container}
        isNightModeEnabled={isDarkMode}
        isExtentBoundedInKorea={true}
        onTapMap={() => {
          Keyboard.dismiss();
        }}
        mapType="Navi"
        initialCamera={userLocation}
        onCameraIdle={({ latitude, longitude, zoom }) => {
          setUserLocation({ latitude, longitude, zoom: zoom || 14 });
        }}
      />
      <View style={[styles.floatingContainer, { top: top || 20 }]}>
        <SearchAddressInput
          onPress={() => {
            navigation.navigate('PostNavigator', {
              screen: 'Search',
              params: { searchType: 'ADDRESS' },
            });
          }}
          label={route.params?.addressName || undefined}
        />
        <FloatingButton
          onPress={() =>
            navigation.navigate('PostNavigator', {
              screen: 'Post',
            })
          }
        />
      </View>
    </>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
    },
    searchContainer: {
      position: 'absolute',
      flexDirection: 'row',
      width: '100%',
    },
    input: {
      backgroundColor: color.backgroundColor,
      width: '100%',
    },
    floatingContainer: {
      position: 'absolute',
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
      maxHeight: 50,
    },
  });

export default MapScreen;
