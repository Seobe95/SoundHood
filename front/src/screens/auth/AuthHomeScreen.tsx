import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AuthStackParamList} from '../../navigators/AuthNavigation';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList>;

function AuthHomeScreen({}: AuthHomeScreenProps) {
  return <View></View>;
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
