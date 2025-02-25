import TermsWebview from '@/components/mypage/TermsWebview';
import { webviewURL } from '@/constants/webviewURLs';
import React from 'react';

interface PersonalInformationScreenProps {}

function PersonalInformationScreen({}: PersonalInformationScreenProps) {
  return <TermsWebview uri={webviewURL.PERSONAL_INFORMATION} />;
}

export default PersonalInformationScreen;
