import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SongInfo from '@/components/post/SongInfo.tsx';
import { Markers } from '@/api';

type SongInfoActionSheetProps = {
  isLogin: boolean;
  selectedMarker: Markers | null;
  onPress: () => void;
};

function SongInfoActionSheet({
  selectedMarker,
  isLogin,
  onPress,
}: SongInfoActionSheetProps) {
  console.log(isLogin);
  if (isLogin && selectedMarker) {
    return (
      <View style={{ margin: 16 }}>
        <SongInfo
          size={'small'}
          title={selectedMarker.title}
          imageUri={selectedMarker.albumCover}
          artist={selectedMarker.artist}
          isButton={true}
          onPress={onPress}
        />
      </View>
    );
  }
  if (!isLogin && selectedMarker) {
    return (
      <View style={{ margin: 16 }}>
        <SongInfo
          size={'small'}
          title={'이 음악이 궁금하신가요?'}
          imageUri={selectedMarker!.albumCover}
          artist={'로그인 후 확인이 가능해요!'}
          isButton={true}
          onPress={onPress}
        />
      </View>
    );
  }

  if (isLogin && !selectedMarker) {
    return (
      <View style={{ margin: 16 }}>
        <Text>오류가 발생했어요..🥺</Text>
      </View>
    );
  }

  if (!isLogin && !selectedMarker) {
    return <View style={{ margin: 16 }}></View>;
  }

  return null;
}

const styles = StyleSheet.create({});

export default SongInfoActionSheet;
