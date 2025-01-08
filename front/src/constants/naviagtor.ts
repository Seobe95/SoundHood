const mainTabNavigations = {
  MAP: 'Map',
  LIST: 'List',
  MY_PAGE: 'MyPage',
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
  SETTING: 'Setting',
} as const;

const postStackNavigations = {
  POST: 'Post',
  SEARCH: 'Search',
} as const;

const settingStackNavigations = {
  SETTING: 'Setting',
  NICKNAME_CHANGE: 'NicknameChange',
  OPEN_SOURCE_INFORMAION: 'OpenSourceInformation',
  PERSONAL_INFORMATION: 'PersonalInformation',
  USE_TERMS_INFORMATION: 'UseTermsInformation',
} as const;

export {
  authNavigations,
  mainTabNavigations,
  detailStackNavigations,
  rootStackNavigations,
  postStackNavigations,
  settingStackNavigations,
};
