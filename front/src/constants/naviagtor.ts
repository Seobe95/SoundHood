const mainTabNavigations = {
  MAP: 'Map',
  LIST: 'List',
  MY_PAGE: 'MyPage',
} as const;

const authNavigations = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  AUTH_HOME: 'AuthHome',
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

export {
  authNavigations,
  mainTabNavigations,
  detailStackNavigations,
  rootStackNavigations,
  postStackNavigations,
};
