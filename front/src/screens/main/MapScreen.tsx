import { NaverMapView } from '@mj-studio/react-native-naver-map';
import React, { useContext } from 'react';
import { Keyboard, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { ColorsType, mainTabNavigations } from '@/constants';
import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList } from '@/navigators/root/RootNavigator.tsx';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@/navigators/tab/TabNavigator.tsx';
import useLocation from '@/hooks/map/useLocation.ts';
import FloatingContainer from '@/components/map/FloatingContainer.tsx';
import usePermission from '@/hooks/common/usePermission.ts';

type MapScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, typeof mainTabNavigations.MAP>,
  StackScreenProps<RootStackParamList>
>;

function MapScreen({ navigation }: MapScreenProps) {
  usePermission('LOCATION');
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);
  const { userLocation, setUserLocation, mapRef } = useLocation();

  return (
    <Pressable onPress={() => Keyboard.dismiss()}>
      <NaverMapView
        ref={mapRef}
        style={styles.container}
        isNightModeEnabled={isDarkMode}
        isExtentBoundedInKorea={true}
        mapType="Navi"
        initialCamera={userLocation}
        onCameraIdle={({ latitude, longitude, zoom }) => {
          setUserLocation({ latitude, longitude, zoom: zoom || 14 });
        }}
      />
      <FloatingContainer
        onPress={() =>
          navigation.navigate('PostNavigator', {
            screen: 'Post',
          })
        }
      />
    </Pressable>
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
  });

export default MapScreen;
