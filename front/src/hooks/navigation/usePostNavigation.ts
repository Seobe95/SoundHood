import {
  EventArg,
  NavigationAction,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';
import { useSearchSpotifyStore } from '@/stores/useSpotifySearchStore.ts';
import { alertHandler } from '@/utils';
import { PostStackParamList } from '@/navigators/post/PostNavigator.tsx';

/**
 * PostScreen에서 사용되는 뒤로가기 방지 및 useNavigation을 반환합니다.
 * */
export function usePostNavigation() {
  const navigation =
    useNavigation<StackNavigationProp<PostStackParamList, 'Post'>>();
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
