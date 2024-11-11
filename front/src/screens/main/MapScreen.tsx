import { NaverMapView } from '@mj-studio/react-native-naver-map';
import React, { useContext } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { ColorsType, mainTabNavigations } from '@/constants';
import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { RootStackParamList } from '@/navigators/root/RootNavigator.tsx';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '@/navigators/tab/TabNavigator.tsx';
import FloatingButton from '@/components/map/FloatingButton.tsx';

type MapScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, typeof mainTabNavigations.MAP>,
  StackScreenProps<RootStackParamList>
>;

function MapScreen({ navigation }: MapScreenProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);
  return (
    <>
      <NaverMapView
        style={styles.container}
        isNightModeEnabled={isDarkMode}
        mapType="Navi"
      />
      <FloatingButton
        onPress={() =>
          navigation.navigate('PostNavigator', {
            screen: 'Post',
          })
        }
      />
    </>
  );
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
    },
  });

export default MapScreen;
