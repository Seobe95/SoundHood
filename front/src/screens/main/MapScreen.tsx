import CustomButton from '@/components/CustomButton';
import { RootStackParamList } from '@/navigators/root/RootNavigator';
import { MainTabParamList } from '@/navigators/tab/TabNavigator';
import { NaverMapView } from '@mj-studio/react-native-naver-map';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';

interface MapScreenProps {}
function MapScreen({}: MapScreenProps) {
  return <NaverMapView style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
