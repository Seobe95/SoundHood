import {
  EventArg,
  NavigationAction,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';
import { useSearchSpotifyStore } from '@/stores/useSpotifySearchStore.ts';
import { alertHandler } from '@/utils';

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
      alertHandler('POST', () => {
        navigation.dispatch(e.data.action);
        reset();
      });
    };

    navigation.addListener('beforeRemove', beforeRemoveHandler);
    return () => {
      navigation.removeListener('beforeRemove', beforeRemoveHandler);
    };
  }, [navigation, reset]);

  return { navigation };
}
