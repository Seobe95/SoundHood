import EditScreen from '@/screens/post/EditScreen';
import ReportScreen from '@/screens/post/ReportScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface DetailNavigatorProps {}

const detailStackNavigator = {
  REPORT: 'report',
  EDIT: 'edit',
} as const;

export type DetailStackParamList = {
  [detailStackNavigator.EDIT]: undefined;
  [detailStackNavigator.REPORT]: undefined;
};

const DetailStack = createStackNavigator<DetailStackParamList>();

function DetailNavigator({}: DetailNavigatorProps) {
  return (
    <DetailStack.Navigator>
      <DetailStack.Screen
        name={detailStackNavigator.EDIT}
        component={EditScreen}
      />
      <DetailStack.Screen
        name={detailStackNavigator.REPORT}
        component={ReportScreen}
      />
    </DetailStack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default DetailNavigator;
