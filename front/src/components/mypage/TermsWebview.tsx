import { ColorsType } from '@/constants';
import { ThemeContext } from '@/context/CustomThemeContext';
import React, { useContext, useState } from 'react';
import { Linking, SafeAreaView, StyleSheet } from 'react-native';
import WebView, { WebViewProps } from 'react-native-webview';
import LoadingIndicator from '../common/LoadingIndicator';
import {
  ShouldStartLoadRequest,
  WebViewNavigation,
} from 'react-native-webview/lib/WebViewTypes';
import { alertHandler } from '@/utils';

interface TermsWebviewProps extends WebViewProps {
  uri: string;
}

function TermsWebview({ uri, ...props }: TermsWebviewProps) {
  const theme = useContext(ThemeContext);
  const styles = makeColor(theme);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Notion의 Webview에서 다른 페이지로 이동을 막는 함수입니다.
   * @param {ShouldStartLoadRequest} req onShouldStartLoadWithRequest의 파라미터
   * @returns {boolean} 페이지 불러오기 `유/무`를 반환함
   */
  function handleShouldStartLoadWithRequest(req: ShouldStartLoadRequest) {
    if (
      req.url.startsWith('https://seobe-dev.notion.site') ||
      req.url.startsWith('https://aif.notion.so') ||
      req.url.startsWith('about:blank')
    ) {
      return true;
    } else {
      alertHandler('WEBVIEW', () => {
        Linking.openURL(req.url);
      });
      return false;
    }
  }

  function handleNavigationStateChange(state: WebViewNavigation) {
    console.log(state.url);
  }

  return (
    <SafeAreaView style={styles.webviewConatiner}>
      <WebView
        {...props}
        source={{ uri: uri }}
        onLoad={() => setIsLoading(false)}
        style={styles.webview}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      />
      {isLoading && <LoadingIndicator size={'large'} color={theme.BLUE_300} />}
    </SafeAreaView>
  );
}

const makeColor = (color: ColorsType) =>
  StyleSheet.create({
    webviewConatiner: {
      flex: 1,
      backgroundColor: color.notionWebviewBackground,
    },
    webview: {
      backgroundColor: color.notionWebviewBackground,
    },
  });

export default TermsWebview;
