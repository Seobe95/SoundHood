import {
  EventArg,
  NavigationAction,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useSearchSpotifyStore } from '@/stores/useSpotifySearchStore.ts';

/**
 * PostScreen에서 사용되는 뒤로가기 방지 및 useNavigation을 반환합니다.
 * */
export function usePostNavigation<T extends ParamListBase>() {
  const navigation = useNavigation<StackNavigationProp<T>>();
  const { reset } = useSearchSpotifyStore();

  useEffect(() => {
    const beforeRemoveHandler = (
      e: EventArg<
        'beforeRemove',
        true,
        {
          action: NavigationAction;
        }
      >,
    ) => {
      if (e.data.action.type === 'REPLACE') {
        return;
      }
      e.preventDefault();
      Alert.alert(
        '이 페이지에서 나가시면 저장이 되지 않아요!',
        '작성을 취소하시고 나가시겠어요?',
        [
          {
            text: '아니요',
            style: 'cancel',
            onPress: () => {},
          },
          {
            text: '나가기',
            style: 'destructive',
            onPress: () => {
              navigation.dispatch(e.data.action);
              reset();
            },
          },
        ],
      );
    };

    navigation.addListener('beforeRemove', beforeRemoveHandler);
    return () => {
      navigation.removeListener('beforeRemove', beforeRemoveHandler);
    };
  }, [navigation, reset]);

  return { navigation };
}
