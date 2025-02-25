import { toastMessages } from '@/constants';
import { ToastContext } from '@/context/ToastContext';
import useAuth from '@/hooks/queries/useAuth';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import React, { useContext } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Config from 'react-native-config';

interface AppleLoginButtonProps {}

function AppleLoginButton({}: AppleLoginButtonProps) {
  const deviceTheme = useColorScheme();
  const { show } = useContext(ToastContext);
  const { appleSignInMutation } = useAuth();

  async function handlePressAppleSignIn() {
    try {
      const { identityToken, authorizationCode } =
        await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL],
        });

      if (identityToken && authorizationCode) {
        appleSignInMutation.mutate(
          {
            identityToken,
            authorizationCode,
            appId: Config.APP_ID!,
          },
          {
            onSuccess: result => {
              console.log(result.accessToken);
            },
          },
        );
      }
    } catch (error: any) {
      if (error.code !== appleAuth.Error.CANCELED) {
        show({ message: toastMessages.LOGIN.FAIL, time: 'short' });
      }
    }
  }

  return (
    <AppleButton
      onPress={handlePressAppleSignIn}
      style={styles.appleSignInButton}
      cornerRadius={8}
      buttonStyle={
        deviceTheme === 'light'
          ? AppleButton.Style.BLACK
          : AppleButton.Style.WHITE
      }
      buttonType={AppleButton.Type.CONTINUE}
    />
  );
}

const styles = StyleSheet.create({
  appleSignInButton: {
    width: '100%',
    height: 44,
  },
});

export default AppleLoginButton;
