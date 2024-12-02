import React, { useContext } from 'react';
import { Keyboard, Pressable, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { DetailStackParamList } from '@/navigators/detail/DetailNavigator.tsx';
import { ColorsType, detailStackNavigations, postQueryKeys } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import SongInfo from '@/components/post/SongInfo.tsx';
import ContentInput from '@/components/post/ContentInput.tsx';
import CustomButton from '@/components/common/CustomButton.tsx';
import useEditPostHandler from '@/hooks/post/useEditPostHandler.ts';
import { useUpdatePost } from '@/hooks/queries/usePost.ts';
import { queryClient } from '@/api';

type EditScreenProps = {} & EditScreenStackParams;
type EditScreenStackParams = StackScreenProps<
  DetailStackParamList,
  typeof detailStackNavigations.EDIT
>;

function EditScreen({ navigation, route }: EditScreenProps) {
  const theme = useContext(ThemeContext);
  const styles = makeStyles(theme);
  const { data } = route.params;
  const { mutate } = useUpdatePost({
    mutationOptions: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [postQueryKeys.READ_POST_BY_ID],
        });
        navigation.replace('Detail', {
          id: data.id,
        });
      },
    },
  });
  const { contentInputProps, invalid } = useEditPostHandler(data);

  function onSubmit() {
    mutate({ id: data.id, description: contentInputProps.value });
  }

  if (data) {
    return (
      <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <SongInfo
          title={data.title}
          imageUri={data.albumCover}
          artist={data.artist}
        />
        <ContentInput
          placeholder={'음악 소개를 수정해주세요!'}
          {...contentInputProps}
        />
        <CustomButton label={'수정하기'} invalid={invalid} onPress={onSubmit} />
      </Pressable>
    );
  } else {
    return <></>;
  }
}

const makeStyles = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      backgroundColor: color.backgroundColor,
      flex: 1,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
    },
  });

export default EditScreen;
