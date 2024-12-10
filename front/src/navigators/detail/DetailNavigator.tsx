import { detailStackNavigations } from '@/constants';
import DetailScreen from '@/screens/post/DetailScreen';
import EditScreen from '@/screens/post/EditScreen';
import ReportScreen from '@/screens/post/ReportScreen';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { RootStackParamList } from '@/navigators/root/RootNavigator.tsx';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { RouteProp } from '@react-navigation/native';
import { Post } from '@/api';
import { HeaderBackButton } from '@react-navigation/elements';

export type DetailStackParamList = {
  [detailStackNavigations.EDIT]: {
    data: Post;
  };
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

function setHeaderTitle(
  route: RouteProp<DetailStackParamList, keyof DetailStackParamList>,
) {
  let headerTitle: string | undefined;
  switch (route.name) {
    case detailStackNavigations.DETAIL:
      headerTitle = '음악';
      break;
    case detailStackNavigations.EDIT:
      headerTitle = '수정하기';
      break;
    case detailStackNavigations.REPORT:
      headerTitle = '신고하기';
      break;
    default:
      headerTitle = undefined;
      break;
  }

  return headerTitle;
}

function DetailNavigator({}: DetailStackNavigatorProps) {
  const theme = useContext(ThemeContext);
  const isAndroid = Platform.OS === 'android';
  return (
    <DetailStack.Navigator
      screenOptions={({ route }) => ({
        headerBackTitle: '이전',
        headerLeft: props => {
          if (isAndroid) {
            return (
              <HeaderBackButton {...props} tintColor={theme.fontColorPrimary} />
            );
          }
          return <HeaderBackButton {...props} />;
        },
        headerStyle: {
          backgroundColor: theme.backgroundColor,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTitleStyle: { color: theme.fontColorPrimary },
        headerTitle: setHeaderTitle(route),
      })}>
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
