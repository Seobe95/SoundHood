import TermsWebview from '@/components/mypage/TermsWebview';
import { webviewURL } from '@/constants/webviewURLs';
import React from 'react';

interface UseTermsInformationScreenProps {}

function UseTermsInformationScreen({}: UseTermsInformationScreenProps) {
  return <TermsWebview uri={webviewURL.USE_TERM} />;
}

export default UseTermsInformationScreen;
