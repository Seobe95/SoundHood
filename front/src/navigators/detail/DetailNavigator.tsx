import { detailStackNavigations } from '@/constants';
import DetailScreen from '@/screens/post/DetailScreen';
import EditScreen from '@/screens/post/EditScreen';
import ReportScreen from '@/screens/post/ReportScreen';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from '@/navigators/root/RootNavigator.tsx';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';

export type DetailStackParamList = {
  [detailStackNavigations.EDIT]: undefined;
  [detailStackNavigations.REPORT]: undefined;
  [detailStackNavigations.DETAIL]: {
    /** 목록에서 DetailScreen으로 이동 시 요청할 id*/
    id: string;
  };
};

const DetailStack = createStackNavigator<DetailStackParamList>();
type DetailStackNavigatorProps = StackScreenProps<
  RootStackParamList,
  'DetailNavigator'
>;

function DetailNavigator({}: DetailStackNavigatorProps) {
  const theme = useContext(ThemeContext);
  return (
    <DetailStack.Navigator
      screenOptions={{
        headerBackTitle: '이전',
        headerStyle: {
          backgroundColor: theme.backgroundColor,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleStyle: { color: theme.fontColorPrimary },
      }}>
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
