import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigators/root/RootNavigator.tsx';
import { rootStackNavigations } from '@/constants';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext.tsx';

function useAuthNavigation() {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, typeof rootStackNavigations.AUTH>
    >();
  const { isLogin } = useContext(AuthContext);

  useEffect(() => {
    if (isLogin) {
      navigation.navigate('MainTapNavigator', {
        screen: 'Map',
        params: {
          latitude: undefined,
          longitude: undefined,
          addressName: undefined,
        },
      });
    }
  }, [isLogin]);
}

export default useAuthNavigation;
