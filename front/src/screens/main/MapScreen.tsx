import { NaverMapView } from '@mj-studio/react-native-naver-map';
import React, { useContext, useState } from 'react';
import { Keyboard, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import {
  ColorsType,
  mainTabNavigations,
  rootStackNavigations,
} from '@/constants';
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
import { AuthContext } from '@/context/AuthContext.tsx';
import { alertHandler } from '@/utils';
import { useReadMarkers } from '@/hooks/queries/usePost.ts';
import CustomMarker from '@/components/map/CustomMarker.tsx';
import CustomActionSheet from '@/components/common/CustomActionSheet.tsx';
import SongInfo from '@/components/post/SongInfo.tsx';
import { Markers } from '@/api';
import useActionSheet from '@/hooks/common/useActionSheet.ts';

export type MapScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, typeof mainTabNavigations.MAP>,
  StackScreenProps<RootStackParamList, typeof rootStackNavigations.MAIN_TAP>
>;

function MapScreen({ navigation, route }: MapScreenProps) {
  const { checked, requestSettingAlert } = usePermission('LOCATION');
  const { top } = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);
  const { userLocation, setUserLocation, mapRef } = useLocation();
  const { data } = useReadMarkers();
  const auth = useContext(AuthContext);
  const [markerState, setMarkerState] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Markers | null>(null);
  const { isOpen, show, hide } = useActionSheet();

  function onPressPostButton() {
    if (auth.isLogin) {
      navigation.navigate('PostNavigator', {
        screen: 'Post',
      });
      return;
    }
    if (checked === 'denied' || checked === 'blocked') {
      requestSettingAlert();
      return;
    }
    alertHandler('LOGIN', () => {
      navigation.navigate('AuthNavigator', {
        screen: 'AuthHome',
      });
    });
  }

  function onPressSearchButton() {
    navigation.navigate('PostNavigator', {
      screen: 'Search',
      params: { searchType: 'ADDRESS' },
    });
  }

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
        isShowScaleBar={false}
        isShowZoomControls={false}
        mapType="Navi"
        initialCamera={userLocation}
        onCameraIdle={({ latitude, longitude, zoom }) => {
          setUserLocation({ latitude, longitude, zoom: zoom || 14 });
        }}>
        {data &&
          data.map(marker => (
            <CustomMarker
              key={marker.id}
              marker={marker}
              markerState={markerState}
              onTap={() => {
                setMarkerState(marker.id);
                setSelectedMarker(marker);
                mapRef.current?.animateCameraTo({
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                });
                isOpen ? hide() : show();
              }}
            />
          ))}
      </NaverMapView>
      <View style={[styles.floatingContainer, { top: top || 20 }]}>
        <SearchAddressInput
          onPress={onPressSearchButton}
          label={route.params?.addressName || undefined}
        />
        <FloatingButton onPress={onPressPostButton} />
      </View>
      <CustomActionSheet
        isOpen={isOpen}
        hide={() => {
          hide();
          setMarkerState(null);
          setSelectedMarker(null);
        }}>
        {selectedMarker && (
          <SongInfo
            size={'small'}
            title={selectedMarker.title}
            imageUri={selectedMarker.albumCover}
            artist={selectedMarker.artist}
            isButton={true}
            onPress={() => {
              hide();
              navigation.navigate('DetailNavigator', {
                screen: 'Detail',
                params: {
                  id: selectedMarker.id,
                },
              });
            }}
          />
        )}
      </CustomActionSheet>
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
    locationButton: {
      position: 'absolute',
      bottom: 50,
      left: 20,
      width: 50,
      height: 50,
      backgroundColor: color.backgroundColor,
      justifyContent: 'center',
      alignItems: 'flex-end',
      padding: 0,
    },
  });

export default MapScreen;
