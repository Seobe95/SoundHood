import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { ColorsType } from '@/constants';
import { RFValue } from '@/utils';

type UserInfoProps = {
  nickname: string;
  likeCount: number;
};

function UserInfo({ nickname, likeCount }: UserInfoProps) {
  const { top } = useSafeAreaInsets();
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme, top);

  return (
    <View style={styles.userInfoContainer}>
      <Text style={styles.nicknameText}>{nickname}</Text>
      <View style={styles.likeInfoContainer}>
        <Icon name={'heart'} size={20} color={theme.PINK_200} />
        <Text style={styles.likeCountText}>{likeCount}</Text>
      </View>
    </View>
  );
}

const makeStyles = (color: ColorsType, top = 0) =>
  StyleSheet.create({
    userInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    nicknameText: {
      fontSize: RFValue(18, top),
      fontWeight: '600',
      color: color.fontColorPrimary,
    },
    likeInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 8,
      gap: 2,
    },
    likeCountText: {
      color: color.fontColorPrimary,
    },
  });

export default UserInfo;
