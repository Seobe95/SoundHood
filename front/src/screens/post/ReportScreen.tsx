import React, { useContext } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '@/context/CustomThemeContext.tsx';
import { ColorsType, detailStackNavigations } from '@/constants';
import ContentInput from '@/components/post/ContentInput.tsx';
import CustomButton from '@/components/common/CustomButton.tsx';
import Icon from 'react-native-vector-icons/Ionicons';
import { useForm } from '@/hooks/useForm.ts';
import { validateReport } from '@/utils';
import { useCreateReport } from '@/hooks/queries/useReport.ts';
import { StackScreenProps } from '@react-navigation/stack';
import { DetailStackParamList } from '@/navigators/detail/DetailNavigator.tsx';
import { ToastContext } from '@/context/ToastContext.tsx';

type ReportScreenProps = StackScreenProps<
  DetailStackParamList,
  typeof detailStackNavigations.REPORT
>;

function ReportScreen({ navigation, route }: ReportScreenProps) {
  const theme = useContext(ThemeContext);
  const styles = makeStyle(theme);
  const reportForm = useForm<{ reason: string }>({
    initialValue: { reason: '' },
    validate: validateReport,
  });
  const { show } = useContext(ToastContext);
  const { mutate } = useCreateReport({
    onSuccess: () => {
      navigation.goBack();
      show({
        message: '신고가 접수되었습니다. 운영진 확인 후 처리됩니다.',
        time: 'short',
      });
    },
  });

  function handleReportButton() {
    mutate({ reason: reportForm.values.reason, targetPostId: route.params.id });
  }

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <View style={styles.reportInformationContainer}>
        <Icon
          name={'information-circle-outline'}
          size={25}
          color={theme.fontColorPrimary}
        />
        <Text style={styles.text}>
          신고된 내용은 운영진이 확인 후 처리됩니다.
        </Text>
      </View>
      <ContentInput
        placeholder={'신고 사유와 관련된 추가 내용을 입력해주세요.'}
        {...reportForm.getTextInputProps('reason')}
      />
      <CustomButton
        label={'신고하기'}
        onPress={handleReportButton}
        invalid={!reportForm.isValid}
      />
    </Pressable>
  );
}

const makeStyle = (color: ColorsType) =>
  StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: color.backgroundColor,
      paddingHorizontal: 16,
      justifyContent: 'center',
      gap: 16,
    },
    reportInformationContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 4,
    },
    text: {
      color: color.fontColorPrimary,
    },
  });

export default ReportScreen;
