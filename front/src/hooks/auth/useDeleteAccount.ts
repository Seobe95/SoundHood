import { unlink } from '@react-native-seoul/kakao-login';
import useAuth from '../queries/useAuth';
import { useContext } from 'react';
import { ToastContext } from '@/context/ToastContext';
import { toastMessages } from '@/constants';

type LoginType = 'email' | 'kakao' | 'apple' | undefined;

export default function useDeleteAccount() {
  const { show } = useContext(ToastContext);
  const { deleteAccountMutation } = useAuth();

  async function handleDeleteKakaoAccount() {
    try {
      const _ = await unlink();
    } catch (error) {
      console.log(error, '카카오 회원탈퇴에 실패했습니다.');
    }
  }

  /**
   * 회원탈퇴 기능을 담당하는 함수입니다.
   *
   * @param type 로그인 시 사용한 로그인 형태입니다. email, kakao, apple이 있습니다.
   * @param successCallback 회원 탈퇴가 성공적으로 작동한 후 사용할 callback 함수입니다.
   * @param failedCallback 회원 탈퇴에 실패 후 사용할 callback 함수입니다.
   */
  async function handleDeleteAccount(
    type: LoginType,
    successCallback?: () => void,
    failedCallback?: () => void,
  ) {
    if (type === 'kakao') {
      await handleDeleteKakaoAccount();
    }

    deleteAccountMutation.mutate(null, {
      onSuccess: () => {
        show({ time: 'long', message: toastMessages.DELETE_ACCOUNT.SUCCESS });
        successCallback && successCallback();
      },
      onError: e => {
        show({ time: 'long', message: toastMessages.DELETE_ACCOUNT.FAIL });
        failedCallback && failedCallback();
      },
    });
  }

  return {
    handleDeleteAccount,
  };
}
