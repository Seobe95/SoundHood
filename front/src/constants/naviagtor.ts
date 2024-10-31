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

const detailStackNavigations = {
  DETAIL: 'detail',
  REPORT: 'report',
  EDIT: 'edit',
} as const;

const rootStackNavigations = {
  MAIN_TAP: 'mainTap',
  AUTH: 'auth',
  POST: 'post',
  DETAIL: 'detail',
  SETTING: 'setting',
} as const;

export {
  authNavigations,
  mainTabNavigations,
  detailStackNavigations,
  rootStackNavigations,
};
