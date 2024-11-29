import { Alert } from 'react-native';

const alertMessage = {
  DELETE_TITLE: '정말로 해당 게시글을 삭제하시겠습니까?',
  DELETE_MESSAGE: '삭제 후 데이터복구는 어려워요 🥺',
  DELETE_BUTTON: '삭제하기',
  DELETE_BUTTON_TYPE: 'destructive',
  POST_TITLE: '작성을 취소하시고 나가시겠습니까?',
  POST_MESSAGE: '이 페이지에서 나가시면 저장이 되지 않아요 🥺',
  POST_BUTTON: '나가기',
  POST_BUTTON_TYPE: 'destructive',
  EDIT_TITLE: '수정을 취소하시고 나가시겠습니까?',
  EDIT_MESSAGE: '이 페이지에서 나가시면 반영이 되지 않아요 🥺',
  EDIT_BUTTON: '나가기',
  EDIT_BUTTON_TYPE: 'destructive',
} as const;

type AlertType = 'DELETE' | 'POST' | 'EDIT';

function alertHandler(type: AlertType, onPress: () => void) {
  Alert.alert(alertMessage[`${type}_TITLE`], alertMessage[`${type}_MESSAGE`], [
    {
      text: alertMessage[`${type}_BUTTON`],
      style: alertMessage[`${type}_BUTTON_TYPE`],
      onPress: onPress,
    },
    {
      text: '취소',
      style: 'cancel',
    },
  ]);
}

export { alertHandler };
