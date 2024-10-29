import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import useAuth from '@/hooks/queries/useAuth';
import CustomButton from '@/components/CustomButton';
import AuthNavigator from '../auth/AuthNavigator';
import MapScreen from '@/screens/main/MapScreen';

function RootNavigator() {
  const { isLogin, logoutMutation } = useAuth();
  // return isLogin ? <MapScreen /> : <AuthNavigator />;
  return <MapScreen />;
}

const styles = StyleSheet.create({});

export default RootNavigator;
