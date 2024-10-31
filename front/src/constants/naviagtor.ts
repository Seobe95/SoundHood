const mainTabNavigations = {
  MAP: 'map',
  LIST: 'list',
  MY_PAGE: 'myPage',
} as const;

const authNavigations = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  AUTH_HOME: 'AuthHome',
} as const;

const detailStackNavigator = {
  REPORT: 'report',
  EDIT: 'edit',
} as const;

const rootStackNavigator = {
  MAIN_TAP: 'mainTap',
  AUTH: 'auth',
  POST: 'post',
  DETAIL: 'detail',
  SETTING: 'setting',
} as const;

export {
  authNavigations,
  mainTabNavigations,
  detailStackNavigator,
  rootStackNavigator,
};
