const mainTabNavigations = {
  MAP: 'Map',
  LIKE: 'Like',
  SETTING: 'Setting',
} as const;

const authNavigations = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  AUTH_HOME: 'AuthHome',
  KAKAO: 'Kakao',
  APPLE: 'Apple',
} as const;

const detailStackNavigations = {
  DETAIL: 'Detail',
  REPORT: 'Report',
  EDIT: 'Edit',
} as const;

const rootStackNavigations = {
  MAIN_TAP: 'MainTapNavigator',
  AUTH: 'AuthNavigator',
  POST: 'PostNavigator',
  DETAIL: 'DetailNavigator',
  SETTING: 'RootSetting',
  MYPAGE: 'Mypage',
} as const;

const postStackNavigations = {
  POST: 'Post',
  SEARCH: 'Search',
} as const;

const settingStackNavigations = {
  OPEN_SOURCE_INFORMAION: 'OpenSourceInformation',
  PERSONAL_INFORMATION: 'PersonalInformation',
  USE_TERMS_INFORMATION: 'UseTermsInformation',
} as const;

const myPageStackNavigations = {
  NICKNAME_CHANGE: 'NicknameChange',
  MY_POST_PAGE: 'MyPostPage',
  MY_PAGE_HOME: 'MyPageHome',
} as const;

export {
  authNavigations,
  mainTabNavigations,
  detailStackNavigations,
  rootStackNavigations,
  postStackNavigations,
  settingStackNavigations,
  myPageStackNavigations,
};
