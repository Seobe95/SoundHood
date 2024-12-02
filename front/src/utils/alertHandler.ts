import { Alert } from 'react-native';
import { alertMessages } from '@/constants';

type AlertMessages = typeof alertMessages;
type AlertType = keyof AlertMessages;

/**
 * 공통으로 알러트를 관리하기 위한 함수입니다.
 @Params type: 알러트가 사용되는 곳
 @Params onPress: 버튼을 누를 시 동작할 함수
 * */
function alertHandler(type: AlertType, onPress: () => void) {
  const { TITLE, MESSAGE, BUTTONS } = alertMessages[type];

  const buttons = BUTTONS.map(button => {
    return {
      ...button,
      onPress: button.style === 'cancel' ? undefined : onPress,
    };
  });

  return Alert.alert(TITLE, MESSAGE, buttons);
}

export { alertHandler };
