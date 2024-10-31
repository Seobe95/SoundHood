import { detailStackNavigations } from '@/constants';
import DetailScreen from '@/screens/post/DetailScreen';
import EditScreen from '@/screens/post/EditScreen';
import ReportScreen from '@/screens/post/ReportScreen';
import { CompositeScreenProps } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';

export type DetailStackParamList = {
  [detailStackNavigations.EDIT]: undefined;
  [detailStackNavigations.REPORT]: undefined;
  [detailStackNavigations.DETAIL]: undefined;
};

const DetailStack = createStackNavigator<DetailStackParamList>();

function DetailNavigator() {
  return (
    <DetailStack.Navigator>
      <DetailStack.Screen
        name={detailStackNavigations.DETAIL}
        component={DetailScreen}
      />
      <DetailStack.Screen
        name={detailStackNavigations.EDIT}
        component={EditScreen}
      />
      <DetailStack.Screen
        name={detailStackNavigations.REPORT}
        component={ReportScreen}
      />
    </DetailStack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default DetailNavigator;
